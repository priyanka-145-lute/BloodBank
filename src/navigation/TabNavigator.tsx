import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/tab/HomeScreen';
import {TabParamList} from './navigationTypes';
import ActivityScreen from '../screens/tab/ActivityScreen';
import CampsNavigator from './CampsNavigator';
import DonorsNavigator from './DonorsNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

const icons: Record<keyof TabParamList, string> = {
  Home: '⌂',
  Activity: '⌁',
  Camps: '▧',
  Donors: '♙',
};

const CustomTabBar = ({state, descriptors, navigation, insets}: BottomTabBarProps) => {
  const [campsPopupVisible, setCampsPopupVisible] = useState(false);

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
      if (route.name === 'Camps') {
        setCampsPopupVisible(currentValue => !currentValue);
        return;
      }

      setCampsPopupVisible(false);

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

  const openCampsScreen = (screenName: 'PastCamps' | 'UpcomingCamps') => {
    setCampsPopupVisible(false);
    navigation.navigate('Camps', {screen: screenName});
  };

  return (
    <>
      <Modal
        transparent
        statusBarTranslucent
        animationType="fade"
        visible={campsPopupVisible}
        onRequestClose={() => setCampsPopupVisible(false)}>
        <Pressable
          style={styles.popupBackdrop}
          onPress={() => setCampsPopupVisible(false)}>
          <Pressable
            style={[
              styles.campsPopup,
              {bottom: Math.max(insets.bottom, 4) + 55},
            ]}>
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => openCampsScreen('PastCamps')}>
              <Ionicons
                name="document-text-outline"
                size={17}
                color="#555555"
              />
              <Text style={styles.popupItemText}>Past</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => openCampsScreen('UpcomingCamps')}>
              <Ionicons name="people-outline" size={18} color="#555555" />
              <Text style={styles.popupItemText}>Upcoming</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <View style={[styles.tabBar, {paddingBottom: Math.max(insets.bottom, 4)}]}>
        {renderTab(0)}
        {renderTab(1)}
        <View style={styles.centerSlot}>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => {
              setCampsPopupVisible(false);
              navigation.navigate('Home');
            }}
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
    </>
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
    <Tab.Screen
      name="Camps"
      component={CampsNavigator}
      options={{tabBarLabel: 'Camps'}}
      listeners={{
        tabPress: event => event.preventDefault(),
      }}
    />
    <Tab.Screen name="Donors" component={DonorsNavigator} options={{tabBarLabel: 'Donors'}} />
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
  popupBackdrop: {flex: 1},
  campsPopup: {
    position: 'absolute',
    right: 28,
    width: 132,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },
  popupItem: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  popupItemText: {marginLeft: 9, color: '#444444', fontSize: 13},
});

export default TabNavigator;