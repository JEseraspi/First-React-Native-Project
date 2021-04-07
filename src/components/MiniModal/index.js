
import * as React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Modal } from '@ui-kitten/components';

const MiniModal = (props) => {

    // const reFanimation = React.useRef();

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
        modalWrapper: {
            borderWidth: 2,
            borderColor: '#78C01D',
            backgroundColor: '#fff',
            width: wp(60),
            height: hp(25),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(5),
            shadowColor: '#78C01D',
            shadowOpacity: 0.5,
            shadowRadius: wp(1),
            paddingLeft: wp(2),
            paddingRight: wp(2),
            marginTop: hp(35)
        },
        text: {
            color: '#5AA622',
            fontFamily: 'Regular',
            fontSize: RFPercentage(1.8),
            top: 0,
            marginTop: hp(1),
            color: '#0A0442',
            textAlign: 'center'
        },
        hText: {
            color: '#5AA622',
            fontFamily: 'SemiBold',
            fontSize: RFPercentage(2),
            textAlign: 'center'
        },  
        iconContainer: {
            marginBottom: hp(1)
        }
    });


    return (
        <TouchableWithoutFeedback onPress={() => { props.closeModal() }}>
            <Modal
                visible={props.visibility}
                style={styles.modalContainer}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.iconContainer}>
                        {props.children}
                    </View>
                    {props.headerMessage ? <Text style={styles.hText}>{props.headerMessage ? props.headerMessage : ''}</Text> : null }
                    <Text style={styles.text}>{props.message ? props.message : ''}</Text>
                </View>
            </Modal>
        </TouchableWithoutFeedback>
    )
}

export default MiniModal

