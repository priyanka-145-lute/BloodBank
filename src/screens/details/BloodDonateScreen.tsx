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
type DonateTab = 'donate' | 'history';
type DropdownName = 'type' | 'group';

const bloodTypes = ['All Types', 'Whole Blood', 'Plasma', 'Platelets'];
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

const BloodDonateScreen = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState<DonateTab>('donate');
  const [bloodType, setBloodType] = useState('Blood Type');
  const [bloodGroup, setBloodGroup] = useState('Blood Group');
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);

  const openDetails = () => navigation.navigate('BloodDonateDetails');
  const goHome = () => navigation.navigate('MainTabs');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blood Donate</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={goHome} style={styles.homeButton}>
          <Ionicons name="home-outline" size={24} color={RED} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.tabs}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveTab('donate');
              setOpenDropdown(null);
            }}
            style={[
              styles.tab,
              activeTab === 'donate' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'donate'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}>
              Blood Donate
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveTab('history');
              setOpenDropdown(null);
            }}
            style={[
              styles.tab,
              styles.historyTab,
              activeTab === 'history' ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'history'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}>
              Blood Donate History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'donate' ? (
          <>
            <View style={styles.filters}>
              <Dropdown
                label={bloodType}
                values={bloodTypes}
                open={openDropdown === 'type'}
                onToggle={() =>
                  setOpenDropdown(openDropdown === 'type' ? null : 'type')
                }
                onSelect={value => {
                  setBloodType(value);
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                label={bloodGroup}
                values={bloodGroups}
                open={openDropdown === 'group'}
                onToggle={() =>
                  setOpenDropdown(openDropdown === 'group' ? null : 'group')
                }
                onSelect={value => {
                  setBloodGroup(value);
                  setOpenDropdown(null);
                }}
              />
            </View>

            <RequestCard
              name="Sankalp Pandey"
              date="20-02-20254"
              address="Ashary Hospital, Nagpur Maharashtra"
              bank="Borivali Blood Centre"
              donors="1"
              group="AB+"
              onViewDetails={openDetails}
            />
          </>
        ) : (
          <RequestCard
            name="Harshad Kumar Mishra"
            date="28-01-2026"
            bank="Borivali Blood Centre"
            donors="3"
            group="O+"
            onViewDetails={openDetails}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const Dropdown = ({
  label,
  values,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  values: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) => (
  <View style={styles.dropdownColumn}>
    <TouchableOpacity activeOpacity={0.75} onPress={onToggle} style={styles.filter}>
      <Text numberOfLines={1} style={styles.filterText}>{label}</Text>
      <Ionicons
        name={open ? 'chevron-up' : 'chevron-down'}
        size={17}
        color="#555555"
      />
    </TouchableOpacity>

    {open ? (
      <View style={styles.dropdownMenu}>
        {values.map(value => (
          <TouchableOpacity
            key={value}
            activeOpacity={0.7}
            onPress={() => onSelect(value)}
            style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : null}
  </View>
);

const RequestCard = ({
  name,
  date,
  address,
  bank,
  donors,
  group,
  onViewDetails,
}: {
  name: string;
  date: string;
  address?: string;
  bank: string;
  donors: string;
  group: string;
  onViewDetails: () => void;
}) => (
  <View style={styles.card}>
    <View style={styles.cardBody}>
      <View style={styles.cardTop}>
        <View style={styles.cardInformation}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.needed}>
            Needed By : <Text style={styles.date}>{date}</Text>
          </Text>
          {address ? <Text style={styles.address}>{address}</Text> : null}
        </View>
        <View style={styles.groupBadge}>
          <Text style={styles.groupText}>{group}</Text>
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.bankRow}>
        <View style={styles.bankColumn}>
          <Text style={styles.label}>Blood Bank</Text>
          <Text style={styles.value}>{bank}</Text>
        </View>
        <View style={styles.donorsColumn}>
          <Text style={styles.label}>Donors Required</Text>
          <Text style={styles.value}>{donors}</Text>
        </View>
      </View>
    </View>

    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onViewDetails}
      style={styles.detailsButton}>
      <Text style={styles.detailsButtonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    height: 46,
    paddingHorizontal: 9,
    backgroundColor: RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 28,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 5,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {flex: 1, paddingHorizontal: 10, paddingTop: 12},
  tabs: {height: 38, flexDirection: 'row', alignItems: 'stretch'},
  tab: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTab: {marginLeft: 9},
  activeTab: {backgroundColor: RED},
  inactiveTab: {backgroundColor: '#ffe5eb'},
  tabText: {fontSize: 13, fontWeight: '600'},
  activeTabText: {color: '#ffffff'},
  inactiveTabText: {color: RED},
  filters: {
    zIndex: 20,
    marginTop: 13,
    flexDirection: 'row',
    gap: 10,
  },
  dropdownColumn: {flex: 1, position: 'relative'},
  filter: {
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#f06a8b',
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {
    flex: 1,
    marginRight: 5,
    color: '#606064',
    fontSize: 13,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    zIndex: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 3,
    backgroundColor: '#ffffff',
    elevation: 9,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  dropdownItem: {
    height: 38,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eeeeee',
  },
  dropdownItemText: {color: '#505054', fontSize: 13},
  card: {
    marginTop: 13,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  cardBody: {paddingTop: 10},
  cardTop: {
    minHeight: 58,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  cardInformation: {flex: 1},
  name: {color: '#404044', fontSize: 15, fontWeight: '700'},
  needed: {marginTop: 3, color: '#69696d', fontSize: 12},
  date: {color: RED, fontWeight: '700'},
  address: {marginTop: 3, color: '#747478', fontSize: 12},
  groupBadge: {
    minWidth: 41,
    height: 31,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#ff6a81',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupText: {color: RED, fontSize: 13, fontWeight: '600'},
  divider: {height: StyleSheet.hairlineWidth, backgroundColor: '#e5e5e5'},
  bankRow: {
    height: 48,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankColumn: {flex: 1},
  donorsColumn: {width: 88},
  label: {color: '#89898d', fontSize: 11},
  value: {
    marginTop: 2,
    color: '#515155',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsButton: {
    height: 34,
    backgroundColor: '#f9004c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {color: '#ffffff', fontSize: 13, fontWeight: '700'},
});

export default BloodDonateScreen;
