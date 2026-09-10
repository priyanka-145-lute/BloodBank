import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#EE0038';

interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Free Health Checkup Activity',
    date: '25 March 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'City Community Hall, Nagpur',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500',
  },
  {
    id: '2',
    title: 'Free Health Checkup Activity',
    date: '25 March 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'City Community Hall, Nagpur',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
  },
];

const OurActivitiesScreen = ({navigation}: any) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleActivityPress = (item: Activity) => {
    navigation.navigate('ActivityDetails', {
      activity: item,
    });
  };

  const renderActivity = ({item}: {item: Activity}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.activityCard}
        onPress={() => handleActivityPress(item)}>
        {/* ================= LEFT IMAGE ================= */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.activityImage}
            resizeMode="cover"
          />

          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>

        {/* ================= ACTIVITY DETAILS ================= */}
        <View style={styles.detailsContainer}>
          <Text
            style={styles.activityTitle}
            numberOfLines={1}>
            {item.title}
          </Text>

          {/* Time */}
          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={11}
              color="#FF4A74"
            />

            <Text style={styles.infoText}>{item.time}</Text>
          </View>

          {/* Location */}
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={12}
              color="#FF4A74"
            />

            <Text
              style={styles.infoText}
              numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>

        {/* ================= ARROW BUTTON ================= */}
        <View style={styles.arrowButton}>
          <Ionicons
            name="arrow-forward"
            color="#FFFFFF"
            size={18}
          />
        </View>
      </TouchableOpacity>
    );
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
              size={27}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Our Activities</Text>
        </View>

        {/* Home Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.homeButton}
          onPress={handleHome}>
          <Ionicons
            name="home-outline"
            size={23}
            color={RED}
          />
        </TouchableOpacity>
      </View>

      {/* ================= ACTIVITY LIST ================= */}
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OurActivitiesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ================= HEADER ================= */

  header: {
    height: 46,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 9,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 28,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  homeButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= LIST ================= */

  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 22,
    paddingBottom: 25,
  },

  /* ================= CARD ================= */

  activityCard: {
    width: '100%',
    height: 90,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    overflow: 'hidden',
  },

  /* ================= IMAGE ================= */

  imageContainer: {
    width: 94,
    height: '100%',
    position: 'relative',
  },

  activityImage: {
    width: '100%',
    height: '100%',
  },

  dateContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 17,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  /* ================= DETAILS ================= */

  detailsContainer: {
    flex: 1,
    height: '100%',
    paddingLeft: 8,
    paddingRight: 5,
    paddingTop: 7,
  },

  activityTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },

  infoText: {
    color: '#777777',
    fontSize: 12,
    marginLeft: 3,
    flexShrink: 1,
  },

  /* ================= ARROW ================= */

  arrowButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});
