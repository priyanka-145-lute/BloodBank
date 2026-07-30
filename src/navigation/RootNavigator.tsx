import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartupNavigator from './StartupNavigator';
import AuthNavigator from './AuthNavigator';
import ScreenNavigator from './ScreenNavigator';

import {useAuth} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {
    startupCompleted,
    isLoggedIn,
  } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      {!startupCompleted ? (
        <Stack.Screen
          name="StartupFlow"
          component={StartupNavigator}
        />
      ) : !isLoggedIn ? (
        <Stack.Screen
          name="AuthFlow"
          component={AuthNavigator}
        />
      ) : (
        <Stack.Screen
          name="AppFlow"
          component={ScreenNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;