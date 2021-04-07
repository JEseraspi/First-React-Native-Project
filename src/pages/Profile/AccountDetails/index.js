import * as React from 'react';
import CameraRoll from "@react-native-community/cameraroll";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import LogoSvg from '../../../SVG/logo';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Buttons from '../../../components/Buttons';
import { PermissionsAndroid, Platform } from "react-native";
// import PhotosModal from './PhotosModal';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { config, refreshKey, setAccessToken } from '../../../helper/token';
import SecureStorage from 'react-native-secure-storage';
import { onLogout, logoutPost, clearLogin } from '../../../redux/actions/login';
import * as RootNavigation from '../../../helper/navigate_service'
import { connect } from 'react-redux';

const AccountDetails = (props, state) => {

    const [activeButton, setActiveButton] = React.useState(props.option)
    const [changePinStep, setChangePinStep] = React.useState('enter current pin')
    const [pinCode, setPinCode] = React.useState('')
    const [newPinCode, setNewPinCode] = React.useState('')
    const [verifyPinCode, setVerifyPinCode] = React.useState('')
    const [error, setError] = React.useState({
        open: false,
        message: ''
    })
    const [nickName, setNickName] = React.useState(props.nickname)
    // const [photos, setPhotos] = React.useState('');
    // const [photosVisible, setPhotosVisible] = React.useState(false)

    React.useEffect(() => {
        if (props.option === 'settings') {
            setActiveButton(props.option)
        }
        console.log(activeButton)
    }, [props.option])


    const styles = StyleSheet.create({
        container: {
            flex: 3,
            alignItems: 'center',

        },
        wrapper: {
            width: '100%',
            alignItems: 'center',
            flex: 1,
            marginTop: hp(5),
            marginBottom: hp(2),
        },
        wrapperEdit: {
            width: '85%',
            alignItems: 'flex-start',
            // flex: 1,
            marginTop: hp(5),
            marginBottom: hp(2),
        },
        buttonsContainer: {
            borderBottomColor: '#78C01D',
            borderBottomWidth: 2,
            paddingTop: hp(1.5),
            paddingBottom: hp(0.5),
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '85%',
        },
        buttonText: {
            color: '#0A0343',
            fontSize: RFPercentage(2.3),
            textAlign: 'left',
            fontFamily: 'SemiBold',
        },
        buttonIcon: {
            position: 'absolute',
            right: 0
        },
        logoContainer: {
            // position: 'absolute',
            // bottom: '5%'
            marginTop: hp(6)
            // flex: 1
        },
        fieldLabel: {
            fontSize: RFPercentage(2.3),
            fontFamily: 'Bold',
            color: '#0A0343',
            margin: hp(1),
            textAlign: 'center'
        },
        fieldLabel2: {
            fontSize: RFPercentage(2.2),
            fontFamily: 'Bold',
            color: '#0A0343',
            marginTop: hp(1),
        },
        errorField: {
            fontSize: RFPercentage(1.75),
            color: '#FF0001',
            textAlign: 'center',
            marginTop: hp(2),
        },
        textInput: {
            borderColor: '#e5e5e5',
            backgroundColor: '#e5e5e5',
            borderRadius: 5,
            borderWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            width: wp('40'),
            marginTop: 5,
            fontSize: RFPercentage(2.2),
            fontFamily: 'Regular',
            textAlign: 'center'
        },
        textInput2: {
            borderColor: '#e5e5e5',
            backgroundColor: '#e5e5e5',
            borderRadius: 5,
            borderWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
            width: wp('50'),
            marginTop: 5,
            fontSize: RFPercentage(2.2),
            fontFamily: 'Regular',
            textAlign: 'left'
        },
    })

    React.useEffect(() => {
        console.log(props.actionSheet, 'actionsheet')

        if (props.actionSheet === 0) {
            handleChangePhoto();
        } else if (props.actionSheet === 1) {
            handleTakePhoto();
        } else if (props.actionSheet === 2) {
            props.setPhotos('')
        }

    }, [props.actionSheet])

    // const hasAndroidPermission = async () => {
    //     const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    //     const hasPermission = await PermissionsAndroid.check(permission);
    //     if (hasPermission) {
    //         return true;
    //     }

    //     const status = await PermissionsAndroid.request(permission);
    //     return status === 'granted';
    // }

    const handleChangePhoto = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true
        }).then(image => {
            props.setPhotos(image.data)
        });
    }

    const handleTakePhoto = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true
        }).then(image => {
            props.setPhotos(image.data)
        });
    }

    const handleLogout = async () => {

        setAccessToken('')
        await SecureStorage.setItem(refreshKey, '', config)
        await AsyncStorage.setItem('user_data', '')
        onLogout();
        logoutPost();

        RootNavigation.navigate(`Login`)


    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                {
                    activeButton === 'edit account' ? (
                        <View style={styles.wrapperEdit}>
                            <TouchableOpacity
                                style={{
                                    borderBottomWidth: 2,
                                    borderBottomColor: '#78C01D',
                                    paddingBottom: hp(0.25),
                                    paddingTop: hp(0.25),
                                    marginBottom: hp(3)
                                }}
                                onPress={() => {
                                    props.actionSheetOpen()
                                }}
                            >
                                <Text style={{ color: '#78C01D', fontSize: RFPercentage(1.9), fontFamily: 'SemiBold' }}>Change Profile Photo</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.fieldLabel2}>Nickname</Text>
                                <TextInput
                                    onChangeText={(e) => setNickName(e)}
                                    style={styles.textInput2}
                                    value={nickName}
                                />
                            </View>
                            <View style={{ paddingTop: hp(2), flexDirection: 'row' }}>
                                <View>
                                    <Buttons
                                        title={'SAVE'}
                                        size={2.25}
                                        width={wp(21)}
                                        bgcolor={'#E5E5E5'}
                                        padding={5}
                                        color={'#252262'}
                                        borderColor={'#ccc'}
                                        onButtonPress={() => {
                                            props.onChangeNickName(nickName)
                                            // setActiveButton('settings')
                                            // props.changeOption('Account Details')
                                            Keyboard.dismiss()
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: wp(2) }}>
                                    <Buttons
                                        title={'CANCEL'}
                                        size={2.25}
                                        width={wp(21)}
                                        bgcolor={'#E5E5E5'}
                                        padding={5}
                                        color={'#252262'}
                                        borderColor={'#ccc'}
                                        onButtonPress={() => {
                                            setActiveButton('settings')
                                            props.changeOption('Account Details')
                                            setNickName(props.nickname)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : activeButton === 'change pin' ? (
                        <View style={[styles.wrapper, { marginTop: hp(0) }]}>
                            {
                                changePinStep === 'enter current pin' ? (
                                    <>
                                        <Text style={[styles.fieldLabel, { marginBottom: hp(3.5) }]}>Enter your current PIN code</Text>
                                        <SmoothPinCodeInput
                                            password
                                            mask="﹡"
                                            cellSize={wp(7.5)}
                                            codeLength={4}
                                            value={pinCode}
                                            editable={true}
                                            animated={false}
                                            cellStyle={{
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                width: wp(7.5),
                                                height: hp(4.75),
                                                borderColor: '#fff',
                                                backgroundColor: '#e5e5e5',
                                            }}
                                            cellStyleFocused={{
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                            }}
                                            textStyle={{
                                                fontSize: RFPercentage(2),
                                                fontFamily: 'SemiBold',
                                                color: '#252262',
                                                borderColor: '#252262'
                                            }}
                                            textStyleFocused={{
                                                fontFamily: 'SemiBold',
                                                color: '#252262'
                                            }}
                                            onTextChange={value => setPinCode(value)}
                                            onFulfill={(e) => {
                                                if (props.pincode === e) {
                                                    setChangePinStep('enter new pin')
                                                    setPinCode('')
                                                    setError({
                                                        open: false,
                                                        message: ""
                                                    })
                                                } else {
                                                    setPinCode('')
                                                    setError({
                                                        open: true,
                                                        message: "You enter a wrong PIN code"
                                                    })
                                                }
                                            }}
                                        />
                                        <View>
                                            {
                                                error.open && <Text style={styles.errorField}>{error.message}</Text>
                                            }
                                        </View>
                                    </>
                                ) : changePinStep === 'enter new pin' ? (
                                    <>
                                        <View>
                                            <Text style={styles.fieldLabel}>New PIN code</Text>
                                            <TextInput
                                                onChangeText={(e) => setNewPinCode(e)}
                                                style={styles.textInput}
                                                value={newPinCode}
                                                keyboardType={'numeric'}
                                                maxLength={4}
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.fieldLabel}>Verify PIN code</Text>
                                            <TextInput
                                                onChangeText={(e) => setVerifyPinCode(e)}
                                                style={styles.textInput}
                                                value={verifyPinCode}
                                                maxLength={4}
                                                keyboardType={'numeric'}
                                                secureTextEntry={true}
                                            />
                                        </View>
                                        <View>
                                            {
                                                error.open && <Text style={styles.errorField}>{error.message}</Text>
                                            }
                                        </View>
                                        <View style={{ paddingTop: hp(4) }}>
                                            <Buttons
                                                title={'SAVE'}
                                                size={2.75}
                                                width={wp(25)}
                                                disabled={!newPinCode || !verifyPinCode ? true : false}
                                                onButtonPress={() => {
                                                    if (newPinCode !== verifyPinCode) {
                                                        setError({
                                                            open: true,
                                                            message: "New PIN code and Verify PIN code doesn't match."
                                                        })
                                                        setNewPinCode('')
                                                        setVerifyPinCode('')
                                                    } else {
                                                        props.onChangePin(newPinCode)
                                                        setError({
                                                            open: false,
                                                            message: ""
                                                        })
                                                        setNewPinCode('')
                                                        setVerifyPinCode('')
                                                        setChangePinStep('enter current pin')
                                                        Keyboard.dismiss()
                                                    }
                                                }}
                                            />
                                        </View>
                                    </>
                                ) : null
                            }

                        </View>
                    ) : (
                                <View style={styles.wrapper}>
                                    <TouchableOpacity
                                        style={styles.buttonsContainer}
                                        onPress={() => {
                                            setActiveButton('edit account')
                                            props.changeOption('EDIT ACCOUNT DETAILS')
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Edit Account Details</Text>
                                        <AntDesign style={styles.buttonIcon} name="caretright" size={wp(3)} color="#78C01D" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonsContainer}
                                        onPress={() => {
                                            setActiveButton('change pin')
                                            props.changeOption('CHANGE PIN CODE')
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Change PIN Code</Text>
                                        <AntDesign style={styles.buttonIcon} name="caretright" size={wp(3)} color="#78C01D" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonsContainer}
                                        onPress={() => {
                                            handleLogout();
                                            setActiveButton('')
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Logout</Text>
                                        <AntDesign style={styles.buttonIcon} name="caretright" size={wp(3)} color="#78C01D" />
                                    </TouchableOpacity>
                                </View>
                            )
                }
                <View style={styles.logoContainer}>
                    <LogoSvg
                        width={wp(45)}
                        height={hp(5)}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    logout_error_message: state.loginReducer.logout_error_message,
    logout_success_message: state.loginReducer.logout_success_message,
})

export default connect(mapStateToProps, {
    logoutPost,
    clearLogin
})(AccountDetails)