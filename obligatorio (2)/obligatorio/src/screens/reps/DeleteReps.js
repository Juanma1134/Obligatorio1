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

const DeleteRep = ({ navigation }) => {
  const [id, setId] = useState('');

  const deleteRep = ({ navigation }) => {
    console.log("deleteRep");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Reps WHERE rep_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto eliminado");
          } else {
            Alert.alert("El repuesto no existe");
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
          <MyText text="Busqueda de repuestos" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
          <MyInputText
            placeholder="Id de repuesto"
            onChangeText={(text) => setId(text)}
          />
          <MySingleButton title="Borrar Repuesto" customPress={deleteRep} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteRep;

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
