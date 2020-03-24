import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/BodyText'

const GenerateRanndomBetween = (min, max, excluded) =>{
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min) + min)


    if(rndNum === excluded){
       return GenerateRanndomBetween(min, max, excluded) //exclude our number (only) for the first time.
    }
    else {
        return rndNum;
    }
}

const renderListItm = (value, numOfRounds) => (<View key={value} style={styles.listItem}>
                <BodyText>#{numOfRounds}</BodyText>
                <BodyText>{value}</BodyText>
         </View>)

     

const GameScreen = (props) =>{
    const initialGuess = GenerateRanndomBetween(1, 100, props.userChoice)

    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const [pastGuesses, setPastGuesses] = useState([initialGuess])

  //useRef allows us to define a value which survives component rerenders       
    const currentHigh = useRef(100)
    const currentLow = useRef(1)

    useEffect(() =>{
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length)
        }
    })

      const nextGuessHandler = (direction) =>{
            if( 
                (direction === 'lower' && currentGuess < props.userChoice) || 
                (direction === 'higher' && currentGuess > props.userChoice) 
                ){
                  Alert.alert('Don\'nt Cheat', 'You know that this is wrong', [{style: 'cancel', text: 'Sorry'}])
                    return;
                }
    
            if(direction === 'lower'){
                currentHigh.current = currentGuess
            } else {
                currentLow.current = currentGuess + 1

            }
            const nextNumber = GenerateRanndomBetween(currentLow.current, currentHigh.current, currentGuess)
            setCurrentGuess(nextNumber)

        //we're using nextNumber instead of currentGuess because React won't have updated the state and rebuilt yet
            setPastGuesses((currPastguesses => [ nextNumber.toString(), ...currPastguesses]))
      }

    return(
            <View style={styles.screen}>
                <TitleText>Opponent's Guess: </TitleText>
                <NumberContainer>{currentGuess}</NumberContainer>

                <Card style={styles.buttonContainer}>
                    <MainButton onPress={() => nextGuessHandler('lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </MainButton>
                    <MainButton onPress={() => nextGuessHandler('higher')}>
                        <Ionicons name="md-add" size={24} color='white' />
                    </MainButton>
                </Card>
                <View style={styles.listContainer}> 
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => (
                            renderListItm(guess, pastGuesses.length - index)
                        ))}
                    </ScrollView>
                </View>

            </View>
        )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 1,
        alignItems: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        width: 400,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop: 20
    },
    
    listItem:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        backgroundColor: 'white',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    
    listContainer:{
        width: '100%',
        flex: 1
    },
   
    list:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1,

    }


})

export default GameScreen;