import React from 'react'
import { Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Buttons from '../../../components/Buttons';
import { registerNickName, clearNickname } from '../../../redux/actions/nickname';
import HeyPersonSvG from '../../../SVG/hey_person'
import { registerPassword, registerClear } from '../../../redux/actions/registration';
import Loader from '../../../components/Loader';
import { showLoader, hideLoader } from '../../../redux/actions/loader';
import { config, refreshKey, setAccessToken } from '../../../helper/token'
import SecureStorage from 'react-native-secure-storage'
import { sendTask } from '../../../redux/actions/task'

class EnterNickname extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         nickName: '',
         updatedSomething: '',
         password: '',
      };
   }

   componentDidMount = async () => {
      // const something = EnterNickname.handleSuccessNickName(this.props, this.state);
      // this.setState({ updatedSomething: something });
      //  await AsyncStorage.setItem('user_data', 'wew');
   }


   static getDerivedStateFromProps(props, state) {
      if (props.success_message === 'register pin success') {
         return {
            updatedSomething: EnterNickname.handleSuccessNickName(props, state)
         };
      }

      console.log(props.error_message, 'wew')
      
      return null;
   }

   handleSubmitNickName = async () => {
      this.props.showLoader('Loading');
      
      let user_data = await AsyncStorage.getItem('user_data');
      user_data = JSON.parse(user_data)

      let payload = {
         email: user_data.email,
         patient_id: user_data.patient_id,
         nickname: this.state.nickName,
         password: this.state.password,
      }
      Keyboard.dismiss()
      this.props.registerPassword(payload, user_data._id)
   }

   static handleSuccessNickName = async (props, state) => {
      console.log(props.userdata, 'success nickname')
      props.registerClear();

      let user_data = await AsyncStorage.getItem('user_data');
      user_data = JSON.parse(user_data)
      user_data['nickname'] = state.nickName;
      user_data['password'] = state.password;

      setAccessToken(props.userdata.tokens.access_token, user_data._id)
      this.saveRefreshToken(props.userdata.tokens.refresh_token)

      await AsyncStorage.setItem('user_data', JSON.stringify(user_data));  

      // props.sendTask({
      //    type: 'setup_nickname'
      // })

      props.navigation.navigate('SetupPinCode')
   }


   static saveRefreshToken = async (token)  => {
      await SecureStorage.setItem(refreshKey, token, config)
      // const got = await SecureStorage.getItem(refreshKey, config)
  }

   render() {
      return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Layout style={styles.container}>
               <Layout style={styles.imageContainer}>
                  <HeyPersonSvG
                     width={wp(100)}
                     height={hp(40)}
                  />
               </Layout>
               <Layout style={styles.fieldContainer}>
                  <Text style={styles.textLabel}>Enter your nickname</Text>
                  <TextInput
                     onChangeText={(e) => this.setState({ nickName: e })}
                     style={styles.textInput}
                     value={this.state.nickName}
                  />
               </Layout>
               <Layout style={styles.fieldContainer}>
                  <Text style={styles.textLabel}>Enter your password</Text>
                  <TextInput
                     secureTextEntry={true}
                     onChangeText={(e) => this.setState({ password: e })}
                     style={styles.textInput}
                     value={this.state.password}
                  />
               </Layout>
               <Layout style={styles.errorMessageContainer}>
                  {this.props.error_message ? <Text style={styles.errorText}>{this.props.error_message}</Text> : null}
               </Layout>
               <Layout style={styles.buttonContainer}>
                  <Buttons
                     disabled={this.state.nickName !== '' ? false : true}
                     title={'NEXT'}
                     onButtonPress={() => this.handleSubmitNickName()}
                     variant={'primary'}
                  />
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
   userdata: state.registerReducer.userdata,
   error_message: state.registerReducer.error_message,
   success_message: state.registerReducer.success_message,
   loaderVisibility: state.loaderReducer.visibility,
   loaderMessage: state.loaderReducer.message,
})

export default connect(mapStateToProps, {
   registerNickName,
   registerClear,
   clearNickname,
   registerPassword,
   showLoader,
   sendTask
})(EnterNickname)



const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff'
   },
   imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(-5)
   },
   fieldContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RFPercentage(1),
      marginBottom: RFPercentage(1),
   },
   buttonContainer: {
      alignItems: 'center',
   },
   textInput: {
      borderColor: '#e5e5e5',
      backgroundColor: '#e5e5e5',
      borderRadius: 5,
      borderWidth: 1,
      paddingLeft: 10,
      paddingRight: 10,
      width: wp(45),
      marginTop: RFPercentage(0.5),
      fontSize: RFPercentage(1.8),
      fontFamily: 'Regular'
   },
   textLabel: {
      fontSize: RFPercentage(2.8),
      fontFamily: 'Bold',
      color: '#252262'
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