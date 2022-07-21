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

const VehiclesScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='vehicles'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS vehicles', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS vehicles(vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(20), marca VARCHAR(20), color VARCHAR(20), serialMotor VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM vehicles', []);
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
                title="Registro de Vehiculos"
                btnColor="white"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterVehicles")}
              />

              <MyButton
                image={Update}
                title="Actualizar Vehiculo"
                btnColor="white"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateVehicles")}
              />

              <MyButton
                image={Ver}
                title="Ver Vehiculo"
                btnColor="white"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewVehicle")}
              />

              <MyButton
                image={Delete}
                title="Borrar Vehiculo"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteVehicles")}
              />

              <MyButton
                image={VerTodo}
                title="Ver todos los Vehiculos"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllVehicles")}
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

export default VehiclesScreen;

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
