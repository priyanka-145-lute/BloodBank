import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from '../../context/AuthContext';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    mobileNumber: string;
  };
};

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {returnToOnboarding} = useAuth();

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [warningVisible, setWarningVisible] =
    useState<boolean>(false);

  const [warningMessage, setWarningMessage] =
    useState<string>('');

  const [successVisible, setSuccessVisible] =
    useState<boolean>(false);

  const warningTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const otpTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    return () => {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }

      if (otpTimerRef.current) {
        clearTimeout(otpTimerRef.current);
      }
    };
  }, []);

  /*
   * On Login screen, the device back button
   * redirects to the Onboarding screen.
   */
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = (): boolean => {
        if (successVisible) {
          setSuccessVisible(false);
          return true;
        }

        Keyboard.dismiss();
        returnToOnboarding();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => subscription.remove();
    }, [returnToOnboarding, successVisible]),
  );

  const showWarning = (message: string): void => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }

    setWarningMessage(message);
    setWarningVisible(true);

    warningTimerRef.current = setTimeout(() => {
      setWarningVisible(false);
    }, 3000);
  };

  const hideWarning = (): void => {
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }

    setWarningVisible(false);
  };

  const handleMobileNumberChange = (value: string): void => {
    const numericValue = value.replace(/[^0-9]/g, '');

    setMobileNumber(numericValue);

    if (warningVisible) {
      hideWarning();
    }
  };

  const handleContinue = (): void => {
    if (isLoading) {
      return;
    }

    if (mobileNumber.trim().length === 0) {
      showWarning('Please enter mobile number');
      return;
    }

    if (mobileNumber.length !== 10) {
      showWarning(
        'Please enter a valid 10-digit mobile number',
      );
      return;
    }

    Keyboard.dismiss();
    hideWarning();
    setIsLoading(true);

    /*
     * Replace this setTimeout with your Send OTP API.
     *
     * Show the success popup only after the API
     * returns a successful response.
     */
    otpTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setSuccessVisible(true);
    }, 1000);
  };

  const handleSuccessOk = (): void => {
    setSuccessVisible(false);

    navigation.navigate('OtpVerification', {
      mobileNumber,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#D50000"
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={styles.headerShape} />

              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Warning popup */}
            {warningVisible && (
              <View style={styles.warningPopup}>
                <View style={styles.warningIcon}>
                  <Text style={styles.warningIconText}>
                    !
                  </Text>
                </View>

                <View style={styles.warningContent}>
                  <Text style={styles.warningTitle}>
                    Warning!
                  </Text>

                  <Text style={styles.warningMessage}>
                    {warningMessage}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  activeOpacity={0.7}
                  onPress={hideWarning}>
                  <Text style={styles.closeButtonText}>
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Login form */}
            <View style={styles.contentContainer}>
              <Text style={styles.heading}>
                Login to Continue
              </Text>

              <Text style={styles.subHeading}>
                Please Enter Your Mobile Number To Continue
              </Text>

              <Text style={styles.inputLabel}>
                Mobile Number
              </Text>

              <TextInput
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter 10 digit mobile number"
                placeholderTextColor="#9A9A9A"
                keyboardType="number-pad"
                maxLength={10}
                editable={!isLoading}
                returnKeyType="done"
                onSubmitEditing={handleContinue}
                style={[
                  styles.input,
                  isFocused && styles.focusedInput,
                  warningVisible && styles.errorInput,
                ]}
              />

              <TouchableOpacity
                style={[
                  styles.continueButton,
                  isLoading && styles.disabledButton,
                ]}
                activeOpacity={0.85}
                disabled={isLoading}
                onPress={handleContinue}>
                <Text style={styles.continueButtonText}>
                  {isLoading ? 'PLEASE WAIT.....' : 'CONTINUE'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                By clicking continue you proceed to the OTP
                verification
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Success popup */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setSuccessVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIconOuter}>
              <Text style={styles.successCheck}>✓</Text>
            </View>

            <Text style={styles.successTitle}>
              Success
            </Text>

            <Text style={styles.successMessage}>
              OTP Sent Successfully
            </Text>

            <TouchableOpacity
              style={styles.okButton}
              activeOpacity={0.8}
              onPress={handleSuccessOk}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  headerContainer: {
    height: 190,
    alignItems: 'center',
    overflow: 'hidden',
  },

  headerShape: {
    position: 'absolute',
    top: 0,
    width: '115%',
    height: 185,
    backgroundColor: '#FFF7F7',
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },

  logo: {
    width: 105,
    height: 105,
    marginTop: 28,
  },

  warningPopup: {
    position: 'absolute',
    top: 135,
    left: 28,
    right: 20,
    minHeight: 65,
    zIndex: 100,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },

  warningIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC0841',
  },

  warningIconText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 22,
  },

  warningContent: {
    flex: 1,
    marginLeft: 13,
  },

  warningTitle: {
    color: '#EC0841',
    fontSize: 13,
    fontWeight: '500',
  },

  warningMessage: {
    marginTop: 5,
    color: '#222222',
    fontSize: 12,
    fontWeight: '400',
  },

  closeButton: {
    width: 28,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    color: '#9CA3AF',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 24,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingBottom: 28,
  },

  heading: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '400',
  },

  subHeading: {
    marginTop: 8,
    marginBottom: 18,
    color: '#8A8A8A',
    fontSize: 11,
    fontWeight: '400',
  },

  inputLabel: {
    marginBottom: 7,
    color: '#666666',
    fontSize: 12,
    fontWeight: '400',
  },

  input: {
    width: '100%',
    height: 46,
    paddingHorizontal: 12,
    color: '#222222',
    fontSize: 13,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 4,
  },

  focusedInput: {
    borderColor: '#FF0054',
  },

  errorInput: {
    borderColor: '#FF0054',
  },

  continueButton: {
    width: '100%',
    height: 48,
    marginTop: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F21655',
  },

  disabledButton: {
    opacity: 0.7,
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },

  footerText: {
    marginTop: 15,
    color: '#444444',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  successModal: {
    width: '100%',
    minHeight: 263,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },

  successIconOuter: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#D8F2D2',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successCheck: {
    color: '#83D875',
    fontSize: 48,
    fontWeight: '300',
    lineHeight: 55,
  },

  successTitle: {
    marginTop: 24,
    color: '#555555',
    fontSize: 24,
    fontWeight: '400',
  },

  successMessage: {
    marginTop: 13,
    color: '#555555',
    fontSize: 15,
    fontWeight: '400',
  },

  okButton: {
    minWidth: 46,
    height: 38,
    marginTop: 24,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7964E8',
    borderRadius: 3,
  },

  okButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});