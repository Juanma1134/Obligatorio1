import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyDropDownVehicles from "../../components/MyDropDownVehicles";
import MyDropDownSupplies from "../../components/MyDropDownSupplies";
import MyDropDownReps from "../../components/MyDropDownReps";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateTreatment = () => {
    const [idSearch, setIdSearch] = useState('');
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

    const searchTreatment = () => {
        console.log("searchTreatment");

        if (!idSearch.trim()) {
            Alert.alert("El ID es requerido");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM treatments WHERE treatment_id = ?",
                [idSearch],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        setNombre(results.rows.item(0).nombre);
                        setFchInicio(results.rows.item(0).fchInicio);
                        setFchFin(results.rows.item(0).fchFin);
                        setCosto(results.rows.item(0).costo);
                    } else {
                        Alert.alert("Tratamiento no encontrado");
                    }
                }
            );
        });
    };

    const updateTreatment = () => {
        console.log("updateTreatment");

        if (!nombre.trim()) {
            Alert.alert("El nombre del Tratamiento no puede estar vacio");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("La Fecha de Inicio no puede estar vacia");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("La Fecha de Fin no puede estar vacia");
            return;
        }
        if (!costo.trim()) {
            Alert.alert("El costo no puede estar vacio");
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
                "UPDATE treatments SET nombre = ?, matricula = ?, fchInicio = ?, fchFin = ?, costo = ?, insumo = ?, repuesto = ? WHERE treatment_id = ?",
                [nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, selectedRep, idSearch],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert("Tratamiento actualizado");
                    } else {
                        Alert.alert("No se pudo actualizar el tratamiento");
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
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={styles.keyboardView}
                        >
                            <MyText text="Buscar Tratamientos" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese el ID del Tratamiento"
                                style={styles.inputStyle}
                                onChangeText={(text) => setIdSearch(text)}
                            />
                            <MySingleButton title="Buscar" customPress={searchTreatment} />

                            <MyInputText
                                placeholder="Ingrese el nombre del Tratamiento"
                                value={nombre}
                                onChangeText={(text) => setNombre(text)}
                            />
                            <MyDropDownVehicles
                                placeholder="Seleccione la matricula"
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={vehicles}
                                selected={setSelectedVehicle}
                                keyExtractor={(index1) => index1.toString()}
                                renderItem={({ item1 }) => MyDropDownVehicles(item1)}
                            />
                            <MyText text="Seleccionar matricula de Vehiculo" style={styles.textMat} />
                            <MyInputText
                                placeholder="Ingrese la fecha de inicio"
                                value={fchInicio}
                                onChangeText={(text) => setFchInicio(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese la fecha de fin"
                                value={fchFin}
                                onChangeText={(text) => setFchFin(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese el costo"
                                value={costo}
                                onChangeText={(text) => setCosto(text)}
                            />
                            <MyDropDownSupplies
                                placeholder="Seleccione el insumo"
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={supplies}
                                selected={setSelectedSupply}
                                keyExtractor={(index2) => index2.toString()}
                                renderItem={({ item2 }) => MyDropDownSupplies(item2)}
                            />
                            <MyText text="Seleccionar Insumos" style={styles.textMat} />
                            <MyDropDownReps
                                placeholder="Seleccione el repuesto"
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={reps}
                                selected={setSelectedRep}
                                keyExtractor={(index3) => index3.toString()}
                                renderItem={({ item3 }) => MyDropDownReps(item3)}
                            />
                            <MyText text="Seleccionar Repuestos" style={styles.textMat} />

                            <MySingleButton title="Actualizar" customPress={updateTreatment} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateTreatment;

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
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
    },
    inputStyle: {
        padding: 15,
    },
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
    textMat: {
        padding: 15,
        textAlign: "center",
      },
});
