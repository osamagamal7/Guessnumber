import React from 'react';
import { View, StyleSheet } from 'react-native'


const Card = (props) =>{
    return(
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
} 

const styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
        elevation: 7,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,

    }
})

export default Card

