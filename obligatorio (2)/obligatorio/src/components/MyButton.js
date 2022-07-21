import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

const MyButton = (props) => {
  return (
      <TouchableOpacity style={[styles.button, {backgroundColor: props.btnColor}]} onPress={props.customPress}>
        
       
        <View style={styles.view}>
            <Image style={styles.image}source={props.image}></Image>
            <Text style={styles.text}>{props.title}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        alignContent: "space-between",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        
        flex: 1,
        color: 'white',
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:50,
        
        borderRadius: 5,
        height: 60,
        width: 200
        
    },
    text: {
        color: 'black',
        paddingLeft:50

    },
    image:{
        resizeMode: "center",
        width:40,
        height:40
    }
});