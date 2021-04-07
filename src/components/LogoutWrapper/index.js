
import * as React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View, Keyboard, AppState } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { getLogoutDate, isToLogout, saveLogoutDate, setToLogout } from '../../helper/check_logout';
import { Actions } from 'react-native-router-flux';
import CustomModal from '../CustomModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogoutWrapper = (props) => {
    const [visibility, setVisibility] = React.useState(false)
    // const [logoutDate, setLogoutDate] = React.useState(new Date().getTime() + FIVE_MIN)
    // let interval;
    // const FIVE_MIN = 1 * 30 * 1000;
    const appState = React.useRef(AppState.currentState);


    React.useEffect(() => {
        // let countdownDate = getLogoutDate()
        // let countdown = new Date().getTime();
        // console.log(countdownDate, countdown, 'wew')
        // if (countdownDate <= countdown) {
        //     triggerModal()
        // }

        saveLogoutDate();
    })

    React.useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState)
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the active!");
            let countdownDate = getLogoutDate()
            let countdown = new Date().getTime();
            if (countdownDate <= countdown) {
                triggerModal()
            }
            saveLogoutDate();
        } else if (nextAppState === 'background') {
            saveLogoutDate();
            console.log("App has come to the background!");
        }

        appState.current = nextAppState;
        console.log("AppState", appState.current);
    };

    const handleOnTouch = () => {
        // let countdownDate = getLogoutDate()
        // let countdown = new Date().getTime();
        // console.log(countdownDate, countdown, 'wew')
        // if (countdownDate <= countdown) {
        //     triggerModal()
        // }

        saveLogoutDate();
        Keyboard.dismiss()
    }


    const triggerModal = () => {
        // clearInterval(interval)
        // setToLogout(true)
        setVisibility(true)
    }

    const handleOnLogout = () => {
        console.log(isToLogout(), 'isLoggedout')
        setVisibility(false)
        // setToLogout(false)
        saveLogoutDate();
        Actions.login({ type: 'reset' })
    }

    return (
        <React.Fragment>
            <View onStartShouldSetResponder={() => handleOnTouch()} style={{ flex: 1}}>
                {props.children}
            </View>
            <CustomModal
                visibility={visibility}
            >
                <View style={{ textAlign: 'center' }}>
                    <Text style={{fontSize: RFPercentage(4), textAlign: 'center', marginTop: hp(2), marginBottom: hp(1) }}>😴</Text>
                    <Text style={{ color: '#fff', fontFamily: 'Regular', fontSize: RFPercentage(2.25), textAlign: 'center' }}>You have been</Text>
                    <Text style={{ color: '#fff', fontFamily: 'Regular', fontSize: RFPercentage(2.25), textAlign: 'center' }}>automatically logged out</Text>
                    <Text style={{ color: '#fff', fontFamily: 'Regular', fontSize: RFPercentage(2.25), textAlign: 'center', marginBottom: hp(2) }}>due to inactivity.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: hp(3)}}>
                        <TouchableOpacity
                            onPress={() => handleOnLogout()}
                        >
                            <Text style={{ color: '#60A73A', fontSize: RFPercentage(2.25), fontFamily: 'SemiBold', borderBottomWidth: 1, borderBottomColor: '#60A73A' }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomModal>
        </React.Fragment>
    )
}

export default LogoutWrapper

