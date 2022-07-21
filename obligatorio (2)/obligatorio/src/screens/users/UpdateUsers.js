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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateUser = () => {
  const [idSearch, setIdSearch] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(undefined);

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

  const searchUser = () => {
    console.log("searchUser");

    if (!idSearch.trim()) {
      Alert.alert("El ID es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE user_id = ?",
        [idSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setApellido(results.rows.item(0).apellido);
            setCi(results.rows.item(0).ci);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  const updateUser = () => {
    console.log("updateUser");

    if (!nombre.trim()) {
      Alert.alert("El nombre del Usuario no puede estar vacio");
      return;
    }

    if (!apellido.trim()) {
      Alert.alert("El apellido del Usuario no puede estar vacio");
      return;
    }

    if (!ci.trim()) {
      Alert.alert("La cédula del Usuario no puede estar vacia");
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
        "UPDATE users SET nombre = ?, apellido = ?, ci = ?, matricula = ? WHERE user_id = ?",
        [nombre, apellido, ci, selected, idSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario actualizado");
          } else {
            Alert.alert("No se pudo actualizar el usuario");
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
              <MyText text="Buscar Usuario" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el ID del Usuario"
                style={styles.inputStyle}
                onChangeText={(text) => setIdSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchUser} />

              <MyInputText
                placeholder="Ingrese el nombre del Usuario"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <MyInputText
                placeholder="Ingrese el apellido del Usuario"
                value={apellido}
                onChangeText={(text) => setApellido(text)}
              />
              <MyInputText
                placeholder="Ingrese la cedula del Usuario"
                value={ci}
                onChangeText={(text) => setCi(text)}
              />
              <MyDropDownVehicles
                placeholder="Ingrese la matricula"
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={vehicles}
                selected={setSelected}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => MyDropDownVehicles(item)}
              />
              <MyText text="Seleccionar matricula de Vehiculo" style={styles.textMat} />

              <MySingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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
