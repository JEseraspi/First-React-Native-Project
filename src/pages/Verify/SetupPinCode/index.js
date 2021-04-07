import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { Actions } from 'react-native-router-flux'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { registerPin, registerClear } from '../../../redux/actions/registration';
// import SvgUri from 'expo-svg-uri';
import { showLoader, hideLoader } from '../../../redux/actions/loader';
import { showModal, hideModal } from '../../../redux/actions/modal';
import { changeRoute } from '../../../redux/actions/route';
import Loader from '../../../components/Loader';
import SuccessModal from '../../../components/SuccessModal';
import LogoOnlySvg from '../../../SVG/logo-only'
import LogoSvg from '../../../SVG/logo'
import { saveLogoutDate } from '../../../helper/check_logout'

const screenWidth = Math.round(Dimensions.get('window').width);


class SetupPinCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pinCode: '',
            verifyPinCode: '',
            verifyPin: false,
            isPinVerified: false,
            patientNumber: '',
            updatedSomething: '',
        };
    }

    componentDidMount() {
        this.getPatientId()
        this.props.hideLoader()
        this.props.hideModal();
    }

    static getDerivedStateFromProps(props, state) {

        if (props.success_message === 'register pin success') {
            return {
                updatedSomething: SetupPinCode.handleSuccessVerifyPinCode(props, state)
            };
        }
        return null
    }

    getPatientId = async () => {
        let user_data = await AsyncStorage.getItem('user_data')
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

    handleVerifyPinCode = async (pin) => {
        this.props.showModal('PIN code saved!');
        this.props.registerClear();

        let user_data = await AsyncStorage.getItem('user_data')
        let _self = this;
        user_data = JSON.parse(user_data);
        user_data['pin_code'] = this.state.verifyPinCode;
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        saveLogoutDate();
        Keyboard.dismiss()

        // Actions.home({ type: 'reset' });
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: `Home` }]
        })
    }

    static handleSuccessVerifyPinCode = async (props, state) => {
        props.registerClear();
        props.showModal('PIN code saved!');

        let user_data = await AsyncStorage.getItem('user_data')
        user_data = JSON.parse(user_data);

        user_data['pin_code'] = state.verifyPinCode;

        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        saveLogoutDate();
        // Actions.home({ type: 'reset' });
        props.navigation.reset({
            index: 0,
            routes: [{ name: `Home` }]
        })
    }


    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Layout style={styles.container}>
                    <Layout style={styles.imageContainer}>
                        <LogoOnlySvg
                            width={wp(50)}
                            height={hp(15)}
                        />
                        <LogoSvg
                            width={wp(45)}
                            height={hp(5)}
                        />
                        {/* <Image 
                            style={{
                                width: wp(screenWidth < 480 ? 50 : 45),
                                height: hp(screenWidth < 480 ? 20 : 25)
                            }}
                            source={require('../../../../assets/logo.png')}
                        /> */}
                    </Layout>
                    <Layout style={styles.buttonContainer}>
                        <Text style={styles.patientNumber}>{this.state.patientNumber}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Change Patient Number</Text>
                        </TouchableOpacity>
                    </Layout>
                    {!this.state.verifyPin ? (
                        <>
                            <Layout style={styles.textContainer}>
                                <Text style={styles.h3}>Set a PIN code for your app.</Text>
                                <Text style={styles.p}>This code will be used every time you log in.</Text>
                            </Layout>
                            {this.state.isPinVerified ?
                                <Layout style={styles.errorMessageContainer}>
                                    <Text style={styles.errorText}>The PINS you entered did not match.</Text>
                                </Layout> : null}
                            <Layout style={styles.fieldContainer}>
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
                                    onFulfill={() => {
                                        this.setState({ verifyPin: true })
                                    }}
                                />
                            </Layout>
                        </>
                    ) : (
                            <>
                                <Layout style={styles.textContainer}>
                                    <Text style={styles.h3}>Please verify your PIN.</Text>
                                </Layout>
                                <Layout style={styles.fieldContainer}>
                                    <SmoothPinCodeInput
                                        password
                                        mask="﹡"
                                        cellSize={wp(7.5)}
                                        codeLength={4}
                                        value={this.state.verifyPinCode}
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
                                        onTextChange={value => this.setState({ verifyPinCode: value })}
                                        onFulfill={(e) => {
                                            console.log(this.state.pinCode, e)
                                            if (this.state.pinCode !== e) {
                                                this.setState({
                                                    pinCode: '',
                                                    verifyPinCode: '',
                                                    verifyPin: false,
                                                    isPinVerified: true,
                                                })
                                            } else {
                                                this.setState({
                                                    isPinVerified: false,
                                                })
                                                this.handleVerifyPinCode(e);
                                            }
                                        }}
                                    />
                                </Layout>
                            </>
                        )
                    }
                    <Loader
                        visibility={this.props.loaderVisibility}
                        message={this.props.loaderMessage}
                    />
                    <SuccessModal
                        visibility={this.props.successVisibility}
                        message={this.props.successMessage}
                        onTouched={() => {
                            this.props.hideModal();
                        }}
                    />
                </Layout>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => ({
    error_message: state.registerReducer.error_message,
    success_message: state.registerReducer.success_message,
    loaderVisibility: state.loaderReducer.visibility,
    loaderMessage: state.loaderReducer.message,
    successVisibility: state.modalReducer.visibility,
    successMessage: state.modalReducer.message,
    successAction: state.modalReducer.action,
})

export default connect(mapStateToProps, {
    registerPin,
    registerClear,
    showLoader,
    hideLoader,
    showModal,
    hideModal,
    changeRoute
})(SetupPinCode)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fieldContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: RFPercentage(4.75),
        marginBottom: RFPercentage(1.5)
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: RFPercentage(3.75),
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
    errorMessageContainer: {
        marginTop: 0,
        marginBottom: 20,
        alignItems: 'center'
    },
    errorText: {
        fontFamily: 'SemiBold',
        fontSize: RFPercentage(1.4),
        color: '#e24242'
    },
});