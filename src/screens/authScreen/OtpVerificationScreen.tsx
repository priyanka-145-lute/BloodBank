import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from '../../context/AuthContext';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerification: {
    mobileNumber: string;
  };
};

type OtpVerificationScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'OtpVerification'
>;

const OTP_LENGTH = 4;

const OtpVerificationScreen = ({
  route,
}: OtpVerificationScreenProps) => {
  const {signIn} = useAuth();
  const {mobileNumber} = route.params;

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill(''),
  );

  const [focusedIndex, setFocusedIndex] =
    useState<number | null>(null);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (
    value: string,
    index: number,
  ): void => {
    const numericValue = value.replace(/[^0-9]/g, '');

    if (!numericValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] =
      numericValue[numericValue.length - 1];

    setOtp(updatedOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (
    key: string,
    index: number,
  ): void => {
    if (
      key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();

      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
    }
  };

  const handleVerify = (): void => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== OTP_LENGTH) {
      Alert.alert(
        'Invalid OTP',
        `Please enter the complete ${OTP_LENGTH}-digit verification code.`,
      );
      return;
    }

    Keyboard.dismiss();

    // Call your Verify OTP API here.
    console.log('Mobile Number:', mobileNumber);
    console.log('Entered OTP:', enteredOtp);

    signIn();
  };

  const handleResendCode = (): void => {
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();

    // Call your Resend OTP API here.
    Alert.alert(
      'OTP Sent',
      'A new verification code has been sent successfully.',
    );
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
          Platform.OS === 'ios' ? 'padding' : undefined
        }>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}>
          <View style={styles.container}>
            {/* Top curved section */}
            <View style={styles.headerContainer}>
              <View style={styles.headerShape} />

              <Image
                source={require('../../assets/verify.png')}
                style={styles.otpImage}
                resizeMode="contain"
              />
            </View>

            {/* OTP content */}
            <View style={styles.contentContainer}>
              <Text style={styles.heading}>
                Verify Mobile Number
              </Text>

              <Text style={styles.subHeading}>
                Enter The Verification Code That Has Been Sent To
              </Text>

              <Text style={styles.mobileNumber}>
                {mobileNumber}
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={value =>
                      handleOtpChange(value, index)
                    }
                    onKeyPress={({nativeEvent}) =>
                      handleKeyPress(
                        nativeEvent.key,
                        index,
                      )
                    }
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete="sms-otp"
                    maxLength={1}
                    selectTextOnFocus
                    style={[
                      styles.otpInput,
                      focusedIndex === index &&
                        styles.focusedOtpInput,
                      digit !== '' &&
                        styles.filledOtpInput,
                    ]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.verifyButton}
                activeOpacity={0.85}
                onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>
                  VERIFY &amp; PROCEED
                </Text>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendLabel}>
                  Didn&apos;t get code?{' '}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleResendCode}>
                  <Text style={styles.resendButtonText}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

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
  height: 275,
  alignItems: 'center',
  overflow: 'hidden',
},

headerShape: {
  position: 'absolute',
  top: 0,
  width: '115%',
  height: 275,
  backgroundColor: '#F1F1F1',
  borderBottomLeftRadius: 55,
  borderBottomRightRadius: 135,
},

otpImage: {
  width: 330,
  height: 235,
  marginTop: 20,
},

  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 25,
  },

  heading: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },

  subHeading: {
    marginTop: 10,
    color: '#888888',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },

  mobileNumber: {
    marginTop: 4,
    color: '#555555',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },

  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  otpInput: {
    width: 47,
    height: 49,
    padding: 0,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    color: '#222222',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',

    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },

  focusedOtpInput: {
    borderColor: '#FF0054',
  },

  filledOtpInput: {
    borderColor: '#FF7AA5',
  },

  verifyButton: {
    width: '100%',
    height: 48,
    marginTop: 28,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0054',
  },

  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },

  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  resendLabel: {
    color: '#444444',
    fontSize: 10,
    fontWeight: '400',
  },

  resendButtonText: {
    color: '#FF0054',
    fontSize: 10,
    fontWeight: '500',
  },
});


