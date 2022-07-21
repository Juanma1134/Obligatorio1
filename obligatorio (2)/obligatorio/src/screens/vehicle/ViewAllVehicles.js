import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllVehicles = ({navigation}) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM vehicles`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setVehicles(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Vehículos",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("Vehicles"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText text="ID del vehiculo" style={styles.text}/>
        <MyText text={item.vehicle_id} style={styles.text}/>

        <MyText text="Matricula del vehiculo" style={styles.text}/>
        <MyText text={item.matricula} style={styles.text}/>

        <MyText text="Marca del vehiculo" style={styles.text}/>
        <MyText text={item.marca} style={styles.text}/>

        <MyText text="Color del vehiculo" style={styles.text}/>
        <MyText text={item.color} style={styles.text}/>

        <MyText text="Serie de Motor del vehiculo" style={styles.text}/>
        <MyText text={item.serialMotor} style={styles.text}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={vehicles}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllVehicles;

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
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  }
});