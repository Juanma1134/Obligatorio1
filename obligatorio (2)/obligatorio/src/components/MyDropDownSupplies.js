import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from '@react-native-picker/picker';

const MyDropDownSupplies = ({ data, selected }) => {
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
          return <Picker.Item label={item.nombre} value={item.nombre}/>
          ;
        })}
      </Picker>
    </View>
  );
};

export default MyDropDownSupplies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});