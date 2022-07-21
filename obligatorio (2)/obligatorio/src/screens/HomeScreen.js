import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import usuario from "../Img/usuario.png"
import vehiculo from "../Img/vehiculo.jpg"
import insumo from "../Img/insumo.png"
import repuesto from "../Img/repuesto.jpg"
import tratamiento from "../Img/tratamiento.png";
import reparacion from "../Img/reparacion.jpg"
import MyButton from "../components/MyButton";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.generalView}>
                        <ScrollView>
                            <MyButton
                                image={vehiculo}
                                title="Vehiculos"
                                btnColor="white"
                                btnIcon="user-circle"
                                customPress={() => navigation.navigate("Vehicles")}
                            />

                            <MyButton
                                image={insumo}
                                title="Insumos"
                                btnColor="white"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Supplies")}
                            />

                            <MyButton
                                image={repuesto}
                                title="Repuestos"
                                btnColor="white"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Reps")}
                            />

                            <MyButton
                                image={usuario}
                                title="Usuarios"
                                btnColor="white"
                                btnIcon="user-plus"
                                customPress={() => navigation.navigate("Users")}
                            />

                            <MyButton
                                image={tratamiento}
                                title="Tratamientos"
                                btnColor="white"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Treatments")}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
