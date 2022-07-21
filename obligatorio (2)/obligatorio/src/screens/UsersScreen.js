import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";
import Delete from "../Img/delete.png";
import Insert from "../Img/plus.png";
import Update from "../Img/update.png";
import Ver from "../Img/ver.png";
import VerTodo from "../Img/lista.png";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const UsersScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), apellido VARCHAR(20), ci VARCHAR(20) UNIQUE, matricula VARCHAR(20) UNIQUE)',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM users', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                image={Insert}
                title="Registro de Usuarios"
                btnColor="white"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterUsers")}
              />

              <MyButton
                image={Update}
                title="Actualizar Usuario"
                btnColor="white"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateUsers")}
              />

              <MyButton
                image={Ver}
                title="Ver Usuario"
                btnColor="white"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewUser")}
              />

              <MyButton
                image={Delete}
                title="Borrar Usuario"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteUsers")}
              />

              <MyButton
                image={VerTodo}
                title="Ver todos los Usuarios"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllUsers")}
              />
              <MyButton
                image={Delete}
                title="Borrar DB"
                btnColor="red"
                btnIcon="remove"
                customPress={() => removeElementsOnDatabase()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "grey",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
