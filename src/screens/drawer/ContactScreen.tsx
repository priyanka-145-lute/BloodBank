import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RED = '#F0003C';

const ContactUsScreen = ({navigation}: any) => {
  const phoneNumber = '8148709384';

  const handleCall = async () => {
    const url = `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Calling is not supported on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to make the call.');
    }
  };

  const handleHome = () => {
    // Change "Home" according to your navigator screen name
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={RED}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Contact Us</Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleHome}>
          <MaterialCommunityIcons
            name="home-outline"
            size={19}
            color={RED}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Contact Us</Text>

          <Text style={styles.description}>
            If you have any questions, support{'\n'}
            requests, or emergency assistance, please{'\n'}
            contact us.
          </Text>

          {/* Mobile Number */}
          <View style={styles.infoBox}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="phone"
                size={24}
                color={RED}
              />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Mobile Number</Text>
              <Text style={styles.infoDescription}>
                {phoneNumber}
              </Text>
            </View>
          </View>

          {/* Blood Donation */}
          <View style={styles.infoBox}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={25}
                color={RED}
              />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>
                Blood Donation Support
              </Text>

              <Text style={styles.infoDescription}>
                Contact us for donor connection{'\n'}
                or emergency blood{'\n'}
                requirements.
              </Text>
            </View>
          </View>

          {/* Emergency Medical Services */}
          <View style={styles.infoBox}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="hospital-box"
                size={25}
                color={RED}
              />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>
                Emergency Medical Services
              </Text>

              <Text style={styles.infoDescription}>
                We help connect users with{'\n'}
                hospitals, ambulances, blood{'\n'}
                banks and medical services.
              </Text>
            </View>
          </View>

          {/* Call Now Button */}
          <TouchableOpacity
            style={styles.callButton}
            activeOpacity={0.8}
            onPress={handleCall}>
            <MaterialCommunityIcons
              name="phone"
              size={15}
              color="#FFFFFF"
            />

            <Text style={styles.callButtonText}>
              Call Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 52,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  headerIcon: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },

  homeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 18,
    backgroundColor: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,

    elevation: 5,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  title: {
    textAlign: 'center',
    color: RED,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },

  description: {
    textAlign: 'center',
    color: '#8B8B8B',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },

  infoBox: {
    width: '100%',
    minHeight: 72,
    backgroundColor: '#F7F7F8',
    borderRadius: 5,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  iconContainer: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 13,
    color: '#4B4B4B',
    fontWeight: '700',
    marginBottom: 2,
  },

  infoDescription: {
    fontSize: 11,
    color: '#777777',
    lineHeight: 16,
  },

  callButton: {
    alignSelf: 'center',
    minWidth: 112,
    height: 42,
    paddingHorizontal: 20,
    backgroundColor: '#E60000',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    gap: 5,
  },

  callButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});