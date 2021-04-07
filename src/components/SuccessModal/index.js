
import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Modal } from '@ui-kitten/components';
import CheckSvg from '../../SVG/check';
// import LottieView from 'lottie-react-native';
// import { Animated, Easing } from 'react-native';

const SuccessModal = (props) => {

    const [visibleText, setVisibleText] = React.useState(false)
    // const reFanimation = React.useRef();

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
            color: '#5AA622',
            fontFamily: 'Regular',
            fontSize: RFPercentage(2),
            top: 0,
            opacity: visibleText ? 1 : 1
        }
    });

    // React.useEffect(() => {
    //     setVisibleText(false)
    //     if (reFanimation.current) {
    //         reFanimation.current.play();
    //     }
    // },[reFanimation])

    return (
        <Modal
            visible={props.visibility}
            style={styles.modalContainer}
            onTouchStart={() => {
                console.log('touched')
                props.onTouched()
            }}
        >
            {/* <SvgUri
                width={wp(15)}
                height={hp(15)}
                source={require(`../../../assets/check_icon.svg`)}
            /> */}
            <CheckSvg
                width={wp(15)}
                height={hp(15)}
            />
            {/* <LottieView
                source={require('../../../assets/check_animation.json')}
                style={{
                    width: wp(20),
                    height: hp(20)
                }}
                ref={animation => {
                    reFanimation.current = animation;
                }}
                loop={false} 
                speed={1}
                onAnimationFinish={() => {
                    console.log('finishgaming')
                    setVisibleText(true)
                }}
            /> */}
            <Text style={styles.text}>{props.message ? props.message : 'Success!'}</Text>
        </Modal>
    )
}

export default SuccessModal

