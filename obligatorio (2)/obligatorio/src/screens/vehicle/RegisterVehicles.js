import React, { useState } from "react";
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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterVehicle = ({ navigation }) => {
    const [matricula, setMatricula] = useState('');
    const [marca, setMarca] = useState('');
    const [color, setColor] = useState('');
    const [serialMotor, setSerialMotor] = useState('');

    const clearData = () => {
        setMatricula("");
        setMarca("");
        setColor("");
        setSerialMotor("");
    };

    const registerVehicle = () => {
        console.log("states", matricula, marca, color, serialMotor);
        debugger;
        if (!matricula.trim()) {
            Alert.alert("Ingrese la matricula del vehiculo");
            return;
        }
        if (!marca.trim()) {
            Alert.alert("Ingrese la marca del vehiculo");
            return;
        }
        if (!color.trim()) {
            Alert.alert("Ingrese el color del vehiculo");
            return;
        }
        if (!serialMotor.trim()) {
            Alert.alert("Ingrese el serial del motor del vehiculo");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO vehicles (matricula, marca, color, serialMotor) VALUES (?, ?, ?, ?)`,
                [matricula, marca, color, serialMotor],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        clearData();
                        Alert.alert(
                            "Exito",
                            "Vehiculo registrado!!!",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => navigation.navigate("Vehicles"),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        Alert.alert("Error al registrar vehiculo");
                    }
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Matricula del Vehiculo"
                                onChangeText={setMatricula}
                                style={styles.matriculaInput}
                                value={matricula}
                            />
                            <MyInputText
                                placeholder="Marca del Vehiculo"
                                onChangeText={setMarca}
                                style={styles.marcaInput}
                                value={marca}
                            />
                            <MyInputText
                                placeholder="Color del Vehiculo"
                                onChangeText={setColor}
                                style={styles.colorInput}
                                value={color}
                            />
                            <MyInputText
                                placeholder="Serial del motor de Vehiculo"
                                onChangeText={setSerialMotor}
                                style={styles.serialMotorInput}
                                value={serialMotor}
                            />
                            <MySingleButton
                                title="Guardar Vehiculo"
                                customPress={registerVehicle}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterVehicle;

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
    matriculaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    marcaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    colorInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    serialMotorInput: {
        padding: 15,
        textAlignVertical: "top",
    },
});