import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/tab/HomeScreen';
import {TabParamList} from './navigationTypes';
import ActivityScreen from '../screens/tab/ActivityScreen';
import CampsScreen from '../screens/tab/CampsScreen';
import DonorsScreen from '../screens/tab/DonorsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const icons: Record<keyof TabParamList, string> = {
  Home: '⌂',
  Activity: '⌁',
  Camps: '▧',
  Donors: '♙',
};

const CustomTabBar = ({state, descriptors, navigation, insets}: BottomTabBarProps) => {
  const renderTab = (routeIndex: number) => {
    const route = state.routes[routeIndex];
    const options = descriptors[route.key].options;
    const focused = state.index === routeIndex;
    const label =
      typeof options.tabBarLabel === 'string'
        ? options.tabBarLabel
        : typeof options.title === 'string'
          ? options.title
          : route.name;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityState={focused ? {selected: true} : {}}
        onPress={onPress}
        style={styles.tabItem}>
        <Text style={[styles.tabIcon, focused && styles.activeTabIcon]}>
          {icons[route.name as keyof TabParamList]}
        </Text>
        <Text style={[styles.tabLabel, focused && styles.activeTabLabel]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.tabBar, {paddingBottom: Math.max(insets.bottom, 4)}]}>
      {renderTab(0)}
      {renderTab(1)}
      <View style={styles.centerSlot}>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('Home')}
          style={styles.centerButton}>
          <Image
            source={require('../assets/favicon.png')}
            resizeMode="contain"
            style={styles.centerIcon}
          />
        </TouchableOpacity>
      </View>
      {renderTab(2)}
      {renderTab(3)}
    </View>
  );
};

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBar={renderTabBar}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Home'}} />
    <Tab.Screen name="Activity" component={ActivityScreen} options={{tabBarLabel: 'Activity'}} />
    <Tab.Screen name="Camps" component={CampsScreen} options={{tabBarLabel: 'Camps'}} />
    <Tab.Screen name="Donors" component={DonorsScreen} options={{tabBarLabel: 'Donors'}} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DADADA',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  tabIcon: {color: '#777777', fontSize: 26, lineHeight: 27},
  activeTabIcon: {color: '#F0004B'},
  tabLabel: {marginTop: 2, color: '#777777', fontSize: 10},
  activeTabLabel: {color: '#F0004B'},
  centerSlot: {width: 65, alignItems: 'center'},
  centerButton: {
    position: 'absolute',
    top: -33,
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    
  
  },
  centerIcon: {width: 65, height: 66},
});

export default TabNavigator;


