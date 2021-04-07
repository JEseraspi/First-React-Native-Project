import React, { Component } from 'react';
import Routes from './Routes.js'
import { useFonts } from '@use-expo/font';

const InsynergyApp = (props) => {

   let [fontsLoaded] = useFonts({
      'AvenirRegular': require('../assets/fonts/AvenirLTStd-Roman.otf'),
      'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
   });


   if (!fontsLoaded) {
      return null
   } else {
      return (
         <>
            <Routes />
         </>
      )
   }

}

export default InsynergyApp



