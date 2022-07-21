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

const DeleteSupply = ({ navigation }) => {
    const [id, setId] = useState('');

    const deleteSupply = ({ navigation }) => {
        console.log("deleteSupply");
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM supplies WHERE supply_id = ?`,
                [id],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        Alert.alert("Insumo eliminado");
                    } else {
                        Alert.alert("El insumo no existe");
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
                        <MyText text="Busqueda de insumos" style={styles.text} />
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="ID de insumo"
                                onChangeText={(text) => setId(text)}
                            />
                            <MySingleButton title="Borrar insumo" customPress={deleteSupply} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteSupply;

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
