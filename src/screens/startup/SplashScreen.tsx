import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StartupStackParamList} from '../../navigation/navigationTypes';

type Props = NativeStackScreenProps<
  StartupStackParamList,
  'Splash'
>;

const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Intro');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
   

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ActivityIndicator size="large"  color="red" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
});

