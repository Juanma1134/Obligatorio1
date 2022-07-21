import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";
import MyDropDownVehicles from "../../components/MyDropDownVehicles";
import MyDropDownSupplies from "../../components/MyDropDownSupplies";
import MyDropDownReps from "../../components/MyDropDownReps";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterTreatment = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [fchInicio, setFchInicio] = useState('');
    const [fchFin, setFchFin] = useState('');
    const [costo, setCosto] = useState('');
    const [supplies, setSupplies] = useState([]);
    const [reps, setReps] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(undefined);
    const [selectedSupply, setSelectedSupply] = useState(undefined);
    const [selectedRep, setSelectedRep] = useState(undefined);

    const clearData = () => {
        setNombre("");
        setSelectedVehicle("");
        setFchInicio("");
        setFchFin("");
        setCosto("");
        setSelectedSupply("");
        setSelectedRep("");
    };

    useEffect(() => {
        console.log("##### Buscar vehiculos, insumos, repuestos y tratamientos #####");
        getVehicles();
        getSupplies();
        getReps();
        getTreatments();
    }, []);

    const getVehicles = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT vehicle_id, matricula FROM vehicles`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setVehicles(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay vehiculos!!!",
                    );
                }
            });
        });
    };

    const getSupplies = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT supply_id, nombre FROM supplies`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setSupplies(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay insumos!!!",
                    );
                }
            });
        });
    };

    const getReps = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT rep_id, nombre FROM reps`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setReps(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay repuestos!!!",
                    );
                }
            });
        });
    };

    const getTreatments = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT insumo, repuesto FROM treatments`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setTreatments(temp);
                }
            });
        });
    };

    const registerTreatment = () => {
        console.log("states", nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, selectedRep);
        debugger;
        if (!nombre.trim()) {
            Alert.alert("Ingrese nombre del tratamiento");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("Ingrese la Fecha de Inicio");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("Ingrese la Fecha de Fin");
            return;
        }
        if (!costo.trim()) {
            Alert.alert("Ingrese el costo");
            return;
        }

        for (var i in treatments) {
            if (treatments[i].insumo == selectedSupply || treatments[i].repuesto == selectedRep) {
                Alert.alert("El insumo o el repuesto ya estan asociados a un tratamiento");
                return true;
            }
        }
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO treatments (nombre, matricula, fchInicio, fchFin, costo, insumo, repuesto) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, selectedRep],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        clearData();
                        getVehicles();
                        getSupplies();
                        getReps();
                        Alert.alert(
                            "Exito",
                            "Tratamiento registrado con éxito",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => navigation.navigate("Treatments"),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        Alert.alert("Error al registrar tratamiento");
                    }
                }
            );
        });
        return false;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Nombre de Tratamiento"
                                onChangeText={setNombre}
                                style={styles.nameInput}
                                value={nombre}
                            />
                            <MyDropDownVehicles
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={vehicles}
                                selected={setSelectedVehicle}
                                keyExtractor={(index1) => index1.toString()}
                                renderItem={({ item1 }) => MyDropDownVehicles(item1)}
                            />
                            <MyText text="Seleccionar matricula de Vehiculo" style={styles.text} />
                            <MyInputText
                                placeholder="Fecha Inicio"
                                onChangeText={setFchInicio}
                                style={styles.fchInicioInput}
                                value={fchInicio}
                            />
                            <MyInputText
                                placeholder="Fecha Fin"
                                onChangeText={setFchFin}
                                style={styles.fchInicioInput}
                                value={fchFin}
                            />
                            <MyInputText
                                placeholder="Costo"
                                onChangeText={setCosto}
                                style={styles.fchInicioInput}
                                value={costo}
                            />
                            <MyDropDownSupplies
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={supplies}
                                selected={setSelectedSupply}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item2 }) => MyDropDownSupplies(item2)}
                            />
                            <MyText text="Seleccionar Insumos" style={styles.text} />
                            <MyDropDownReps
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={reps}
                                selected={setSelectedRep}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item3 }) => MyDropDownReps(item3)}
                            />
                            <MyText text="Seleccionar Repuestos" style={styles.text} />

                            <MySingleButton
                                title="Guardar Tratamiento"
                                customPress={registerTreatment}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterTreatment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    generalView: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
    nameInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    matriculaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    matriculaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    fchInicioInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    text: {
        padding: 15,
        textAlign: "center",
    },
});