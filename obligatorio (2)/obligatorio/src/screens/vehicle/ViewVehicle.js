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

const ViewVehicle = ({ navigation }) => {
  const [id, setId] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  const getVehicleData = () => {
    console.log("getVehicleData");
    setVehicleData({});

    if (!id.trim()) {
      Alert.alert("El ID es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM vehicles WHERE vehicle_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setVehicleData(results.rows.item(0));
          } else {
            Alert.alert("El vehículo no existe");
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
              <MyText text="Filtro de Vehiculo" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="ID del Vehículo"
                onChangeText={(text) => setId(text)}
              />
              <MySingleButton title="Buscar" customPress={getVehicleData} />
              
              <View style={styles.presenterView}>
                <MyText text={`Matricula: ${!vehicleData ? '' : vehicleData.matricula}`} style={styles.presenterText}/>
              </View>
              <View style={styles.presenterView}>
                <MyText text={`Marca: ${!vehicleData ? '' : vehicleData.marca}`} style={styles.presenterText}/>
              </View>
              <View style={styles.presenterView}>
                <MyText text={`Color: ${!vehicleData ? '' : vehicleData.color}`} style={styles.presenterText}/>
              </View>
              <View style={styles.presenterView}>
                <MyText text={`Serial del motor: ${!vehicleData ? '' : vehicleData.serialMotor}`} style={styles.presenterText}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewVehicle;

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