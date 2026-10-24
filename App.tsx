import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loaderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (loaderTimer.current) {
      clearTimeout(loaderTimer.current);
    }
  }, []);

  const showLoader = () => {
    if (loaderTimer.current) {
      clearTimeout(loaderTimer.current);
    }

    setIsLoading(true);
    loaderTimer.current = setTimeout(() => setIsLoading(false), 700);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer onStateChange={showLoader}>
            <RootNavigator />
          </NavigationContainer>
          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#FF4D7D" />
            </View>
          )}
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
  loader: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
});
