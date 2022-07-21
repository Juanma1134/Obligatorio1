import React, { useState } from "react";
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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateRep = () => {
    const [idSearch, setIdSearch] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');

    const searchRep = () => {
        console.log("searchRep");

        if (!idSearch.trim()) {
            Alert.alert("El ID es requerido");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM reps WHERE rep_id = ?",
                [idSearch],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        setNombre(results.rows.item(0).nombre);
                        setCantidad(results.rows.item(0).cantidad);
                    } else {
                        Alert.alert("Repuesto no encontrado");
                    }
                }
            );
        });
    };

    const updateRep = () => {
        console.log("updateRep");

        if (!nombre.trim()) {
            Alert.alert("El nombre del Repuesto no puede estar vacio");
            return;
        }

        if (!cantidad.trim()) {
            Alert.alert("La cantidad del Repuesto no puede estar vacia");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE reps SET nombre = ?, cantidad = ? WHERE rep_id = ?",
                [nombre, cantidad, idSearch],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert("Repuesto actualizado");
                    } else {
                        Alert.alert("No se pudo actualizar el repuesto");
                    }
                }
            );
        });
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
                            <MyText text="Buscar Repuesto" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese el ID del Repuesto"
                                style={styles.inputStyle}
                                onChangeText={(text) => setIdSearch(text)}
                            />
                            <MySingleButton title="Buscar" customPress={searchRep} />

                            <MyInputText
                                placeholder="Ingrese el nombre del Repuesto"
                                value={nombre}
                                onChangeText={(text) => setNombre(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese el cantidad del Repuesto"
                                value={cantidad}
                                onChangeText={(text) => setCantidad(text)}
                            />

                            <MySingleButton title="Actualizar" customPress={updateRep} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateRep;

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
});
