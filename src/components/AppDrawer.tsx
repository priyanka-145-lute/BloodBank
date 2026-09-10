import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../context/AuthContext';

const RED = '#F0003C';

const drawerItems = [
  {id: 'profile', label: 'Profile', icon: 'person-outline', route: 'Profile'},
  {id: 'about', label: 'About', icon: 'information-circle-outline', route: 'About'},
  {id: 'privacy', label: 'Privacy Policy', icon: 'shield-checkmark-outline', route: 'PrivacyPolicy'},
  {id: 'contact', label: 'Contact', icon: 'mail-outline', route: 'Contact'},
  {id: 'logout', label: 'Logout', icon: 'power-outline', route: null},
];

const AppDrawer = (props: DrawerContentComponentProps) => {
  const {signOut} = useAuth();

  const handleItemPress = (item: (typeof drawerItems)[number]) => {
    if (item.id === 'logout') {
      props.navigation.closeDrawer();
      signOut();
      return;
    }

    if (item.route) {
      props.navigation.navigate(item.route);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>👩</Text>
        </View>

        <View>
          <Text style={styles.drawerUserName}>Priyanka</Text>
          <Text style={styles.drawerUserPhone}>BS-91106786</Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerBody}>
        <View style={styles.drawerDropDecoration} />

        {drawerItems.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={styles.drawerItem}
            onPress={() => handleItemPress(item)}>

            <View style={styles.drawerItemIconCircle}>
              <Ionicons
                name={item.icon}
                size={15}
                color={RED}
              />
            </View>

            <Text style={styles.drawerItemLabel}>
              {item.label}
            </Text>

            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color="#999999"
            />
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
        <Text style={styles.drawerBrand}>Blood Saarthi</Text>
        <Text style={styles.drawerTagline}>Save Lives Faster</Text>
      </View>
    </View>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F7',
  },

  drawerHeader: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    backgroundColor: '#EC0038',
  },

  avatarCircle: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFE6D8',
  },

  avatarText: {
    fontSize: 25,
  },

  drawerUserName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  drawerUserPhone: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 10,
  },

  drawerBody: {
    flexGrow: 1,
    paddingTop: 7,
    overflow: 'hidden',
  },

  drawerDropDecoration: {
    position: 'absolute',
    top: 150,
    left: 40,
    width: 135,
    height: 190,
    borderTopLeftRadius: 72,
    borderTopRightRadius: 72,
    borderBottomRightRadius: 72,
    borderBottomLeftRadius: 12,
    backgroundColor: '#FFE7E7',
    opacity: 0.45,
    transform: [{rotate: '45deg'}],
  },

  drawerItem: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  drawerItemIconCircle: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
  },

  drawerItemLabel: {
    flex: 1,
    color: '#222222',
    fontSize: 12,
  },

  drawerFooter: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F2C8CE',
    backgroundColor: '#FFF1F2',
  },

  drawerBrand: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
  },

  drawerTagline: {
    marginTop: 2,
    color: '#8A8A8A',
    fontSize: 10,
  },
});