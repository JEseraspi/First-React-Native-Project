import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import SvgUri from 'expo-svg-uri';
import Buttons from '../../components/Buttons';
import CustomSwiper from '../../components/Swiper'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import LogoSvg from '../../SVG/logo'
import LogoOnlySvg from '../../SVG/logo-only';
import { HomeSlide1Svg, HomeSlide2Svg } from '../../SVG/home_slides';

const screenWidth = Math.round(Dimensions.get('window').width);

const Welcome = (props) => {
   const [swiperIndex, setSwiperIndex] = React.useState(0)
   // const [loading, setLoading] = React.useState(true)

   // React.useEffect(() => {
   //    setTimeout(() => {
   //       setLoading(false)
   //    }, 750)
   // }, [])

   return (
      <View style={styles.container}>
         <View style={styles.swiperContainer}>
            <CustomSwiper
               setSwiperIndex={(index) => {
                  setSwiperIndex(index)
               }}
            // swiperIndex={this.state.swiperIndex}-
            >
               <View style={styles.slides}>
                  <LogoOnlySvg
                     width={wp(50)}
                     height={hp(15)}
                  />
                  <LogoSvg
                     width={wp(45)}
                     height={hp(5)}
                  />
               </View>
               <View style={styles.slides}>
                  <HomeSlide1Svg
                     width={wp('65%')}
                     height={hp('65%')}
                     style={{ marginBottom: 30 }}
                  />
               </View>
               <View style={styles.slides}>
                  <HomeSlide2Svg
                     width={wp('65%')}
                     height={hp('65%')}
                     style={{ marginBottom: 30 }}
                  />
               </View>
            </CustomSwiper>
         </View>
         <View style={styles.descriptionContainer}>
            <Text style={styles.headingText}>Welcome to InSynergy  </Text>
            {
               swiperIndex === 2 ? (
                  <>
                     <Text style={styles.description} numberOfLines={1}>Complete all the badges and advance through</Text>
                     <Text style={styles.description} numberOfLines={1}>each level to get rewards.</Text>
                  </>
               ) : swiperIndex === 1 ? (
                  <>
                     <Text style={styles.description} numberOfLines={1}>Maintain your Streak to unlock badges.</Text>
                  </>
               ) : (
                        <>
                           <Text style={styles.description} numberOfLines={1}>Turn your phone into an online journal</Text>
                           <Text style={styles.description} numberOfLines={1}>and reach out to a doctor 24/7,</Text>
                           <Text style={styles.description} numberOfLines={1}>wherever you may be.</Text>
                        </>
                     )
            }
         </View>
         <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
               <Buttons
                  title={'REGISTER'}
                  onButtonPress={() => props.navigation.navigate('Register')}
                  variant={'primary'}
                  disabled={false}
               // height={35}
               />
            </View>
            <View style={styles.buttons}>
               <Buttons
                  title={'LOGIN'}
                  onButtonPress={() => props.navigation.navigate('Login')}
                  variant={'primary'}
                  disabled={false}
               // height={35}
               />
            </View>
         </View>
      </View>
   )
}


export default Welcome



const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 25,
   },
   swiperContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'flex-end',
   },
   descriptionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 40,
   },
   headingText: {
      fontFamily: 'Bold',
      fontSize: RFPercentage(2.75),
      margin: 10,
   },
   description: {
      fontSize: RFPercentage(2),
      lineHeight: RFPercentage(3),
      fontFamily: 'Regular',
   },
   buttons: {
      margin: hp(2)
   },
   buttonContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
   swiperWrapper: {},
   slides: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});