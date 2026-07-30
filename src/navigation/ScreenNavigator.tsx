import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

import NotificationScreen from '../screens/details/NotificationScreen';
// import DonorDetailsScreen from '../screens/details/DonorDetailsScreen';
// import EditProfileScreen from '../screens/details/EditProfileScreen';

import {AppStackParamList} from './navigationTypes';

const Stack =
  createNativeStackNavigator<AppStackParamList>();

const ScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        animation: 'slide_from_right',
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: '#D50000',
        },
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BloodBankDetails"
        component={NotificationScreen}
        options={{
          title: 'Blood Bank Details',
        }}
      />

      {/* <Stack.Screen
        name="DonorDetails"
        component={DonorDetailsScreen}
        options={{
          title: 'Donor Details',
        }}
      /> */}

      {/* <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ScreenNavigator;