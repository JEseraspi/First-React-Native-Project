
import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
// import SvgUri from 'react-native-svg-uri';
import { Modal } from '@ui-kitten/components';
// import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = (props) => {

    return (
        <Modal 
            visible={props.visibility} 
            style={styles.modalContainer}
        >
            <LottieView
                source={require('../../../assets/loading_animation.json')}
                style={{
                    width: wp(20),
                    height: hp(20)
                }}
                speed={1}
                autoPlay
                loop
            />
            <Text style={styles.text}>{props.message ? props.message : 'Loading'}</Text>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({
    modalContainer: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       height: '100%',
    },
    text: {
       color: '#252262',
       fontFamily: 'Regular',
       fontSize: RFPercentage(2),
       top: -20
    }
});