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

const UpdateVehicle = () => {
  const [idSearch, setIdSearch] = useState('');
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serialMotor, setSerialMotor] = useState('');

  const searchVehicle = () => {
    console.log("searchVehicle");

    if (!idSearch.trim()) {
      Alert.alert("El ID es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM vehicles WHERE vehicle_id = ?",
        [idSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMatricula(results.rows.item(0).matricula);
            setMarca(results.rows.item(0).marca);
            setColor(results.rows.item(0).color);
            setSerialMotor(results.rows.item(0).serialMotor);
          } else {
            Alert.alert("Vehículo no encontrado");
          }
        }
      );
    });
  };

  const updateVehicle = () => {
    console.log("updateVehicle");

    if (!matricula.trim()) {
      Alert.alert("La matricula del vehiculo no puede estar vacia");
      return;
    }

    if (!marca.trim()) {
      Alert.alert("El marca del vehiculo no puede estar vacia");
      return;
    }

    if (!color.trim()) {
      Alert.alert("El color del vehiculo no puede estar vacio");
      return;
    }

    if (!serialMotor.trim()) {
      Alert.alert("La serie del motor no puede estar vacia");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE vehicles SET matricula = ?, marca = ?, color = ?, serialMotor = ? WHERE vehicle_id = ?",
        [matricula, marca, color, serialMotor, idSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Vehiculo actualizado");
        } else {
            Alert.alert("No se pudo actualizar el vehiculo");
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
              <MyText text="Buscar Vehículo" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el ID del Vehiculo"
                style={styles.inputStyle}
                onChangeText={(text) => setIdSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchVehicle} />

              <MyInputText
                placeholder="Ingrese la matricula del Vehículo"
                value={matricula}
                onChangeText={(text) => setMatricula(text)}
              />
              <MyInputText
                placeholder="Ingrese la marca del Vehículo"
                value={marca}
                onChangeText={(text) => setMarca(text)}
              />
              <MyInputText
                placeholder="Ingrese el color del Vehículo"
                value={color}
                onChangeText={(text) => setColor(text)}
              />
              <MyInputText
                placeholder="Ingrese la serie del motor"
                value={serialMotor}
                onChangeText={(text) => setSerialMotor(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateVehicle} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateVehicle;

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