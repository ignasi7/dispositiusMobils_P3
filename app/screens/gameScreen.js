import React, { useState, useEffect } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

var randomArray = [];
var index = 0;
var indexPlayer = 0;
var timeToShowSelectedButton = false;

export default function GameScreen({ route, navigation }) {
  const { length, name } = route.params;
  const [gameFinished, setGameFinished] = useState(false);
  const [infoLabel, setInfoLabel] = useState("");
  const [winOrLoseLabel, setWinOrLoseLabel] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [redButtonSelected, setRedButtonSelected] = useState(false);
  const [blueButtonSelected, setBlueButtonSelected] = useState(false);
  const [greenButtonSelected, setGreenButtonSelected] = useState(false);
  const [yellowButtonSelected, setYellowButtonSelected] = useState(false);

  useEffect(() => {
    console.log("He rebut el param length amb valor: " + length);
    console.log("He rebut el nom: " + name);
    
    /* Crear sequencia aleatoria amb llargada que t'entri (del 0 al 1)*/
    for(var i = 0; i < length; i++)
    {
      var max = 3;
      var min = 0;
      var randomButton = Math.floor(Math.random() * (max - min + 1)) + min;
      randomArray.push(randomButton);
      console.log(randomArray);
    }
    initGame();

    const interval = setInterval(() => {
      upateGame();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const initGame = () => {
    indexPlayer;
    setInfoLabel("The sequence is...");
    setButtonsDisabled(true);
    index = 0;
    timeToShowSelectedButton = false;
  };

  const upateGame = () => {
    if (index < randomArray.length) {
      if (timeToShowSelectedButton) {
        SelectButton(randomArray[index]);
        index++;
      } else {
        SelectButton("none");
      }
      timeToShowSelectedButton = !timeToShowSelectedButton;
    } else {
      SelectButton("none");
      setButtonsDisabled(false);
      setInfoLabel("It's your turn");
    }
  };

  const SelectButton = (value) => {
    if (value === 0) {
      //Red
      setRedButtonSelected(true);
      setBlueButtonSelected(false);
      setGreenButtonSelected(false);
      setYellowButtonSelected(false);
    } else if (value === 1) {
      //blue
      setRedButtonSelected(false);
      setBlueButtonSelected(true);
      setGreenButtonSelected(false);
      setYellowButtonSelected(false);
    } else if (value === 2) {
      //green
      setRedButtonSelected(false);
      setBlueButtonSelected(false);
      setGreenButtonSelected(true);
      setYellowButtonSelected(false);
    } else if (value === 3) {
      //yellow
      setRedButtonSelected(false);
      setBlueButtonSelected(false);
      setGreenButtonSelected(false);
      setYellowButtonSelected(true);
    } else {
      setRedButtonSelected(false);
      setBlueButtonSelected(false);
      setGreenButtonSelected(false);
      setYellowButtonSelected(false);
    }
  };

  const onButtonpressed = (color) => {
    //0:Red
    //1: blue
    //2: green
    //3: yellow
    let value = -1;
    if (color === "red") {
      value = 0;
    } else if (color === "blue") {
      value = 1;
    } else if (color === "green") {
      value = 2;
    } else if (color === "yellow") {
      value = 3;
    }

    if (randomArray[indexPlayer] === value) {
      indexPlayer++;
      if (indexPlayer == randomArray.length) {
        setGameFinished(true);
        setWinOrLoseLabel("You win");
      }
    } else {
      setInfoLabel("Game Over");
      setGameFinished(true);
      setWinOrLoseLabel("You lose");
    }

    console.log(color);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{infoLabel}</Text>
      {gameFinished && <Text>{winOrLoseLabel}</Text>}

      <View style={styles.row}>
        <TouchableHighlight
          disabled={buttonsDisabled}
          onPress={() => onButtonpressed("red")}
        >
          <View
            style={
              redButtonSelected ? styles.buttonRed_Selected : styles.buttonRed
            }
          >
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          disabled={buttonsDisabled}
          onPress={() => onButtonpressed("blue")}
        >
          <View
            style={
              blueButtonSelected
                ? styles.buttonBlue_Selected
                : styles.buttonBlue
            }
          >
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight
          disabled={buttonsDisabled}
          onPress={() => onButtonpressed("green")}
        >
          <View
            style={
              greenButtonSelected
                ? styles.buttonGreen_Selected
                : styles.buttonGreen
            }
          >
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          disabled={buttonsDisabled}
          onPress={() => onButtonpressed("yellow")}
        >
          <View
            style={
              yellowButtonSelected
                ? styles.buttonYellow_Selected
                : styles.buttonYellow
            }
          >
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonRed: {
    alignItems: "center",
    backgroundColor: "#f31212",
    padding: 10,
  },

  buttonRed_Selected: {
    alignItems: "center",
    backgroundColor: "#772208",
    padding: 10,
  },

  buttonBlue: {
    alignItems: "center",
    backgroundColor: "#0d33f2",
    padding: 10,
  },

  buttonBlue_Selected: {
    alignItems: "center",
    backgroundColor: "#052b94",
    padding: 10,
  },

  buttonGreen: {
    alignItems: "center",
    backgroundColor: "#0df242",
    padding: 10,
  },

  buttonGreen_Selected: {
    alignItems: "center",
    backgroundColor: "#2b7406",
    padding: 10,
  },

  buttonYellow: {
    alignItems: "center",
    backgroundColor: "#eef44e",
    padding: 10,
  },

  buttonYellow_Selected: {
    alignItems: "center",
    backgroundColor: "#8e780b",
    padding: 10,
  },
});
