import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/tab/HomeScreen';
import {TabParamList} from './navigationTypes';
import ActivityScreen from '../screens/tab/ActivityScreen';
import CampsScreen from '../screens/tab/CampsScreen';
import DonorsScreen from '../screens/tab/DonorsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#D50000',
        tabBarInactiveTintColor: '#777777',

        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: '#FFFFFF',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
        }}
      />

      <Tab.Screen
        name="Camps"
        component={CampsScreen}
        options={{
          tabBarLabel: 'Camps',
        }}
      />

      <Tab.Screen
        name="Donors"
        component={DonorsScreen}
        options={{
          tabBarLabel: 'Donors',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;