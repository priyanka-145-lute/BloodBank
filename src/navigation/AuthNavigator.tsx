import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

 import LoginScreen from '../screens/authScreen/LoginScreen';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import {AuthStackParamList} from './navigationTypes';
import OtpVerificationScreen from '../screens/authScreen/OtpVerificationScreen';

const Stack =
  createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
       <Stack.Screen
        name="Login"
        component={LoginScreen}
      /> 
      
       <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
      /> 

      {/* <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;