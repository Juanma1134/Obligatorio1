import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatments = ({navigation}) => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM treatments`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTreatments(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Tratamientos!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("Treatments"),
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
        <MyText text="ID de Tratamiento" style={styles.text}/>
        <MyText text={item.treatment_id} style={styles.text}/>

        <MyText text="Nombre de Tratamiento" style={styles.text}/>
        <MyText text={item.nombre} style={styles.text}/>

        <MyText text="Matricula de Vehiculo" style={styles.text}/>
        <MyText text={item.matricula} style={styles.text}/>

        <MyText text="Fecha inicio" style={styles.text}/>
        <MyText text={item.fchInicio} style={styles.text}/>

        <MyText text="Fecha fin" style={styles.text}/>
        <MyText text={item.fchFin} style={styles.text}/>

        <MyText text="Costo del tratamiento" style={styles.text}/>
        <MyText text={item.costo} style={styles.text}/>

        <MyText text="Insumo del tratamiento" style={styles.text}/>
        <MyText text={item.insumo} style={styles.text}/>

        <MyText text="Repuesto del tratamiento" style={styles.text}/>
        <MyText text={item.repuesto} style={styles.text}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={treatments}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllTreatments;

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
