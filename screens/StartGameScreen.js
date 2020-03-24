import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton' 

 const StartGameScreen = (props) =>{
     
    //even though it would be a number later, technically it's a string at the beginning,
    //  cuz all input is just a string and we manually have to convert it to a number if we want to
    const [enteredValue, setEnteredValue] = useState('')
    
    const [confirmed, setConfirmed] =  useState(false)
    const [selectedNumber, setSelectedNumber] = useState()


    const numberInputHandler = (textInput) =>{
        setEnteredValue(textInput.replace(/[^0-9]/g, ''))
    }
    
    const resetInputHandler = () =>{
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmedInputHandler = () =>{
        const choosenNumber = parseInt( enteredValue )
        
          if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99){
            Alert.alert('Invalid Number!', 'Value Should be between 1 - 99.', [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(choosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = 
            <Card style={styles.summeryContainer}>
                    <Text>You Selected </Text>
                    <NumberContainer>
                        {selectedNumber}
                    </NumberContainer>
                    <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                         Start Game  
                    </MainButton>
                    
            </Card>
    }
    return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start A New Game</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select A Number</BodyText>
                <Input style={styles.input}
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                         <Button title='Reset' color={Colors.primary} onPress={resetInputHandler}/>
                    </View>
                    <View style={styles.button}>
                         <Button title='Confirm' color={Colors.accent} onPress={confirmedInputHandler}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    </TouchableWithoutFeedback>    
      
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    input:{
        width: 50,
        textAlign: 'center',

    },
    title:{
        marginVertical: 10,
    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button:{
        width: 100
    },
    summeryContainer:{
        marginTop: 15,
        alignItems: 'center',
    }
})

export default StartGameScreen;