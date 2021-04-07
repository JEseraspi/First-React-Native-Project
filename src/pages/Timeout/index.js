



import * as React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import Buttons from '../../components/Buttons';
import MiniModal from '../../components/MiniModal';
import { config, refreshKey, setAccessToken } from '../../helper/token';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import SecureStorage from 'react-native-secure-storage';
import HeyPersonSvG from '../../SVG/hey_person';
import { onLogout } from '../../redux/actions/login';


const TimeoutModal = () => {
    const [visibility, setVisibility] = React.useState(true)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        wrapper: {
            width: '80%',
            alignContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: RFPercentage(2.7),
            fontFamily: 'SemiBold',
            color: '#0A0343',
            textAlign: 'center',
            marginTop: hp(4),
            marginBottom: hp(4)
        }
    });

    const handleLogout = async () => {
        setAccessToken('')
        // await SecureStorage.setItem(refreshKey, '', config)
        await AsyncStorage.setItem('user_data', '')
        onLogout();
        // Actions.login({ type: 'reset' });
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: `Login` }]
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View>
                    <HeyPersonSvG
                        width={wp(100)}
                        height={hp(40)}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Your session has timeout. Please log-in again</Text>
                </View>
                <View>
                    <Buttons
                        title={'Okay'}
                        onButtonPress={() => {
                            handleLogout();
                        }}
                        variant={'primary'}
                    />
                </View>
            </View>
        </View>
    )
}

export default TimeoutModal