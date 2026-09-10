import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DonorDirectoryScreen from '../screens/donors/DonorDirectoryScreen';
import DonorsScreen from '../screens/tab/DonorsScreen';
import {DonorsStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<DonorsStackParamList>();

const DonorsNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="DonorsMenu" component={DonorsScreen} />
    <Stack.Screen name="BloodDonors" component={DonorDirectoryScreen} />
    <Stack.Screen name="BloodRecipients" component={DonorDirectoryScreen} />
  </Stack.Navigator>
);

export default DonorsNavigator;
