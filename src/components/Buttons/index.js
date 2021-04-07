import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

const Buttons = (props) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        button: {
            backgroundColor: props.bgcolor ? props.bgcolor : '#0A0343',
            borderWidth: 1,
            borderColor: props.borderColor ? props.borderColor : '#0A0343',
            borderRadius: 5,
            padding: props.padding ? props.padding : 4,
            height: props.height ? props.height : undefined,
            alignItems: 'center',
            opacity: props.disabled ? 0.75 : 1,
            zIndex: 20
        },
        text: {
            color: props.color ? props.color :  '#fff',
            fontFamily: 'SemiBold',
            fontSize: props.size ? RFPercentage(props.size) : RFPercentage(2.5),
            width: props.width ? props.width : wp('35%'),
            textAlign: 'center'
        }
    })


    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={styles.button}
            onPress={() => props.onButtonPress()}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Buttons