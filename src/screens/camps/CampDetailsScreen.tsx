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

const RED = '#EC003B';
const PINK = '#FF2F68';
const gallery = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700',
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=700',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=700',
];

const CampDetailsScreen = ({route, navigation}: any) => {
  const {camp} = route.params;

  const goHome = () => navigation.getParent()?.navigate('Home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Camp Details</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goHome}
          style={styles.homeButton}>
          <Ionicons name="home-outline" size={24} color={PINK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image source={{uri: camp.image}} style={styles.campImage} />
          <Text style={styles.title}>{camp.title}</Text>

          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={16} color={PINK} />
            </View>
            <Text style={styles.detailText}>{camp.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={17} color={PINK} />
            </View>
            <Text style={styles.detailText}>{camp.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={16} color={PINK} />
            </View>
            <Text style={styles.detailText}>{camp.organizer}</Text>
          </View>

          <Text style={styles.description}>
            Join our noble cause and help save lives by donating blood. Your one
            donation can save multiple lives.
          </Text>
        </View>

        <View style={styles.gallery}>
          {gallery.map(image => (
            <Image key={image} source={{uri: image}} style={styles.galleryImage} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {
    height: 58,
    paddingHorizontal: 10,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {width: 38, height: 48, justifyContent: 'center'},
  headerTitle: {flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: '600'},
  homeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {paddingHorizontal: 16, paddingTop: 17, paddingBottom: 30},
  card: {
    padding: 11,
    paddingBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DADADF',
    backgroundColor: '#F3F3F5',
  },
  campImage: {width: '100%', height: 225, resizeMode: 'cover'},
  title: {marginTop: 13, marginBottom: 10, color: RED, fontSize: 17, fontWeight: '600'},
  detailRow: {minHeight: 28, flexDirection: 'row', alignItems: 'center'},
  iconCircle: {
    width: 24,
    height: 24,
    marginRight: 5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {color: '#48484D', fontSize: 14},
  description: {marginTop: 4, color: '#66666B', fontSize: 15, lineHeight: 23},
  gallery: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 9,
  },
  galleryImage: {width: '49%', height: 126, borderRadius: 8},
});

export default CampDetailsScreen;
