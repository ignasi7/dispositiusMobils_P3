import * as React from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function MainScreen({ navigation }) {
  
  var sequenceLength = 3;
  var playerName = "unnamed";

  function playSimonSays() {
    navigation.navigate("Game", {
      length: sequenceLength,
      name: playerName,
    });
  }

  function changeLength(number) {
    sequenceLength = number.target.value;
  }

  function changeName(name) {
    playerName = name.target.value;
  }


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.logo} source={require("../../assets/myLogo.png")} />
      <p> </p>

      <Text>Introduce your name:</Text>
      <input style={{width: '150px'}} type="text" onChange={changeName}/>

      <Text>Introduce the length of the sequence:</Text>
      <input style={{width: '50px'}} type="number" onChange={changeLength}/>

      <p></p>
      <Button title="Go to Details" onPress={playSimonSays} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: { width: "100%", height: 150, marginTop: 20 },
});
