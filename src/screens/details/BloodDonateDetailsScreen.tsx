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
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';

const donationDetails = [
  {
    id: '1',
    title: 'Blood Donation Completed',
    date: '15 March 2025',
    centre: 'City Care Blood Bank',
    units: '1 Unit Donated',
    location: 'Mumbai, Maharashtra',
    group: 'B+',
    status: 'Successful',
    statusType: 'success',
  },
  {
    id: '2',
    title: 'Blood Donation Request Accepted',
    date: '10 February 2025',
    centre: 'Metro Blood Centre',
    units: '2 Units Donated',
    location: 'Delhi, India',
    group: 'O-',
    status: 'Pending Verification',
    statusType: 'pending',
  },
];

const BloodDonateDetailsScreen = ({navigation}: any) => (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar backgroundColor={RED} barStyle="light-content" />
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.headerButton}>
        <Ionicons name="chevron-back" size={22} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Blood Donate Details</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MainTabs')} style={styles.homeButton}>
        <Ionicons name="home-outline" size={22} color={RED} />
      </TouchableOpacity>
    </View>

    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {donationDetails.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.groupBadge}><Text style={styles.groupText}>{item.group}</Text></View>
          </View>
          <Text style={styles.date}>{item.date}</Text>
          <DetailRow icon="business" text={item.centre} />
          <DetailRow icon="water" text={item.units} />
          <DetailRow icon="location" text={item.location} />
          <View style={[styles.status, item.statusType === 'success' ? styles.successStatus : styles.pendingStatus]}>
            <Text style={[styles.statusText, item.statusType === 'success' ? styles.successText : styles.pendingText]}>
              {item.status}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const DetailRow = ({icon, text}: {icon: string; text: string}) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={15} color={RED} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {height: 42, paddingHorizontal: 8, backgroundColor: RED, flexDirection: 'row', alignItems: 'center'},
  headerButton: {width: 26, height: 36, alignItems: 'center', justifyContent: 'center'},
  headerTitle: {flex: 1, marginLeft: 4, color: '#ffffff', fontSize: 14, fontWeight: '500'},
  homeButton: {width: 30, height: 30, borderRadius: 15, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'},
  content: {paddingHorizontal: 10, paddingTop: 13, paddingBottom: 30},
  card: {marginBottom: 12, paddingHorizontal: 15, paddingTop: 13, paddingBottom: 14, borderRadius: 13, backgroundColor: '#ffffff', elevation: 7, shadowColor: '#000000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.08, shadowRadius: 10},
  cardHeader: {flexDirection: 'row', alignItems: 'center'},
  title: {flex: 1, color: '#66666a', fontSize: 13, fontWeight: '700'},
  groupBadge: {minWidth: 33, height: 26, paddingHorizontal: 7, borderRadius: 14, backgroundColor: '#ff1747', alignItems: 'center', justifyContent: 'center'},
  groupText: {color: '#ffffff', fontSize: 10, fontWeight: '700'},
  date: {marginTop: 4, marginBottom: 7, color: '#88888c', fontSize: 10},
  detailRow: {minHeight: 25, flexDirection: 'row', alignItems: 'center'},
  detailText: {marginLeft: 8, color: '#747478', fontSize: 11},
  status: {alignSelf: 'flex-start', marginTop: 3, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12},
  successStatus: {backgroundColor: '#e7f8eb'},
  pendingStatus: {backgroundColor: '#fff1db'},
  statusText: {fontSize: 9, fontWeight: '700'},
  successText: {color: '#22a043'},
  pendingText: {color: '#f08000'},
});

export default BloodDonateDetailsScreen;
