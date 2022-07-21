import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteVehicle = ({ navigation }) => {
    const [id, setId] = useState("");

    const deleteVehicle = ({ navigation }) => {
        console.log("deleteVehicle");
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM vehicles WHERE vehicle_id = ?`,
                [id],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        Alert.alert("Vehiculo eliminado");
                    } else {
                        Alert.alert("El vehiculo no existe");
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
                        <MyText text="Busqueda de vehiculo" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="ID de Vehiculo"
                                onChangeText={(text) => setId(text)}
                            />
                            <MySingleButton title="Borrar Vehiculo" customPress={deleteVehicle} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteVehicle;

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
    inputStyle: {
        padding: 15,
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
    },
});
