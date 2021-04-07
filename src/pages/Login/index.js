import React from 'react'
import { Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { Actions } from 'react-native-router-flux'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { showLoader } from '../../redux/actions/loader';
import { login, clearLogin } from '../../redux/actions/login';
import { changeRoute } from '../../redux/actions/route';
import Loader from '../../components/Loader';
import LogoOnlySvg from '../../SVG/logo-only'
import LogoSvg from '../../SVG/logo'
import { config, getAccessToken, refreshKey, setAccessToken } from '../../helper/token'
import SecureStorage from 'react-native-secure-storage'
import Buttons from '../../components/Buttons'
import { sendTask } from '../../redux/actions/task'
import jwt_decode from 'jwt-decode'
import { saveLogoutDate } from '../../helper/check_logout'


const screenWidth = Math.round(Dimensions.get('window').width);
const fake_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2lnbi50aHVyc3RvbkBnbWFpbC5jb20iLCJwYXRpZW50X2lkIjoiMTIzNDU2IiwiaWF0IjoxNjAyMzIzMDA2LCJleHAiOjE2MDIzMjMxMjZ9.xnsLNmFhkRO4KxAJb3UGfDcZgK0T6FzvgDyoKQy-DQg'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pinCode: '',
            patientNumber: '',
            patient_id: '',
            updatedSomething: '',
            loginType: '',
            password: '',
            error_message: null
        };

    }

    componentDidMount = async () => {
        this.getPatientId()
        console.log('didmount', this.state.loginType)
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))
        if (!user_data) {
            let data = {}
            data['didmount'] = true
            await AsyncStorage.setItem('user_data', JSON.stringify(data))
            this.setState({
                loginType: 'password'
            })
        } else {
            let refresh = await SecureStorage.getItem(refreshKey, config);
            let exp = refresh ? jwt_decode(refresh) : null
            if (!exp || (exp && Date.now() - 15000 >= exp * 1000)) {
                if (user_data.didmount = true) {
                    this.setState({
                        loginType: 'password'
                    })
                }

            } else {
                if (user_data.didmount = true) {
                    this.setState({
                        loginType: 'pin code'
                    })
                }
            }
        }


        // console.log('password:', user_data.password, 'pin_code:', user_data.pin_code)
        // if (user_data.password && user_data.pin_code) {
        //     this.setState({
        //         loginType: 'pin code'
        //     })-
        // } else if (!user_data.password && user_data.pin_code) {

        // } else if (user_data.password && !user_data.pin_code) {
        //     this.setState({
        //         loginType: 'password'
        //     })
        // }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.success_message === 'login success') {
            return {
                updatedSomething: Login.handleSuccessLogin(props, state)
            };
        }
        return null
    }

    getPatientId = async () => {
        try {
            let user_data = await AsyncStorage.getItem('user_data')
            if (user_data) {
                user_data = JSON.parse(user_data);

                let patientId = user_data.patient_id;
                let _patientId = '';

                for (var x = 0; x < patientId.length; x++) {
                    if (x >= Math.round(patientId.length / 2)) {
                        _patientId += patientId.charAt(x);
                    } else {
                        _patientId += '•'
                    }
                }

                this.setState({
                    patientNumber: _patientId
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    handleSubmitLogin = async () => {
        this.props.showLoader('Loading')
        let payload = {}
        try {
            let user_data = await AsyncStorage.getItem('user_data')
            if (user_data) {
                user_data = JSON.parse(user_data)
                payload = {
                    patient_id: this.state.patient_id ? this.state.patient_id : user_data.patient_id,
                    // email: user_data.email,
                    password: this.state.password
                }
            } else {
                payload = {
                    patient_id: this.state.patient_id ? this.state.patient_id : user_data.patient_id,
                    password: this.state.password
                }
            }
        } catch {
            payload = {
                patient_id: this.state.patient_id ? this.state.patient_id : user_data.patient_id,
                password: this.state.password
            }
        }

        Keyboard.dismiss()
        this.props.login(payload);
    }

    static handleSuccessLogin = async (props, state) => {
        props.clearLogin();

        try {
            let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))
            user_data['access_token'] = data.tokens.access_token
            AsyncStorage.setItem('user_data', JSON.stringify(user_data))
        } catch (error) {
            let data = props.userdata;
            let user_data = data.user
            user_data['access_token'] = data.tokens.access_token
            AsyncStorage.setItem('user_data', JSON.stringify(user_data))
        }
        console.log(props.userdata, 'props/userdata')
        setAccessToken(props.userdata.tokens.access_token)
        this.saveRefreshToken(props.userdata.tokens.refresh_token)
        console.log(props.userdata.tokens.refresh_token, 'refresh login')

        // props.sendTask({-
        //     type: 'login'
        // })

        // Actions.setup_pincode();
        props.navigation.navigate('SetupPinCode')
        saveLogoutDate();
        Keyboard.dismiss()
        // props.changeRoute('home')ss-
    }

    static saveRefreshToken = async (token) => {
        await SecureStorage.setItem(refreshKey, token, config)
        // const got = await SecureStorage.getItem(refreshKey, config)
    }

    handleSubmitPinCode = async (pin) => {
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))

        if (!getAccessToken()) {
            setAccessToken(user_data.access_token)
        }

        if (pin !== user_data.pin_code) {
            this.setState({
                error_message: 'Incorrect PIN code please try again.'
            })
        } else {
            this.setState({
                error_message: null
            })

            // this.props.sendTask({
            //     type: 'login'
            // })

            // Actions.home({ type: 'reset' });
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: `Home` }]
            })
        }
        // renewLogoutTime();
        // startLogoutTimer();
        saveLogoutDate();
        Keyboard.dismiss()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <Layout style={styles.container}>
                    <Layout style={[styles.imageContainer, { opacity: this.state.loginType ? 1 : 0 }]}>
                        <LogoOnlySvg
                            width={wp(50)}
                            height={hp(15)}
                        />
                        <LogoSvg
                            width={wp(45)}
                            height={hp(5)}
                        />
                    </Layout>
                    <Layout style={styles.buttonContainer}>
                        {
                            this.state.loginType === 'pin code' ? (
                                <>
                                    <Text style={styles.patientNumber}>{this.state.patientNumber}</Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.props.clearLogin();
                                            // Actions.register()
                                            this.props.navigation.navigate('Register')
                                        }}>
                                        <Text style={styles.buttonText}>Change Patient Number</Text>
                                    </TouchableOpacity>
                                </>
                            ) : this.state.loginType === 'password' ? (
                                <>
                                    <Layout style={styles.textContainer}>
                                        <Text style={styles.h3}> Enter your patient number</Text>
                                    </Layout>
                                    <Layout style={styles.fieldContainer}>
                                        <TextInput
                                            onChangeText={(e) => this.setState({ patient_id: e })}
                                            style={styles.textInput}
                                            value={this.state.patient_id}
                                        />
                                    </Layout>
                                </>
                            ) : null
                        }
                    </Layout>
                    <Layout style={styles.textContainer}>
                        {
                            this.state.loginType === 'password' ? (
                                <Text style={styles.h3}> Enter your Password</Text>
                            ) : this.state.loginType === 'pin code' ? (
                                <Text style={styles.h3}> Enter your PIN</Text>
                            ) : null
                        }

                    </Layout>
                    <Layout style={styles.fieldContainer}>
                        {
                            this.state.loginType === 'pin code' ? (
                                <SmoothPinCodeInput
                                    password
                                    mask="﹡"
                                    cellSize={wp(7.5)}
                                    codeLength={4}
                                    value={this.state.pinCode}
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
                                    onTextChange={value => this.setState({ pinCode: value })}
                                    onFulfill={(e) => {
                                        this.handleSubmitPinCode(e)
                                    }}
                                />
                            ) : this.state.loginType === 'password' ? (
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={(e) => this.setState({ password: e })}
                                    style={styles.textInput}
                                    value={this.state.password}
                                />
                            ) : null
                        }

                    </Layout>
                    <Layout style={styles.errorMessageContainer}>
                        {this.props.error_message ? <Text style={styles.errorText}>{this.props.error_message}</Text> : null}
                        {this.state.error_message ? <Text style={styles.errorText}>{this.state.error_message}</Text> : null}
                    </Layout>
                    <Layout style={styles.textContainer}>
                        {
                            this.state.loginType === 'pin code' ? (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.navigation.navigate('SetupPinCode')}>
                                    <Text style={styles.buttonTextBigger}>Forgot PIN?</Text>
                                </TouchableOpacity>
                            ) : this.state.loginType === 'password' ? (
                                <>
                                    <Buttons
                                        disabled={this.state.loginType === 'password' && this.state.password !== '' ? false : true}
                                        title={'SIGN IN'}
                                        onButtonPress={() => this.handleSubmitLogin()}
                                        variant={'primary'}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            marginTop: hp(5)
                                        }}
                                        onPress={() => {
                                            // Actions.register()
                                            this.props.navigation.navigate('Register')
                                        }}
                                    >
                                        <Text style={styles.link}>Don't have an account? Register here.</Text>
                                    </TouchableOpacity>
                                </>
                            ) : null
                        }

                    </Layout>

                    <Loader
                        visibility={this.props.loaderVisibility}
                        message={this.props.loaderMessage}
                    />
                </Layout>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => ({
    error_message: state.loginReducer.error_message,
    success_message: state.loginReducer.success_message,
    loaderVisibility: state.loaderReducer.visibility,
    loaderMessage: state.loaderReducer.message,
    userdata: state.loginReducer.userdata
})

