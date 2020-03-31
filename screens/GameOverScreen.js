import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import  Colors from '../constants/colors';
import MainButton from '../components/MainButton'


const GameOverScreen = (props) =>{
    return(
        <ScrollView>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
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
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText:{
        textAlign: 'center',
        fontSize: Dimensions.get('window').width < 400? 16: 20
    }
})

export default GameOverScreen;