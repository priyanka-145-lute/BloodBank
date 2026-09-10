import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';
const GREEN = '#28a745';

const people = [
  {id: '1', name: 'Rahul Sharma', location: 'Mumbai, India', group: 'B+', phone: '9123456789'},
  {id: '2', name: 'Priya Mehta', location: 'Delhi, India', group: 'O-'},
];

const cities = ['All Cities', 'Mumbai', 'Delhi', 'Nagpur', 'Pune'];
const bloodGroups = [
  'All Groups',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

const DonorDirectoryScreen = ({navigation, route}: any) => {
  const title = route.name === 'BloodRecipients' ? 'Blood Recipients' : 'Blood Donors';
  const goHome = () => navigation.getParent()?.navigate('Home');
  const [selectedCity, setSelectedCity] = useState('City');
  const [selectedGroup, setSelectedGroup] = useState('Blood Group');
  const [openDropdown, setOpenDropdown] = useState<'city' | 'group' | null>(null);

  const visiblePeople = people.filter(person => {
    const cityMatches =
      selectedCity === 'City' ||
      selectedCity === 'All Cities' ||
      person.location.startsWith(selectedCity);
    const groupMatches =
      selectedGroup === 'Blood Group' ||
      selectedGroup === 'All Groups' ||
      person.group === selectedGroup;

    return cityMatches && groupMatches;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={goHome} style={styles.homeButton}>
          <Ionicons name="home-outline" size={22} color={RED} />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <View style={styles.filterColumn}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setOpenDropdown(openDropdown === 'city' ? null : 'city')}
            style={styles.filter}>
            <Text numberOfLines={1} style={styles.filterText}>{selectedCity}</Text>
            <Ionicons name={openDropdown === 'city' ? 'chevron-up' : 'chevron-down'} size={15} color="#666666" />
          </TouchableOpacity>

          {openDropdown === 'city' ? (
            <View style={styles.dropdown}>
              {cities.map(city => (
                <TouchableOpacity
                  key={city}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedCity(city);
                    setOpenDropdown(null);
                  }}
                  style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.filterColumn}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setOpenDropdown(openDropdown === 'group' ? null : 'group')}
            style={styles.filter}>
            <Text numberOfLines={1} style={styles.filterText}>{selectedGroup}</Text>
            <Ionicons name={openDropdown === 'group' ? 'chevron-up' : 'chevron-down'} size={15} color="#666666" />
          </TouchableOpacity>

          {openDropdown === 'group' ? (
            <View style={styles.dropdown}>
              {bloodGroups.map(group => (
                <TouchableOpacity
                  key={group}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedGroup(group);
                    setOpenDropdown(null);
                  }}
                  style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{group}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.list}>
        {visiblePeople.map(person => (
          <View key={person.id} style={styles.personCard}>
            <View style={styles.personTop}>
              <View style={styles.personInfo}>
                <View style={styles.nameRow}>
                  <Ionicons name="person" size={15} color="#737373" />
                  <Text style={styles.name}>{person.name}</Text>
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={13} color="#858585" />
                  <Text style={styles.location}>{person.location}</Text>
                </View>
              </View>
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodText}>{person.group}</Text>
              </View>
            </View>

            {person.phone ? (
              <TouchableOpacity activeOpacity={0.75} style={styles.phoneBadge}>
                <Ionicons name="call" size={12} color={GREEN} />
                <Text style={styles.phoneText}>{person.phone}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}

        {visiblePeople.length === 0 ? (
          <Text style={styles.emptyText}>No matching records found</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    height: 42,
    paddingHorizontal: 8,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {width: 26, height: 36, alignItems: 'center', justifyContent: 'center'},
  headerTitle: {flex: 1, marginLeft: 4, color: '#ffffff', fontSize: 14, fontWeight: '500'},
  homeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    zIndex: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 21,
  },
  filterColumn: {flex: 1, position: 'relative'},
  filter: {
    height: 34,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {flex: 1, marginRight: 5, color: '#888888', fontSize: 11},
  dropdown: {
    position: 'absolute',
    top: 36,
    left: 0,
    right: 0,
    zIndex: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  dropdownItem: {
    height: 32,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eeeeee',
  },
  dropdownText: {color: '#555555', fontSize: 11},
  list: {paddingHorizontal: 10, paddingTop: 11, gap: 10},
  personCard: {
    minHeight: 89,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 9,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  personTop: {flexDirection: 'row', alignItems: 'flex-start'},
  personInfo: {flex: 1},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
  name: {marginLeft: 6, color: '#777777', fontSize: 13, fontWeight: '700'},
  locationRow: {marginTop: 5, flexDirection: 'row', alignItems: 'center'},
  location: {marginLeft: 5, color: '#888888', fontSize: 11},
  bloodBadge: {
    minWidth: 27,
    height: 24,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#ff1747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodText: {color: '#ffffff', fontSize: 11, fontWeight: '700'},
  phoneBadge: {
    alignSelf: 'flex-start',
    height: 23,
    marginTop: 7,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: '#65c56d',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {marginLeft: 5, color: GREEN, fontSize: 10, fontWeight: '700'},
  emptyText: {marginTop: 18, color: '#888888', fontSize: 12, textAlign: 'center'},
});

export default DonorDirectoryScreen;
