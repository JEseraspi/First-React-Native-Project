import React from 'react'
// import { Router, Scene, Stack, ActionConst, Modal } from 'react-native-router-flux'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home';
import VerifyEmail from './pages/Verify/VerifyEmail';
import EnterNickName from './pages/Verify/EnterNickName';
import SetupPinCode from './pages/Verify/SetupPinCode';
import AsyncStorage from '@react-native-community/async-storage';
import Resources from './pages/Resources';
import Journal from './pages/Journal';
import Test from './pages/Test';
import Profile from './pages/Profile';
// import { showModal, hideModal } from './redux/actions/modal'
// import { PropsService } from '@ui-kitten/components/devsupport';
// import { connect } from 'react-redux';
// import MiniModal from './components/MiniModal';
// import { Text } from 'react-native';
import TimeoutModal from './pages/Timeout';
// import Landing from './pages/Landing';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './helper/navigate_service';

const Stack = createStackNavigator();

const Routes = (props) => {

   const [initialRoute, setInitialRoute] = React.useState('');

   React.useEffect(() => {
      console.log('route')
      if (!initialRoute) {
         handleInitialRoute();
      }
   }, [])

   React.useEffect(() => {
      console.log('routes change')
   })

   const handleInitialRoute = async () => {
      let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
      if (user_data) {
         if (user_data.pin_code) {
            setInitialRoute('Login')
         } else {
            setInitialRoute('Welcome')
         }
      } else {
         setInitialRoute('Welcome')
      }
   }

   return (
      <>
         {/* <Router headerMode="none" hideNavBar>
            <Stack key="root">
               <Scene key="landing" component={Landing} initial={true} />
               <Scene key="welcome" component={Welcome} />
               <Scene key="login" component={Login} />
               <Scene key="register" component={Register} />
               <Scene key="verify_email" component={VerifyEmail} />
               <Scene key="enter_nickname" component={EnterNickName} />
               <Scene key="setup_pincode" component={SetupPinCode} />
               <Scene key="resources" component={Resources} type={'reset'} />
               <Scene key="journal" component={Journal} type={'reset'} />
               <Scene key="test" component={Test} type={'reset'} />
               <Scene key="profile" component={Profile} type={'reset'} />
               <Scene key="home" component={Home} type={'reset'} />
               <Scene key="timeout" component={TimeoutModal} type={'reset'} /> 
            </Stack>
         </Router> */}
         {
            initialRoute ? (
               <NavigationContainer ref={navigationRef}>
                  <Stack.Navigator
                     initialRouteName={initialRoute}
                     screenOptions={{
                        animationEnabled: false,
                        headerShown: false
                     }}
                  >
                     <Stack.Screen name="Welcome" component={Welcome} />
                     <Stack.Screen name="Login" component={Login} />
                     <Stack.Screen name="Register" component={Register} />
                     <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
                     <Stack.Screen name="EnterNickName" component={EnterNickName} />
                     <Stack.Screen name="SetupPinCode" component={SetupPinCode} />
                     <Stack.Screen name="Resources" component={Resources} />
                     <Stack.Screen name="Journal" component={Journal} />
                     <Stack.Screen name="Test" component={Test} />
                     <Stack.Screen name="Profile" component={Profile} />
                     <Stack.Screen name="Home" component={Home} />
                     <Stack.Screen name="TimeoutModal" component={TimeoutModal} />
                  </Stack.Navigator>
               </NavigationContainer>
            ) : null
         }
      </>
   )
}

export default Routes
