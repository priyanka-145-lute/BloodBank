import React from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';
const GREEN = '#15972b';

const RequestDetailsScreen = ({navigation}: any) => {
  const callNumber = () => Linking.openURL('tel:+919876543210');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MainTabs')}
          style={styles.homeButton}>
          <Ionicons name="home-outline" size={24} color={RED} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.headingBlock}>
              <Text style={styles.name}>Vijay Haldankar</Text>
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>Urgent Requirement</Text>
              </View>
            </View>
            <View style={styles.bloodBadge}>
              <Text style={styles.bloodText}>AB+</Text>
            </View>
          </View>

          <View style={styles.details}>
            <DetailRow icon="business" text="Borivali Blood Centre" />
            <DetailRow icon="location" text="Mumbai, Maharashtra" />
            <DetailRow icon="water" text="Component: Whole Blood" />
            <DetailRow icon="people" text="Units Required : 2" />
            <DetailRow icon="calendar" text="Required By : 28-11-2024" />
            <DetailRow icon="time" text="Posted : 2 Hours Ago" />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity activeOpacity={0.8} onPress={callNumber} style={styles.callButton}>
            <Ionicons name="call" size={17} color={GREEN} />
            <Text style={styles.callText}>Call +91-9876543210</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const DetailRow = ({icon, text}: {icon: string; text: string}) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={17} color={RED} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 29,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 7,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  homeButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {paddingHorizontal: 18, paddingTop: 13},
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    minHeight: 68,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ed0038',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headingBlock: {flex: 1},
  name: {color: '#ffffff', fontSize: 18, fontWeight: '700'},
  urgentBadge: {
    alignSelf: 'flex-start',
    marginTop: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
  },
  urgentText: {color: RED, fontSize: 12, fontWeight: '500'},
  bloodBadge: {
    minWidth: 43,
    height: 35,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodText: {color: RED, fontSize: 14, fontWeight: '700'},
  details: {paddingHorizontal: 15, paddingTop: 9, paddingBottom: 13},
  detailRow: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 10,
    color: '#555559',
    fontSize: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5e5',
  },
  callButton: {
    height: 45,
    marginHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callText: {
    marginLeft: 6,
    color: GREEN,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default RequestDetailsScreen;
