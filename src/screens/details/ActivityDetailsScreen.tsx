import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#EE0038';
const GREEN = '#00A85A';

interface Activity {
  id?: string;
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  image?: string | ImageSourcePropType;
}

const ActivityDetailsScreen = ({route, navigation}: any) => {
  const activity: Activity = route?.params?.activity || {};

  // URL image आणि local image दोन्ही handle होतील
  const getImageSource = (): ImageSourcePropType => {
    if (typeof activity.image === 'string') {
      return {
        uri: activity.image,
      };
    }

    if (activity.image) {
      return activity.image;
    }

    return require('../../assets/Banner1.jpg');
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('OurActivities');
    }
  };

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
        <View style={styles.headerLeft}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={handleBack}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Our Activities
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.homeButton}
          onPress={handleHome}>
          <Ionicons
            name="home-outline"
            size={20}
            color={RED}
          />
        </TouchableOpacity>
      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        <View style={styles.card}>

          {/* ================= IMAGE ================= */}
          <View style={styles.imageWrapper}>
            <Image
              source={getImageSource()}
              style={styles.activityImage}
              resizeMode="cover"
            />

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {activity.date || '25 March 2026'}
              </Text>
            </View>
          </View>

          {/* ================= DETAILS ================= */}
          <View style={styles.contentContainer}>

            {/* TITLE */}
            <Text style={styles.title}>
              {activity.title || 'Free Health Checkup Camp'}
            </Text>

            {/* DESCRIPTION */}
            <Text style={styles.description}>
              {activity.description ||
                `Free basic health screening by expert doctors. Stay aware and stay healthy. Get a quick and free health screening by qualified doctors. Early detection helps maintain a healthy life. Blood donation is a voluntary, life-saving activity where donors provide blood for medical emergencies, surgeries, and chronic illnesses. The process is safe, takes under an hour, involves a brief health check-up, and collects roughly 450 milliliters of blood. Donors must be healthy, at least 110 lbs, and meet age requirements.`}
            </Text>

            {/* ================= TIME ================= */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Time:
              </Text>

              <Text style={styles.infoValue}>
                {activity.time || '10:00 AM - 4:00 PM'}
              </Text>
            </View>

            {/* ================= LOCATION ================= */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Location:
              </Text>

              <Text style={styles.infoValue}>
                {activity.location || 'Nagpur'}
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityDetailsScreen;

const styles = StyleSheet.create({
  /* ================= MAIN ================= */

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 7,
    paddingTop: 13,
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    height: 36,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 8,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    width: 28,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    marginLeft: 2,
  },

  homeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= CARD ================= */

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,

    elevation: 3,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.14,
    shadowRadius: 2.5,
  },

  /* ================= IMAGE ================= */

  imageWrapper: {
    width: '100%',
    height: 175,
    position: 'relative',
    backgroundColor: '#F2F2F2',
  },

  activityImage: {
    width: '100%',
    height: '100%',
  },

  /* ================= DATE ================= */

  dateContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 15,
    backgroundColor: RED,

    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
  },

  /* ================= CONTENT ================= */

  contentContainer: {
    width: '100%',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 22,
  },

  /* ================= TITLE ================= */

  title: {
    color: '#263238',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  /* ================= DESCRIPTION ================= */

  description: {
    width: '100%',
    color: '#666666',

    fontSize: 12,
    lineHeight: 18,

    fontWeight: '400',
    textAlign: 'justify',

    marginBottom: 16,
  },

  /* ================= TIME / LOCATION ================= */

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 7,
  },

  infoLabel: {
    color: GREEN,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    marginRight: 3,
  },

  infoValue: {
    flex: 1,
    color: '#444444',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
});
