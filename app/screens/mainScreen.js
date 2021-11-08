import * as React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function MainScreen({ navigation }) {
  function playSimonSays() {
    navigation.navigate("Game", {
      length: 2,
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.logo} source={require("../../assets/myLogo.png")} />
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={playSimonSays} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: "100%", height: 150, marginTop: 20 },
});
