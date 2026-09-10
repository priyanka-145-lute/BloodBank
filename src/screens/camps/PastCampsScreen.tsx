import React, {useState} from 'react';
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
const LIGHT_GREY = '#F3F3F5';
const BORDER = '#E5E5E5';

interface Camp {
  id: number;
  title: string;
  date: string;
  location: string;
  organizer: string;
  image: string;
}

/* ================= YEARS 2026 TO 2040 ================= */

const years = [
  'All',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
  '2032',
  '2033',
  '2034',
  '2035',
  '2036',
  '2037',
  '2038',
  '2039',
  '2040',
];

/* ================= MONTHS JAN TO DEC ================= */

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/* ================= ONLY 2 CARDS ================= */

const camps: Camp[] = [
  {
    id: 1,
    title: 'Mega Blood Donation Camp',
    date: '10 April 2026',
    location: 'City Hall, Nagpur',
    organizer: 'Ashish Kumar Denge',
    image:
      'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1000',
  },
  {
    id: 2,
    title: 'Mega Blood Donation Camp',
    date: '10-04-2026',
    location: 'City Hall, Nagpur',
    organizer: 'Ashish Kumar Denge',
    image:
      'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1000',
  },
];

const PastCampsScreen = ({navigation}: any) => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('Jan');

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleCampPress = (camp: Camp) => {
    console.log('Selected Camp:', camp);

    /*
    navigation.navigate('ActivityDetails', {
      activity: camp,
    });
    */
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Past Camps</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.homeButton}
          onPress={handleHome}>
          <Ionicons
            name="home-outline"
            size={24}
            color={PINK}
          />
        </TouchableOpacity>
      </View>

      {/* ================= MAIN ================= */}

      <View style={styles.container}>
        {/* ================= YEAR FILTER ================= */}

        <View style={styles.yearRow}>
          <TouchableOpacity activeOpacity={0.7} style={styles.arrowCircle}>
            <Ionicons
              name="chevron-back"
              size={18}
              color="#A0A0A0"
            />
          </TouchableOpacity>

          <ScrollView
            style={styles.yearScrollView}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.yearScroll}>
            {years.map(year => {
              const active = selectedYear === year;

              return (
                <TouchableOpacity
                  key={year}
                  activeOpacity={0.8}
                  onPress={() => setSelectedYear(year)}
                  style={[
                    styles.yearButton,
                    active && styles.activeYearButton,
                  ]}>
                  <Text
                    style={[
                      styles.yearText,
                      active && styles.activeYearText,
                    ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity activeOpacity={0.7} style={styles.arrowCircle}>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </View>

        {/* ================= MONTH FILTER ================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthContainer}>
          {months.map(month => {
            const active = selectedMonth === month;

            return (
              <TouchableOpacity
                key={month}
                activeOpacity={0.8}
                onPress={() => setSelectedMonth(month)}
                style={[
                  styles.monthButton,
                  active && styles.activeMonthButton,
                ]}>
                <Text
                  style={[
                    styles.monthText,
                    active && styles.activeMonthText,
                  ]}>
                  {month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ================= CAMP LIST ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}>
          {camps.map(camp => (
            <View key={camp.id} style={styles.card}>
              {/* ================= IMAGE ================= */}

              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: camp.image,
                  }}
                  style={styles.campImage}
                  resizeMode="cover"
                />

                {/* ================= DATE BADGE ================= */}

                <View style={styles.dateBadge}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color="#FFFFFF"
                  />

                  <Text style={styles.dateText}>{camp.date}</Text>
                </View>
              </View>

              {/* ================= DETAILS ================= */}

              <View style={styles.cardContent}>
                <Text style={styles.campTitle}>{camp.title}</Text>

                {/* LOCATION */}

                <View style={styles.detailRow}>
                  <View style={styles.detailIconCircle}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color={PINK}
                    />
                  </View>

                  <Text style={styles.detailText}>{camp.location}</Text>
                </View>

                {/* ORGANIZER + BUTTON */}

                <View style={styles.organizerRow}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailIconCircle}>
                      <Ionicons
                        name="person-outline"
                        size={15}
                        color={PINK}
                      />
                    </View>

                    <Text style={styles.detailText}>{camp.organizer}</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.nextButton}
                    onPress={() => handleCampPress(camp)}>
                    <Ionicons
                      name="arrow-forward"
                      size={21}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PastCampsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: RED,
  },

  /* ================= HEADER ================= */

  header: {
    height: 58,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 30,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },

  homeButton: {
    width: 38,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= MAIN ================= */

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ================= YEAR ================= */

  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 14,
  },

  yearScroll: {
    alignItems: 'center',
    paddingHorizontal: 5,
    gap: 7,
  },

  yearScrollView: {
    flex: 1,
  },

  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,

    elevation: 2,
  },

  yearButton: {
    minWidth: 58,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1E1E1',
  },

  activeYearButton: {
    backgroundColor: '#FF376B',
  },

  yearText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },

  activeYearText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* ================= MONTH ================= */

  monthContainer: {
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 17,
    gap: 8,
  },

  monthButton: {
    minWidth: 47,
    height: 33,
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  activeMonthButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },

  monthText: {
    fontSize: 12,
    color: '#777777',
  },

  activeMonthText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* ================= LIST ================= */

  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  /* ================= CARD ================= */

  card: {
    width: '100%',
    backgroundColor: LIGHT_GREY,
    borderRadius: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },

  /* ================= IMAGE ================= */

  imageContainer: {
    width: '100%',
    height: 195,
    position: 'relative',
    padding: 7,
    paddingBottom: 0,
  },

  campImage: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#E5E5E5',
  },

  /* ================= DATE ================= */

  dateBadge: {
    position: 'absolute',
    left: 15,
    bottom: 8,
    height: 30,
    paddingHorizontal: 13,
    backgroundColor: PINK,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  /* ================= CONTENT ================= */

  cardContent: {
    paddingHorizontal: 11,
    paddingTop: 12,
    paddingBottom: 11,
  },

  campTitle: {
    color: '#EC0042',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailIconCircle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },

  detailText: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '400',
  },

  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },

  nextButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
