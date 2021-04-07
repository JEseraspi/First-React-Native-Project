import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Buttons from '../../components/Buttons';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Modal } from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       backgroundColor: '#d3d3e0'
    },
    wrapper: {
      backgroundColor: '#f2f2f2',
      paddingLeft: 15, 
      paddingRight: 15,
      paddingBottom: 25,
      paddingTop: 25,
   },
   header: {
      fontSize: RFPercentage(2.5),
      fontFamily: 'Bold',
      textAlign: 'center',
      marginBottom: 10,
   },
   regularText: {
      fontSize: RFPercentage(1.8),
      fontFamily: 'Regular',
      marginTop: 10,
      marginBottom: 10,
   },
   header2: {
      fontFamily: 'Bold',
      fontSize: RFPercentage(2.25),
      marginTop: 10,
   },
   buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
   },
   modalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
   },
 });
 
const TermsAndConditions = (props) => {

   const goToRegister = () => {
      props.buttonPress();
   }

   return (
      <Modal 
         visible={props.visibility} 
         style={styles.modalContainer}
      >
         <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 25 }}>
               <View style={styles.wrapper}>
                  <Text style={styles.header}>Terms & Conditions</Text>
                  <Text style={styles.header2}>Introduction</Text>
                  <Text style={styles.regularText}>These InSynergy Terms and Conditions written on this app shall manage your use of our app, InSynergy downloadable via PlayStore and App Store.</Text>
                  <Text style={styles.regularText}>These Terms will be applied fully and affect to your use of this app. By using this app, you agreed to accept all terms and conditions written in here. 
                  You must not use this app if you disagree with any of these Website Standard Terms and Conditions.</Text>  
                  <Text style={styles.regularText}>Only patients of InSynergy clinic are allowed to use this app. </Text>
                  <Text style={styles.regularText}>InSynergy respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application (the “Application”).
                  Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.</Text> 
                  <Text style={styles.regularText}>We reserve the right to make change-s to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy.
                  You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.</Text>
                  <Text style={styles.regularText}>This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.</Text>
                  <Text style={styles.header2}>COLLECTION OF YOUR INFORMATION</Text>
                  <Text style={styles.regularText}>We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes:</Text>
                  <Text style={styles.header2}>Personal Data</Text>
                  <Text style={styles.regularText}>Demographic and other personally identifiable information (such as your patient number, name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as writing journals and using the online consultation feature.</Text> 
                  <Text style={styles.header2}>Derivative Data</Text>
                  <Text style={styles.regularText}>Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including responding to the journal and online consultation, as well as other interactions with the Application and other users via server log files.</Text>
                  <View style={styles.buttonContainer}>
                     <Buttons 
                        title={'OKAY'}
                        onButtonPress={() => goToRegister()}
                        variant={'primary'}
                     />
                  </View>
               </View>
            </ScrollView>
         </View>
      </Modal>
   )
}

export default TermsAndConditions

