import React from 'react';
import { View, Text , StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import  Colors from '../constants/colors';


const  MainButton = (props) =>{
    
    let ButtonComponent = TouchableOpacity;
    if(Platform.OS === 'android'){
        ButtonComponent = TouchableNativeFeedback;
    }
    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}
                background={TouchableNativeFeedback.Ripple('#f6f6f6', false)}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>  
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 25,
        overflow:'hidden',
        },
    button:{
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10
    },
    buttonText:{
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton;