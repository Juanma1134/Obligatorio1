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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterSupply = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const clearData = () => {
    setNombre("");
    setCantidad("");
  };

  const registerSupply = () => {
    console.log("states", nombre, cantidad);
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese el nombre del insumo");
      return;
    }
    if (!cantidad.trim()) {
      Alert.alert("Ingrese la cantidad del insumo");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO supplies (nombre, cantidad) VALUES (?, ?)`,
        [nombre, cantidad],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Insumo registrado con éxito",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Supplies"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar insumo");
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
                placeholder="Nombre del insumo"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />

              <MyInputText
                placeholder="Cantidad de insumo"
                onChangeText={setCantidad}
                style={styles.cantidadInput}
                value={cantidad}
              />

              <MySingleButton
                title="Guardar insumo"
                customPress={registerSupply}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterSupply;

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
  cantidadInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  matriculaInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  ciInput: {
    padding: 15,
    textAlignVertical: "top",
  },
});