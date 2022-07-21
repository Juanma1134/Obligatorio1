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

const TreatmentsScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='treatments'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS treatments', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS treatments(treatment_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), matricula VARCHAR(20), fchInicio VARCHAR(20), fchFin VARCHAR(20), costo VARCHAR(20), insumo VARCHAR(20) UNIQUE, repuesto VARCHAR(20) UNIQUE)',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM treatments', []);
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
                title="Registro de Tratamientos"
                btnColor="white"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterTreatments")}
              />

              <MyButton
                image={Update}
                title="Actualizar Tratamientos"
                btnColor="white"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateTreatments")}
              />

              <MyButton
                image={Ver}
                title="Ver Tratamientos"
                btnColor="white"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewTreatment")}
              />

              <MyButton
                image={Delete}
                title="Borrar Tratamientos"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteTreatments")}
              />

              <MyButton
                image={VerTodo}
                title="Ver todos los Tratamientos"
                btnColor="white"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllTreatments")}
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

export default TreatmentsScreen;

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
