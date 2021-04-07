import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Buttons from '../../components/Buttons';
import CheckBox from 'react-native-check-box'
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from 'react-redux'
import { registerUser, registerClear } from '../../redux/actions/registration';
import { emailRegex } from '../../contants/regex';
import AsyncStorage from '@react-native-community/async-storage';
import { showLoader, hideLoader } from '../../redux/actions/loader';
import { showModal, hideModal } from '../../redux/actions/modal';
import Loader from '../../components/Loader';
import SuccessModal from '../../components/SuccessModal';
import TermsAndConditions from '../TermsAndConditions';
import LogoOnlySvg from '../../SVG/logo-only';
import LogoSvg from '../../SVG/logo';
import { sendTask } from '../../redux/actions/task'
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenWidth = Math.round(Dimensions.get('window').width);

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperIndex: 0,
            checked: false,
            email: '',
            emailValid: false,
            patientNumber: '',
            openTerms: false,
        };
    }


    verifyEmail = () => {
        this.props.showLoader('Verifying your details');
        let params = {
            email: this.state.email,
            patient_id: this.state.patientNumber,
        }
        Keyboard.dismiss()
        this.props.registerUser(params)
    }

    static getDerivedStateFromProps = async (props, state) => {
        if (props.success_message === 'register success') {
            props.registerClear();
            console.log(props.register_payload, 'register_payload')
            if (props.register_payload) {
                let data = props.register_payload

                await AsyncStorage.setItem('user_data', JSON.stringify(data));

                if (!props.register_payload.is_verified) {
                    props.showModal('Registration details verified!');
                    // Actions.verify_email();
                    props.navigation.navigate('VerifyEmail')
                } else if (props.register_payload.is_verified && props.register_payload.password) {
                    // Actions.login();
                    props.navigation.navigate('Login')
                } else if (props.register_payload.is_verified && !props.register_payload.nickname) {
                    // Actions.enter_nickname();
                    props.navigation.navigate('EnterNickName')
                } else if (props.register_payload.is_verified && props.register_payload.nickname && !props.register_payload.nickname) {
                    // Actions.setup_pincode();
                    props.navigation.navigate('SetupPinCode')
                }

            }
        }

        return null
    }

    setStorage = async (payload) => {
        try {
            await AsyncStorage.setItem('user_data', payload);
        } catch (e) {
            console.log(e)
        }
    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <LogoOnlySvg
                            width={wp(50)}
                            height={hp(15)}
                        />
                        <LogoSvg
                            width={wp(45)}
                            height={hp(5)}
                        />
                    </View>
                    <View style={styles.fieldsContainer}>
                        <View style={styles.textFieldContainer}>
                            <Text style={styles.label}>Enter Your Patient Number</Text>
                            <TextInput
                                onChangeText={(e) => this.setState({ patientNumber: e })}
                                style={styles.textInput}
                                value={this.state.patientNumber}
                            />
                        </View>
                        <View style={styles.textFieldContainer}>
                            <Text style={styles.label}>Enter Your Email Address</Text>
                            <TextInput
                                onChangeText={(e) => {
                                    this.setState({ email: e })
                                    if (emailRegex.test(e)) {
                                        this.setState({
                                            emailValid: true
                                        })
                                    } else {
                                        this.setState({
                                            emailValid: false
                                        })
                                    }
                                }}
                                style={styles.textInput}
                                value={this.state.email}
                            />
                        </View>
                        <View style={styles.errorMessageContainer}>
                            {this.props.error_message ? <Text style={styles.errorText}>{this.props.error_message}</Text> : null}
                        </View>
                        <View style={styles.textFieldContainer}>
                            <View style={styles.checkBoxContainer}>
                                <CheckBox
                                    // style={{paddingRight: 15}}
                                    onClick={() => this.setState({ checked: !this.state.checked })}
                                    isChecked={this.state.checked}
                                />
                                <Text style={styles.checkboxLabel}>I have read and agree to the <Text
                                    style={styles.termsText}
                                    onPress={() => {
                                        var _self = this;
                                        Keyboard.dismiss()

                                        setTimeout(() => {
                                            _self.setState({ openTerms: true })
                                        },200)
                          
               
                                    }}>Terms and Conditions</Text></Text>
                                {/* <TouchableOpacity></TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Buttons
                            disabled={this.state.checked && this.state.emailValid === true && this.state.patientNumber !== '' ? false : true}
                            title={'VERIFY'}
                            onButtonPress={() => { this.verifyEmail(); }}
                            variant={'primary'}
                        />
                    </View>
                    <View style={{ paddingTop: hp(4), textAlign: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                // Actions.login()
                                this.props.navigation.navigate('Login')
                            }}
                        >
                            <Text style={styles.link}>Already have an account? Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <TermsAndConditions
                        visibility={this.state.openTerms}
                        buttonPress={() => {
                            this.setState({
                                openTerms: false,
                                checked: true
                            })
                        }}
                    />
                    <Loader
                        visibility={this.props.loaderVisibility}
                        message={this.props.loaderMessage}
                    />
                    {this.props.successVisibility ?
                        <SuccessModal
                            visibility={this.props.successVisibility}
                            message={this.props.successMessage}
                            onTouched={() => {
                                this.props.hideModal();
                            }}
                        />
                        : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const mapStateToProps = (state) => ({
    error_message: state.registerReducer.error_message,
    success_message: state.registerReducer.success_message,
    register_payload: state.registerReducer.payload,
    loaderVisibility: state.loaderReducer.visibility,
    loaderMessage: state.loaderReducer.message,
    successVisibility: state.modalReducer.visibility,
    successMessage: state.modalReducer.message,
    successAction: state.modalReducer.action,
})

export default connect(mapStateToProps, {
    registerUser,
    registerClear,
    showLoader,
    hideLoader,
    hideModal,
    showModal,
    sendTask
})(Register)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
        //   marginTop: 100,-
    },
    errorMessageContainer: {
        marginTop: 0,
        marginBottom: 30
    },
    errorText: {
        fontFamily: 'SemiBold',
        fontSize: RFPercentage(1.4),
        color: '#e24242'
    },
    imageContainer: {
        // flex: ,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    fieldsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 40,
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textFieldContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    label: {
        fontSize: RFPercentage(2.35),
        fontFamily: 'Bold'
    },
    textInput: {
        //  height: hp(6),
        borderColor: '#e5e5e5',
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        width: wp('55'),
        //  marginTop: 5,
        fontSize: RFPercentage(2.2),
        fontFamily: 'Regular'
    },
    checkboxLabel: {
        fontSize: RFPercentage(1.75),
        fontFamily: 'Regular',
        marginLeft: 5,
    },
    termsText: {
        fontSize: RFPercentage(1.75),
        fontFamily: 'SemiBold',
        textDecorationLine: 'underline',
        color: '#60a73a',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    link: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular',
        color: '#0A0343',
        // textDecorationLine: 'underline',
        // textDecorationColor: '#0A0343'
    }
});

