import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Headers  from "./components/Header";
import  StartGameScreen  from "./screens/StartGameScreen";
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Fonts from 'expo-font'
import {AppLoading} from 'expo'

const fetchFonts = () =>{
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })
  

}

export default function App() {

  const [userChoice, setUserChoice] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }
  const startGameHandler = (selectedNum) =>{
    setUserChoice(selectedNum)
  }

  const restartGameHandler = () =>{
    setGuessRounds(0)
    setUserChoice(null)

  } 

  const gameOverHandler = (numOfRounds) =>{
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if(userChoice && (guessRounds <= 0)){
    content = <GameScreen userChoice={userChoice} onGameOver={gameOverHandler}/>
  } else if(guessRounds > 0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userChoice} onRestart={restartGameHandler}/>
  }
  return (
    <View style={styles.screen}>
        <Headers title='Guess A Number' />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  }

});
