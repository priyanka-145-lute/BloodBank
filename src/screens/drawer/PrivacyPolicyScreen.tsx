import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RED = '#F0003C';

const PrivacyPolicyScreen = ({navigation}: any) => {
  const handleHome = () => {
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
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Privacy Policy
        </Text>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={handleHome}>
          <MaterialCommunityIcons
            name="home-outline"
            size={19}
            color={RED}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <View style={styles.card}>
          {/* Intro */}
          <Text style={styles.paragraph}>
            This Privacy Policy explains how Blood Sarthi
            collects, uses and protects your personal information
            when you use our application and services.
          </Text>

          {/* 1 */}
          <Text style={styles.sectionTitle}>
            | 1. Information We Collect
          </Text>

          <Text style={styles.paragraph}>
            We may collect the following information from users:
          </Text>

          <Bullet text="Name" />
          <Bullet text="Mobile Number" />
          <Bullet text="Email Address" />
          <Bullet text="Date of Birth" />
          <Bullet text="Gender" />
          <Bullet text="Address" />
          <Bullet text="Blood Group" />
          <Bullet text="Height and Weight" />
          <Bullet text="Blood Donation Information" />
          <Bullet text="Last Donation Date" />

          {/* 2 */}
          <Text style={styles.sectionTitle}>
            | 2. How We Use Your Information
          </Text>

          <Text style={styles.paragraph}>
            The information collected may be used to:
          </Text>

          <Bullet text="Create and manage your profile" />
          <Bullet text="Connect blood donors with people in need" />
          <Bullet text="Provide emergency blood assistance" />
          <Bullet text="Improve our application and services" />
          <Bullet text="Send important service related notifications" />
          <Bullet text="Provide better support to our users" />

          {/* 3 */}
          <Text style={styles.sectionTitle}>
            | 3. Location Information
          </Text>

          <Text style={styles.paragraph}>
            The application may use your location to find nearby
            blood donors, hospitals, blood banks and emergency
            medical services.
          </Text>

          <Text style={styles.paragraph}>
            Location information is used only when required to
            provide location-based services.
          </Text>

          {/* 4 */}
          <Text style={styles.sectionTitle}>
            | 4. Sharing of Information
          </Text>

          <Text style={styles.paragraph}>
            We do not sell, rent or misuse your personal
            information.
          </Text>

          <Text style={styles.paragraph}>
            We may share necessary information such as:
          </Text>

          <Bullet text="Blood Group" />
          <Bullet text="Location" />
          <Bullet text="Contact Number" />

          <Text style={styles.paragraph}>
            may be visible to users requesting blood.
          </Text>

          <Text style={styles.subHeading}>
            With Service Providers
          </Text>

          <Bullet text="Hospital listings" />
          <Bullet text="Blood bank information" />
          <Bullet text="Emergency medical services" />

          <Text style={styles.subHeading}>
            Legal Requirements
          </Text>

          <Text style={styles.paragraph}>
            We may disclose information if required by law or
            government authorities.
          </Text>

          {/* 5 */}
          <Text style={styles.sectionTitle}>
            | 5. Data Security
          </Text>

          <Text style={styles.paragraph}>
            We take reasonable steps to protect your information
            from unauthorized access, misuse, or disclosure.
            However, no system can guarantee 100% security.
          </Text>

          {/* 6 */}
          <Text style={styles.sectionTitle}>
            | 6. User Responsibilities
          </Text>

          <Bullet text="Provide accurate information" />
          <Bullet text="Use the platform responsibly" />
          <Bullet text="Contact donors only for genuine blood requirements" />

          <Text style={styles.paragraph}>
            Misuse of the platform may result in account
            suspension.
          </Text>

          {/* 7 */}
          <Text style={styles.sectionTitle}>
            | 7. Third-Party Services
          </Text>

          <Text style={styles.paragraph}>
            The app may include information related to:
          </Text>

          <Bullet text="Hospitals" />
          <Bullet text="Medical Stores" />
          <Bullet text="Ambulance Services" />
          <Bullet text="Blood Banks" />
          <Bullet text="Radiology Centers" />
          <Bullet text="Pathology Laboratories" />

          <Text style={styles.paragraph}>
            We are not responsible for services provided by
            third-party organizations.
          </Text>

          {/* 8 */}
          <Text style={styles.sectionTitle}>
            | 8. Children's Privacy
          </Text>

          <Text style={styles.paragraph}>
            Our services are not intended for individuals under
            the age of 18. We do not knowingly collect personal
            data from minors.
          </Text>

          {/* 9 */}
          <Text style={styles.sectionTitle}>
            | 9. Changes to This Privacy Policy
          </Text>

          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time.
            Changes will be posted inside the application with
            the updated revision date.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Bullet = ({text}: {text: string}) => {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>
        {text}
      </Text>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ================= HEADER ================= */

  header: {
    height: 51,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

    elevation: 4,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  backButton: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 2,
  },

  homeButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: '#FFFFFF',

    // Left-right space
    marginHorizontal: 10,

    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 18,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#EEEEEE',

    elevation: 2,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },

  /* ================= TEXT ================= */

  sectionTitle: {
    color: RED,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 17,
    marginBottom: 9,
  },

  paragraph: {
    color: '#707070',
    fontSize: 11,
    lineHeight: 18,
    marginBottom: 8,
  },

  subHeading: {
    color: '#555555',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
  },

  /* ================= BULLETS ================= */

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 8,
    marginBottom: 4,
  },

  bullet: {
    color: '#777777',
    fontSize: 11,
    lineHeight: 17,
    marginRight: 7,
  },

  bulletText: {
    flex: 1,
    color: '#707070',
    fontSize: 11,
    lineHeight: 17,
  },
});