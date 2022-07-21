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

const ViewUser = ({ navigation }) => {
  const [id, setId] = useState('');
  const [userData, setUserData] = useState(null);

  const getUserData = () => {
    console.log("getUserData");
    setUserData({});

    if (!id.trim()) {
      Alert.alert("El ID es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE user_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setUserData(results.rows.item(0));
          } else {
            Alert.alert("El usuario no existe");
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
              <MyText text="Filtro de usuario" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="ID de usuario"
                onChangeText={(text) => setId(text)}
              />
              <MySingleButton title="Buscar" customPress={getUserData} />
              <View style={styles.presenterView}>
                <MyText text={`Nombre: ${!userData ? '' : userData.nombre}`} style={styles.presenterText}/>
              </View>
              <View style={styles.presenterView}>
                <MyText text={`Apellido: ${!userData ? '' : userData.apellido}`} style={styles.presenterText}/>
              </View>
              <View style={styles.presenterView}>
                <MyText text={`Matricula: ${!userData ? '' : userData.matricula}`} style={styles.presenterText}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;

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
    flex:2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
  },
  presenterText: {
    fontSize:20
  }
});
