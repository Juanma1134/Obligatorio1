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
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";
import MyDropDownVehicles from "../../components/MyDropDownVehicles";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(undefined);

  const clearData = () => {
    setCi("");
    setApellido("");
    setNombre("");
    setSelected("");
  };

  useEffect(() => {
    console.log("##### Buscar vehiculos y usuarios #####");
    getVehicles();
    getUsers();
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

  const getUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT ci, matricula FROM users`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        }
      });
    });
  };

  const registerUser = () => {
    console.log("states", nombre, apellido, ci, selected);
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return;
    }
    if (!apellido.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }
    if (!ci.trim()) {
      Alert.alert("Ingrese su cedula");
      return;
    }

    for (var i in users) {
      if (users[i].matricula == selected || users[i].ci == ci) {
        Alert.alert("La matricula o la cédula ya estan asociadas a un usuario");
        return true;
      }
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (nombre, apellido, ci, matricula) VALUES (?, ?, ?, ?)`,
        [nombre, apellido, ci, selected],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            getVehicles();
            Alert.alert(
              "Exito",
              "Usuario registrado con éxito",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Users"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar usuario");
          }
        }
      );
    });
    return false;
  }

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
              placeholder="Nombre de Usuario"
              onChangeText={setNombre}
              style={styles.nameInput}
              value={nombre}
            />

            <MyInputText
              placeholder="Apellido de Usuario"
              onChangeText={setApellido}
              style={styles.apellidoInput}
              value={apellido}
            />

            <MyInputText
              placeholder="Cédula de Usuario"
              onChangeText={setCi}
              style={styles.ciInput}
              value={ci}
            />

            <MyDropDownVehicles
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={vehicles}
              selected={setSelected}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => MyDropDownVehicles(item)}
            />
            <MyText text="Seleccionar matricula de Vehiculo" style={styles.text} />

            <MySingleButton
              title="Guardar Usuario"
              customPress={registerUser}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  </SafeAreaView>
);
};

export default RegisterUser;

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
  apellidoInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  ciInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  text: {
    padding: 15,
    textAlign: "center",
  },
});