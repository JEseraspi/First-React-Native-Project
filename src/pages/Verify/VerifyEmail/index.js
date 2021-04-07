import React from 'react'
import { Text, StyleSheet, TouchableOpacity, AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
// import SvgUri from 'expo-svg-uri';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { verifyOTP, resendOTP, clearVerify } from '../../../redux/actions/verify';
import PaperPlaneSvG from '../../../SVG/paper_plane'
import { setAccessToken } from '../../../helper/token'
// import { showLoader, hideLoader } from '../../../redux/actions/loader';
import { sendTask } from '../../../redux/actions/task'
import { showLoader, hideLoader } from '../../../redux/actions/loader';
import { showModal, hideModal } from '../../../redux/actions/modal';
import Toast from 'react-native-easy-toast'


// const callSuccessResend = () => {
//    var x = new VerifyEmail();

//    x.handleSuccessResend();
// }

class VerifyEmail extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         password: '',
         updatedSomething: '',
      };
   }

   componentDidMount() {
      this.props.hideLoader();
      this.props.hideModal();
      // const something = VerifyEmail.handleSuccessVerifyOTP(this.props, this.state);
      // this.setState({ updatedSomething: something });
   }


   static getDerivedStateFromProps(props, state) {
      if (props.verify_success_message === 'verify success') {
         return {
            updatedSomething: VerifyEmail.handleSuccessVerifyOTP(props, state)
         };
      } else if (props.resend_success_message === 'resend verify success') {
         props.clearVerify();
      }

      return null
   }

   static handleSuccessVerifyOTP = async (props, state) => {
      let user_data = await AsyncStorage.getItem('user_data');
      user_data = JSON.parse(user_data)
      user_data['otp'] = state.password;
      user_data['access_token'] = props.verify_data.setupToken
      await AsyncStorage.setItem('user_data', JSON.stringify(user_data));
      setAccessToken(props.verify_data.setupToken)

      props.clearVerify()
      // Actions.enter_nickname()
      props.navigation.navigate('EnterNickName')
   }

   handleSuccessResend = () => {

   }

   handleVerifyOTP = async (otp) => {
      this.props.showLoader();
      let user_data = await AsyncStorage.getItem('user_data');
      user_data = JSON.parse(user_data)

      let payload = {
         otp: otp,
         // patient_id: user_data.patient_id
      }

      Keyboard.dismiss()

      this.props.verifyOTP(payload, user_data._id)
   }

   handleResendVerification = async () => {
      this.props.showLoader();
      let user_data = await AsyncStorage.getItem('user_data');
      user_data = JSON.parse(user_data)

      let payload = {
         email: user_data.email,
         // patient_id: user_data.patient_id
      }


      this.props.resendOTP(payload, user_data._id)
   }


   componentDidUpdate = () => {

      if (this.props.resend_success_message === 'resend verify success') {
         this.props.clearVerify();
         this.refs.toast.show('Verification code \n resent to your \n registered  email address', 500);
      }

      console.log('update')
   }

   render() {
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Layout style={styles.container}>
               <Layout style={styles.imageContainer}>
                  <PaperPlaneSvG
                     width={wp(85)}
                     height={hp(30)}
                  />
               </Layout>
               <Layout style={styles.headContainer}>
                  <Text numberOfLines={1} style={styles.h3}>A verification code</Text>
                  <Text numberOfLines={1} style={styles.h3}>was sent to your</Text>
                  <Text numberOfLines={1} style={styles.h3}>registered email address.</Text>
                  <Text numberOfLines={1} style={styles.p}>Please enter code below.</Text>
               </Layout>
               <Layout style={styles.fieldContainer}>
                  <SmoothPinCodeInput
                     password
                     mask="﹡"
                     cellSize={wp(7.5)}
                     codeLength={6}
                     value={this.state.password}
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
                     onTextChange={value => this.setState({ password: value })}
                     onFulfill={(e) => {
                        this.handleVerifyOTP(e);
                     }} />
               </Layout>
               {this.props.verify_error_message ?
                  <Layout style={styles.errorMessageContainer}>
                     <Text style={styles.errorText}>{this.props.verify_error_message}</Text>
                  </Layout>
                  : null}
               {this.props.resend_error_message ?
                  <Layout style={styles.errorMessageContainer}>
                     <Text style={styles.errorText}>{this.props.resend_error_message}</Text>
                  </Layout>
                  : null}
               <Layout style={styles.buttonsContainer}>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => {
                        this.props.clearVerify();
                        // Actions.register()
                        this.props.navigation.navigate('Register')
                     }}>
                     <Text style={styles.buttonText}>Change Patient Number</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => {
                        this.handleResendVerification()
                     }}>
                     <Text style={styles.buttonText}>Resend Verification Code</Text>
                  </TouchableOpacity>
               </Layout>
               <Toast
                  ref="toast"
                  style={{ backgroundColor: '#0A0343' }}
                  position='center'
                  positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{ color: '#fff', padding: hp(0.5), width: wp(55), textAlign: 'center', fontSize: RFPercentage(2.5) }}
               />
            </Layout>
         </TouchableWithoutFeedback>
      )
   }
}

const mapStateToProps = (state) => ({
   verify_error_message: state.verifyReducer.verify_error_message,
   verify_success_message: state.verifyReducer.verify_success_message,
   resend_error_message: state.verifyReducer.resend_error_message,
   resend_success_message: state.verifyReducer.resend_success_message,
   verify_data: state.verifyReducer.verify_data,
})

export default connect(mapStateToProps, {
   verifyOTP,
   resendOTP,
   clearVerify,
   sendTask,
   hideLoader,
   showLoader,
   hideModal
})(VerifyEmail)

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
   headContainer: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   h3: {
      fontFamily: 'Regular',
      fontSize: RFPercentage(2.2),
      lineHeight: RFPercentage(3),
      color: '#252262',
      top: RFPercentage(-15)
   },
   p: {
      fontFamily: 'Regular',
      fontSize: RFPercentage(1.6),
      color: '#252262',
      top: RFPercentage(-13.5)
   },
   errorMessageContainer: {
      marginTop: 0,
      marginBottom: 10,
      top: RFPercentage(-10),
      alignItems: 'center',
      justifyContent: 'center',
   },
   errorText: {
      fontFamily: 'SemiBold',
      fontSize: RFPercentage(1.4),
      color: '#e24242'
   },
   fieldContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      top: RFPercentage(-11.5),
      backgroundColor: 'transparent'
   },
   buttonsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      top: RFPercentage(-10),
   },
   button: {
      paddingTop: 2.5,
      paddingBottom: 2.5,
      margin: 15,
      fontFamily: 'SemiBold',
      borderBottomWidth: 1,
      borderColor: '#60a73a',
      zIndex: 2,
   },
   buttonText: {
      color: '#60a73a',
      fontSize: RFPercentage(1.7),
   },
});
