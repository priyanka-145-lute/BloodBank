import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';

import AppDrawer from '../components/AppDrawer';
import AboutScreen from '../screens/drawer/AboutScreen';
import ContactScreen from '../screens/drawer/ContactScreen';
import PrivacyPolicyScreen from '../screens/drawer/PrivacyPolicyScreen';
import ProfileScreen from '../screens/drawer/ProfileScreen';
import ScreenNavigator from './ScreenNavigator';

const Drawer = createDrawerNavigator();

const renderDrawerContent = (props: React.ComponentProps<typeof AppDrawer>) => (
  <AppDrawer {...props} />
);

const DrawerNavigator = () => {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: width * 0.68},
        overlayColor: 'rgba(0, 0, 0, 0.55)',
        swipeEdgeWidth: 60,
      }}>
      <Drawer.Screen name="MainFlow" component={ScreenNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
