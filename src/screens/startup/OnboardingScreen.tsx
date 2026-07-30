import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {StartupStackParamList} from '../../navigation/navigationTypes';

type OnboardingScreenProps = NativeStackScreenProps<
  StartupStackParamList,
  'Onboarding'
>;

type SlideItem = {
  id: string;
  title: string;
  highlight: string;
  description: string;
};

const slides: SlideItem[] = [
  {
    id: '1',
    title: 'Donate Blood, Save Lives',
    highlight: 'Your one donation can save up to 3 lives.',
    description:
      "Be a hero in someone's life. Join our community of voluntary blood donors and make a difference today.",
  },
  {
    id: '2',
    title: 'Find Blood Donors Instantly',
    highlight: "Emergency? We're here to help.",
    description:
      'Search nearby verified donors by blood group and location in just a few taps.',
  },
  {
    id: '3',
    title: 'Emergency Blood Requests',
    highlight: 'Quick access when you need it most.',
    description:
      'Discover trusted blood banks and hospitals near you with real-time availability updates.',
  },
];

const OnboardingScreen = ({
  navigation,
}: OnboardingScreenProps) => {
  const {width} = useWindowDimensions();

  const flatListRef = useRef<FlatList<SlideItem>>(null);
  const currentIndexRef = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  /*
   * Android device back-button handling.
   * This listener stays active only while the onboarding screen is focused.
   */
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = (): boolean => {
        Alert.alert(
          'Blood Sarthi',
          'Are you sure you want to exit?',
          [
            {
              text: 'NO',
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          },
        );

        // Prevent default back navigation.
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, []),
  );

  // Automatic text slider
  useEffect(() => {
    if (isDragging) {
      return;
    }

    const timer = setTimeout(() => {
      const nextIndex =
        currentIndexRef.current === slides.length - 1
          ? 0
          : currentIndexRef.current + 1;

      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, isDragging, width]);

  // Manual swipe complete
  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(offsetX / width);

    currentIndexRef.current = selectedIndex;
    setCurrentIndex(selectedIndex);
    setIsDragging(false);
  };

  // Dot press
  const handleDotPress = (index: number): void => {
    currentIndexRef.current = index;
    setCurrentIndex(index);

    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  // Get Started
  const handleGetStarted = (): void => {
    navigation.replace('Intro', {
      afterOnboarding: true,
    });
  };

  const renderSlide = ({
    item,
  }: ListRenderItemInfo<SlideItem>) => {
    return (
      <View style={[styles.slideItem, {width}]}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.highlightText}>
          {item.highlight}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <StatusBar
        backgroundColor="#D50000"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.bottomContainer}>
            {/* Only text will slide */}
            <View style={styles.sliderContainer}>
              <FlatList<SlideItem>
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScrollBeginDrag={() => setIsDragging(true)}
                onScrollEndDrag={() => setIsDragging(false)}
                onMomentumScrollEnd={handleScrollEnd}
                getItemLayout={(_, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
              />
            </View>

            {/* Fixed dots */}
            <View style={styles.dotsContainer}>
              {slides.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => handleDotPress(index)}
                  style={[
                    styles.dot,
                    currentIndex === index &&
                      styles.activeDot,
                  ]}
                />
              ))}
            </View>

            {/* Fixed button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleGetStarted}>
              <Text style={styles.buttonText}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },

  bottomContainer: {
    paddingBottom: 22,
    backgroundColor: 'transparent',
  },

  sliderContainer: {
    height: 135,
  },

  slideItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  title: {
    color: '#111111',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  highlightText: {
    marginTop: 8,
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'center',
    paddingHorizontal: 5,
  },

  description: {
    marginTop: 3,
    color: '#666666',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 5,
  },

  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 22,
  },

  dot: {
    width: 7,
    height: 7,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#C5CEE0',
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0054',
  },

  button: {
    height: 48,
    marginHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0054',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});