export default connect(mapStateToProps, {
    login,
    showLoader,
    clearLogin,
    sendTask
    // changeRoute
})(Login)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular',
        color: '#0A0343',
        // textDecorationLine: 'underline',
        // textDecorationColor: '#0A0343'
    },
    fieldContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RFPercentage(2)
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: RFPercentage(4.75),
        marginBottom: RFPercentage(.25)
    },
    textContainer: {
        alignItems: 'center',
        marginTop: RFPercentage(1.35),
        // marginBottom: RFPercentage(1),
    },
    patientNumber: {
        fontFamily: 'SemiBold',
        fontSize: RFPercentage(3),
        lineHeight: RFPercentage(4.5),
        color: '#252262',
        top: RFPercentage(1),
        letterSpacing: 2,
        zIndex: 1,
    },
    h3: {
        fontFamily: 'Bold',
        fontSize: RFPercentage(2.3),
        lineHeight: RFPercentage(4.5),
        color: '#252262',
    },
    p: {
        fontFamily: 'Regular',
        fontSize: RFPercentage(2),
        color: '#252262',
    },
    textInput: {
        borderColor: '#e5e5e5',
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: wp(45),
        // marginTop: RFPercentage(1.5),
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular'
    },
    button: {
        paddingTop: 2.5,
        paddingBottom: 2.5,
        marginBottom: RFPercentage(2.5),
        fontFamily: 'SemiBold',
        borderBottomWidth: 1,
        borderColor: '#60a73a'
    },
    buttonText: {
        color: '#60a73a',
        fontSize: RFPercentage(1.7),
    },
    buttonTextBigger: {
        fontFamily: 'SemiBold',
        color: '#60a73a',
        fontSize: RFPercentage(2.25),
    },
    errorMessageContainer: {
        marginTop: 10,
        marginBottom: 0,
        alignItems: 'center'
    },
    errorText: {
        fontFamily: 'SemiBold',
        fontSize: RFPercentage(1.4),
        color: '#e24242'
    },
});