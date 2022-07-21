import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewTreatment = ({ navigation }) => {
    const [id, setId] = useState('');
    const [treatmentData, setTreatmentData] = useState(null);

    const getTreatmentData = () => {
        console.log("getTreatmentData");
        setTreatmentData({});

        if (!id.trim()) {
            Alert.alert("El ID es requerido");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM treatments WHERE treatment_id = ?`,
                [id],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rows.length > 0) {
                        setTreatmentData(results.rows.item(0));
                    } else {
                        Alert.alert("El tratamiento no existe");
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
                            <MyText text="Filtro de tratamientos" style={styles.text} />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="ID del Tratamiento"
                                onChangeText={(text) => setId(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getTreatmentData} />

                            <View style={styles.presenterView}>
                                <MyText text={`Nombre: ${!treatmentData ? '' : treatmentData.nombre}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Matricula: ${!treatmentData ? '' : treatmentData.matricula}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Fecha Inicio: ${!treatmentData ? '' : treatmentData.fchInicio}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Fecha Fin: ${!treatmentData ? '' : treatmentData.fchFin}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Costo: ${!treatmentData ? '' : treatmentData.costo}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Insumo: ${!treatmentData ? '' : treatmentData.insumo}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Repuesto: ${!treatmentData ? '' : treatmentData.repuesto}`} style={styles.presenterText} />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewTreatment;

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
        margin: 10,
        color: "black",
    },
    presenterView: {
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30,
    },
    presenterText: {
        fontSize: 20
    }
});
