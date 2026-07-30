import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/startup/SplashScreen';
import IntroScreen from '../screens/startup/IntroScreen';
import OnboardingScreen from '../screens/startup/OnboardingScreen';

import {StartupStackParamList} from './navigationTypes';
import {useAuth} from '../context/AuthContext';

const Stack =
  createNativeStackNavigator<StartupStackParamList>();

const StartupNavigator = () => {
  const {startupInitialRoute} = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={startupInitialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Intro"
        component={IntroScreen}
      />

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default StartupNavigator;
