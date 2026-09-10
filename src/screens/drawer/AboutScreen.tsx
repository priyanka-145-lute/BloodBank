import React from 'react';
import {
  Image,
  ImageBackground,
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
const PINK = '#FF3D6E';

const AboutScreen = ({navigation}: any) => {
  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={RED}
        barStyle="light-content"
      />

      {/* ================= HEADER ================= */}
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
          About
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

      {/* ================= CONTENT ================= */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require('../../assets/aboutBg.jpg')}
          style={styles.heroContainer}
          imageStyle={styles.heroBackgroundImage}
          resizeMode="cover">

          {/* Logo White Card */}
          <View style={styles.logoCard}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />

          
          </View>

          {/* Tagline */}
          <Text style={styles.heroTagline}>
            "Save Lives Faster..."
          </Text>
        </ImageBackground>

        {/* ================= ABOUT TEXT ================= */}
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            <Text style={styles.highlightText}>
              Blood Sarthi
            </Text>{' '}
            is a life-saving platform connecting blood donors
            to patients in real-time, along with instant access
            to blood banks, hospitals, ambulances, pharmacies,
            and diagnostic services nearby.
          </Text>

          <Text style={styles.paragraph}>
            Blood Sarthi is a unique social initiative and
            digital platform dedicated to saving lives by
            connecting blood donors with those in urgent need,
            while also providing access to essential emergency
            medical services.
          </Text>

          <Text style={styles.paragraph}>
            Blood Sarthi bridges this gap by enabling real-time
            connections between donors and recipients, along
            with helping users quickly locate hospitals, blood
            banks, pathology labs, radiology centers, ambulance
            services, and 24×7 pharmacies in their nearby area.
          </Text>

          {/* ================= CORE VALUES ================= */}
          <Text style={styles.sectionTitle}>
            Our Platform is Based on These{'\n'}
            Core Values
          </Text>

          <FeatureCard
            icon="blood-bag"
            title="Find Blood Donors"
            description="Quickly locate donors nearby in emergencies"
          />

          <FeatureCard
            icon="hospital-building"
            title="Emergency Services"
            description="Hospitals, Clinics, Ambulance, Labs"
          />

          <FeatureCard
            icon="account-group-outline"
            title="Volunteer Network"
            description="Build awareness & life-saving communities"
          />

          <FeatureCard
            icon="heart-outline"
            title="Compassionate Community"
            description="Always ready to help"
          />

          {/* ================= FOOTER ================= */}
          <Text style={styles.footerTitle}>
            "Blood Sarthi – Your Emergency Lifeline"
          </Text>

          <Text style={styles.footerSubtitle}>
            "Be the Reason Someone Lives Today"
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <View style={styles.featureCard}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name={icon as any}
          size={25}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>
          {title}
        </Text>

        <Text style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  /* ================= SCREEN ================= */

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 30,
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

    zIndex: 10,
  },

  backButton: {
    width: 30,
    height: 40,

    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,

    marginLeft: 2,

    color: '#FFFFFF',

    fontSize: 15,
    fontWeight: '600',
  },

  homeButton: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= HERO ================= */

  heroContainer: {
    width: '100%',
    height: 235,

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 5,
    paddingBottom: 18,

    overflow: 'hidden',
  },

  heroBackgroundImage: {
    width: '100%',
    height: '100%',
  },

  /* ================= HERO LOGO CARD ================= */

  logoCard: {
    width: 105,
    height: 105,

    backgroundColor: '#FFFFFF',

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 8,
    paddingVertical: 7,

    elevation: 3,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  logoImage: {
    width: 52,
    height: 52,
    marginBottom: 1,
  },

  logoBloodText: {
    color: '#C3002F',

    fontSize: 13,
    fontWeight: '800',

    lineHeight: 14,
  },

  logoSarthiText: {
    color: '#C3002F',

    fontSize: 12,
    fontWeight: '700',

    lineHeight: 13,
  },

  /* ================= HERO TAGLINE ================= */

  heroTagline: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '700',

    marginTop: 15,

    textAlign: 'center',

    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
  },

  /* ================= CONTENT ================= */

  contentContainer: {
    paddingHorizontal: 14,
    paddingTop: 15,
  },

  paragraph: {
    color: '#777777',

    fontSize: 11,
    lineHeight: 17,

    marginBottom: 13,

    textAlign: 'left',
  },

  highlightText: {
    color: PINK,
    fontWeight: '600',
  },

  /* ================= CORE VALUES ================= */

  sectionTitle: {
    marginTop: 6,
    marginBottom: 14,

    textAlign: 'center',

    color: PINK,

    fontSize: 15,
    fontWeight: '700',

    lineHeight: 17,
  },

  /* ================= FEATURE CARD ================= */

  featureCard: {
    minHeight: 72,

    marginBottom: 10,

    paddingHorizontal: 12,
    paddingVertical: 10,

    borderRadius: 7,

    backgroundColor: '#F2F2F2',

    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 45,
    height: 45,

    borderRadius: 12,

    backgroundColor: PINK,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    color: '#444444',

    fontSize: 12,
    fontWeight: '700',

    marginBottom: 3,
  },

  featureDescription: {
    color: '#777777',

    fontSize: 10.5,
    lineHeight: 15,
  },

  /* ================= FOOTER ================= */

  footerTitle: {
    color: PINK,

    textAlign: 'center',

    fontSize: 11,
    fontWeight: '700',

    marginTop: 8,
    marginBottom: 8,
  },

  footerSubtitle: {
    color: PINK,

    textAlign: 'center',

    fontSize: 10,
    fontWeight: '500',

    marginBottom: 15,
  },
})