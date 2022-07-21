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

const UpdateSupply = () => {
  const [idSearch, setIdSearch] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const searchSupply = () => {
    console.log("searchSupply");

    if (!idSearch.trim()) {
      Alert.alert("El ID es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM supplies WHERE supply_id = ?",
        [idSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setCantidad(results.rows.item(0).cantidad);
          } else {
            Alert.alert("Insumo no encontrado");
          }
        }
      );
    });
  };

  const updateSupply = () => {
    console.log("updateSupply");

    if (!nombre.trim()) {
        Alert.alert("El nombre del Insumo no puede estar vacio");
        return;
      }

      if (!cantidad.trim()) {
        Alert.alert("La cantidad del Insumo no puede estar vacia");
        return;
      }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE supplies SET nombre = ?, cantidad = ? WHERE supply_id = ?",
        [nombre, cantidad, idSearch],
        (tx, results) => {
            if (results.rowsAffected > 0) {
                Alert.alert("Insumo actualizado");
            } else {
                Alert.alert("No se pudo actualizar el insumo");
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
              <MyText text="Buscar Insumo" style={styles.text}/>
              <MyInputText
                placeholder="Ingrese el ID del Insumo"
                style={styles.inputStyle}
                onChangeText={(text) => setIdSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchSupply} />

              <MyInputText
                placeholder="Ingrese el nombre del Insumo"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <MyInputText
                placeholder="Ingrese el cantidad del Insumo"
                value={cantidad}
                onChangeText={(text) => setCantidad(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateSupply} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateSupply;

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
