import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import  Colors from '../constants/colors';
import MainButton from '../components/MainButton'


const GameOverScreen = (props) =>{
    return(
        <View style={styles.screen}>
            <TitleText>The Game Is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')} 
                    style={styles.image} resizeMode="cover"/>
            </View>

            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                        Your Phone Needed {''}
                         <Text style={styles.highlight}>{props.roundsNumber}</Text>
                         {''} Rounds To Guess The Number {''}
                        <Text style={styles.highlight}>{props.userNumber}.</Text> 
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>

        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image:{
        width: '100%', 
        height: '100%'
    },
    highlight:{
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer:{
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText:{
        textAlign: 'center',
        fontSize: 20
    }
})

export default GameOverScreen;