import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from '../../context/AuthContext';
import {StartupStackParamList} from '../../navigation/navigationTypes';

type IntroScreenProps = NativeStackScreenProps<
  StartupStackParamList,
  'Intro'
>;
const title = 'DONATE BLOOD';

const IntroScreen = ({
  navigation,
  route,
}: IntroScreenProps) => {
  const {completeStartup} = useAuth();
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const letterAnimations = useRef(
    title.split('').map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const logoAnimation = Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const textAnimation = Animated.stagger(
      80,
      letterAnimations.map(animation =>
        Animated.spring(animation, {
          toValue: 1,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
      ),
    );

   Animated.sequence([
  logoAnimation,
  Animated.delay(200),
  textAnimation,
  Animated.delay(1200),
]).start(() => {
  if (route.params?.afterOnboarding) {
    completeStartup();
  } else {
    navigation.replace('Onboarding');
  }
});
  }, [
    completeStartup,
    letterAnimations,
    logoOpacity,
    logoScale,
    navigation,
    route.params?.afterOnboarding,
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#D50000"
        barStyle="light-content"
      />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{scale: logoScale}],
            },
          ]}>
          <Image
            source={require('../../assets/favicon2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.titleContainer}>
          {title.split('').map((letter, index) => {
            const translateY = letterAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [35, 0],
            });

            const scale = letterAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            });

            return (
              <Animated.View
                key={`${letter}-${index}`}
                style={{
                  opacity: letterAnimations[index],
                  transform: [{translateY}, {scale}],
                }}>
                <Text style={styles.title}>
                  {letter === ' ' ? '\u00A0' : letter}
                </Text>
              </Animated.View>
            );
          })}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 130,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
  },
});

