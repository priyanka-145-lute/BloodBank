import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';
const PINK = '#ff2f68';

const UpcomingCampsScreen = ({navigation}: any) => {
  const goHome = () => {
    const tabNavigator = navigation.getParent?.();

    if (tabNavigator) {
      tabNavigator.navigate('Home');
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back" size={23} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Next Camps</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goHome}
          style={styles.homeButton}>
          <Ionicons name="home-outline" size={22} color={PINK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/upcoming-camp-banner.jpg')}
              resizeMode="cover"
              style={styles.banner}
            />

            <View style={styles.timeBadge}>
              <Ionicons name="calendar-outline" size={14} color="#ffffff" />
              <Text style={styles.timeText}>10:00 AM</Text>
            </View>
          </View>

          <View style={styles.details}>
            <Text style={styles.campTitle}>Mega Blood Donation Camp</Text>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar-outline" size={13} color={PINK} />
              </View>
              <Text style={styles.detailText}>10 April 2026</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="location-outline" size={14} color={PINK} />
              </View>
              <Text style={styles.detailText}>City Hall, Nagpur</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="person-outline" size={13} color={PINK} />
              </View>
              <Text style={styles.detailText}>Milind Kumar Sakhre</Text>
            </View>

            <Text style={styles.description}>
              Join our noble cause and help save lives by donating blood. Your one
              donation can save multiple lives.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    height: 42,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerButton: {
    width: 27,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 5,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  homeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1, backgroundColor: '#ffffff'},
  content: {paddingHorizontal: 9, paddingTop: 12, paddingBottom: 30},
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1e1e4',
    borderRadius: 5,
    backgroundColor: '#f3f3f5',
  },
  imageWrapper: {
    height: 156,
    marginHorizontal: 7,
    marginTop: 7,
    position: 'relative',
    overflow: 'hidden',
  },
  banner: {width: '100%', height: '100%'},
  timeBadge: {
    position: 'absolute',
    left: 7,
    bottom: 0,
    height: 29,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: PINK,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {color: '#ffffff', fontSize: 12, fontWeight: '700'},
  details: {paddingHorizontal: 9, paddingTop: 10, paddingBottom: 14},
  campTitle: {
    marginBottom: 7,
    color: RED,
    fontSize: 13,
    fontWeight: '600',
  },
  detailRow: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 20,
    height: 20,
    marginRight: 3,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {color: '#4e4e52', fontSize: 11},
  description: {
    marginTop: 5,
    color: '#66666b',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default UpcomingCampsScreen;
