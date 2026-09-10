import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PastCampsScreen from '../screens/camps/PastCampsScreen';
import UpcomingCampsScreen from '../screens/camps/UpcomingCampsScreen';
import CampsScreen from '../screens/tab/CampsScreen';
import {CampsStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<CampsStackParamList>();

const CampsNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="CampsMenu" component={CampsScreen} />
    <Stack.Screen name="PastCamps" component={PastCampsScreen} />
    <Stack.Screen name="UpcomingCamps" component={UpcomingCampsScreen} />
  </Stack.Navigator>
);

export default CampsNavigator;
