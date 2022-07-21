import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from '@react-native-picker/picker';

const MyDropDownVehicles = ({ data, selected }) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          selected(itemValue);
        }}
      >
        {data.map((item) => {
          return <Picker.Item label={item.matricula} value={item.matricula}/>
          ;
        })}
      </Picker>
    </View>
  );
};

export default MyDropDownVehicles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: "center",
  },
});