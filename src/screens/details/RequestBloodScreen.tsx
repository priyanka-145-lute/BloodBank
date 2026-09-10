import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';
const bloodTypes = ['Whole Blood', 'Plasma', 'Platelets'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const units = ['1 Unit', '2 Units', '3 Units', '4 Units', '5 Units'];

type RequestTab = 'new' | 'history';
type DropdownName = 'type' | 'group' | 'units';

const RequestBloodScreen = ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState<RequestTab>('new');
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);
  const [bloodType, setBloodType] = useState('Blood Type');
  const [bloodGroup, setBloodGroup] = useState('Blood Group');
  const [selectedUnits, setSelectedUnits] = useState('Select Units');
  const [critical, setCritical] = useState(true);

  const changeTab = (tab: RequestTab) => {
    setActiveTab(tab);
    setOpenDropdown(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request For Blood</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MainTabs')} style={styles.homeButton}>
          <Ionicons name="home-outline" size={24} color={RED} />
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.tabs}>
          <TabButton label="New Request" active={activeTab === 'new'} onPress={() => changeTab('new')} />
          <TabButton label="Request History" active={activeTab === 'history'} onPress={() => changeTab('history')} />
        </View>

        {activeTab === 'new' ? (
          <>
            <Text style={styles.helperText}>
              (Kindly fill the details correctly to help you better)
            </Text>

            <View style={styles.twoColumns}>
              <Dropdown
                label={bloodType}
                values={bloodTypes}
                open={openDropdown === 'type'}
                onToggle={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                onSelect={value => {
                  setBloodType(value);
                  setOpenDropdown(null);
                }}
              />
              <Dropdown
                label={bloodGroup}
                values={bloodGroups}
                open={openDropdown === 'group'}
                onToggle={() => setOpenDropdown(openDropdown === 'group' ? null : 'group')}
                onSelect={value => {
                  setBloodGroup(value);
                  setOpenDropdown(null);
                }}
              />
            </View>

            <TextInput placeholder="Patient Name" placeholderTextColor="#858589" style={styles.input} />
            <TextInput keyboardType="phone-pad" placeholder="Mobile Number" placeholderTextColor="#858589" style={styles.input} />
            <TextInput placeholder="" placeholderTextColor="#858589" style={styles.input} />

            <View style={styles.unitsWrapper}>
              <Dropdown
                label={selectedUnits}
                values={units}
                open={openDropdown === 'units'}
                onToggle={() => setOpenDropdown(openDropdown === 'units' ? null : 'units')}
                onSelect={value => {
                  setSelectedUnits(value);
                  setOpenDropdown(null);
                }}
              />
            </View>

            <TouchableOpacity activeOpacity={0.75} onPress={() => setCritical(value => !value)} style={styles.criticalRow}>
              <View style={[styles.checkbox, critical && styles.checkedBox]}>
                {critical ? <Ionicons name="checkmark" size={14} color="#ffffff" /> : null}
              </View>
              <Text style={styles.criticalText}>Critical</Text>
            </TouchableOpacity>

            <TextInput placeholder="Location" placeholderTextColor="#858589" style={styles.input} />
            <TextInput
              multiline
              placeholder="Additional note to potential donors"
              placeholderTextColor="#858589"
              style={[styles.input, styles.notesInput]}
            />

            <TouchableOpacity activeOpacity={0.82} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>SEND REQUEST</Text>
            </TouchableOpacity>
          </>
        ) : (
          <HistoryList onViewDetails={() => navigation.navigate('RequestDetails')} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const TabButton = ({label, active, onPress}: {label: string; active: boolean; onPress: () => void}) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.tab, active ? styles.activeTab : styles.inactiveTab]}>
    <Text style={[styles.tabText, active ? styles.activeTabText : styles.inactiveTabText]}>{label}</Text>
  </TouchableOpacity>
);

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
    <TouchableOpacity activeOpacity={0.75} onPress={onToggle} style={styles.dropdownButton}>
      <Text numberOfLines={1} style={styles.dropdownLabel}>{label}</Text>
      <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={17} color="#555555" />
    </TouchableOpacity>
    {open ? (
      <View style={styles.dropdownMenu}>
        {values.map(value => (
          <TouchableOpacity key={value} activeOpacity={0.7} onPress={() => onSelect(value)} style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : null}
  </View>
);

const HistoryList = ({onViewDetails}: {onViewDetails: () => void}) => (
  <View style={styles.historyList}>
    <HistoryCard
      name="Vijay Haldankar"
      date="28-11-2024"
      group="AB+"
      bank="Borivali Blood Centre"
      donors="1"
      onViewDetails={onViewDetails}
      donorRows={[
        ['Harshad Bondre', '25-02-2026'],
        ['Ashish Kumar Denge', '08-02-2026'],
      ]}
    />
    <HistoryCard
      name="Milind Kumar SakhreGhodpage"
      date="09-11-2026"
      group="AB+"
      bank="Dhantoli Blood Centre"
      donors="5"
      onViewDetails={onViewDetails}
      donorRows={[
        ['Shubham Kumar Ghodpage', '5-02-2026'],
        ['Mukesh Kumar Bhujade', '23-06-2026'],
      ]}
    />
  </View>
);

const HistoryCard = ({
  name,
  date,
  group,
  bank,
  donors,
  donorRows,
  onViewDetails,
}: {
  name: string;
  date: string;
  group: string;
  bank: string;
  donors: string;
  donorRows: string[][];
  onViewDetails: () => void;
}) => (
  <View style={styles.historyCard}>
    <View style={styles.historyHeader}>
      <View style={styles.historyGroup}><Text style={styles.historyGroupText}>{group}</Text></View>
      <View style={styles.historyTitleBlock}>
        <Text numberOfLines={1} style={styles.historyName}>{name}</Text>
        <Text style={styles.historyDate}>Needed By : {date}</Text>
      </View>
    </View>
    <View style={styles.historyInfo}>
      <View style={styles.bankBlock}>
        <Text style={styles.smallLabel}>Blood Bank</Text>
        <Text style={styles.infoValue}>{bank}</Text>
      </View>
      <View>
        <Text style={styles.smallLabel}>Donors</Text>
        <Text style={styles.infoValue}>{donors}</Text>
      </View>
    </View>
    <Text style={[styles.smallLabel, styles.donorDetailsLabel]}>Donor Details</Text>
    <View style={styles.donorTable}>
      {donorRows.map(row => (
        <View key={row[0]} style={styles.donorRow}>
          <Text style={styles.donorName}>{row[0]}</Text>
          <Text style={styles.donorDate}>{row[1]}</Text>
        </View>
      ))}
    </View>
    <TouchableOpacity activeOpacity={0.82} onPress={onViewDetails} style={styles.viewButton}>
      <Text style={styles.viewButtonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {height: 46, paddingHorizontal: 9, backgroundColor: RED, flexDirection: 'row', alignItems: 'center'},
  headerButton: {width: 28, height: 40, alignItems: 'center', justifyContent: 'center'},
  headerTitle: {flex: 1, marginLeft: 5, color: '#ffffff', fontSize: 16, fontWeight: '600'},
  homeButton: {width: 34, height: 34, borderRadius: 17, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'},
  content: {paddingHorizontal: 12, paddingTop: 11, paddingBottom: 30},
  tabs: {height: 38, flexDirection: 'row', gap: 9},
  tab: {height: 38, paddingHorizontal: 14, borderRadius: 5, alignItems: 'center', justifyContent: 'center'},
  activeTab: {backgroundColor: RED},
  inactiveTab: {backgroundColor: '#ffe4ea'},
  tabText: {fontSize: 13, fontWeight: '600'},
  activeTabText: {color: '#ffffff'},
  inactiveTabText: {color: RED},
  helperText: {marginTop: 14, marginBottom: 14, color: '#69696d', fontSize: 12},
  twoColumns: {zIndex: 30, flexDirection: 'row', gap: 12},
  dropdownColumn: {flex: 1, position: 'relative'},
  dropdownButton: {height: 42, paddingHorizontal: 11, borderWidth: 1, borderColor: '#dedee1', backgroundColor: '#fafafa', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  dropdownLabel: {flex: 1, marginRight: 5, color: '#707074', fontSize: 13},
  dropdownMenu: {position: 'absolute', top: 44, left: 0, right: 0, zIndex: 40, overflow: 'hidden', borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 3, backgroundColor: '#ffffff', elevation: 9},
  dropdownItem: {height: 38, paddingHorizontal: 11, justifyContent: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eeeeee'},
  dropdownItemText: {color: '#505054', fontSize: 13},
  input: {height: 43, marginTop: 12, paddingHorizontal: 12, paddingVertical: 0, borderWidth: 1, borderColor: '#dedee1', borderRadius: 4, backgroundColor: '#f8f8f8', color: '#444448', fontSize: 13},
  unitsWrapper: {zIndex: 20, height: 42, marginTop: 12},
  criticalRow: {alignSelf: 'flex-start', height: 35, flexDirection: 'row', alignItems: 'center'},
  checkbox: {width: 17, height: 17, marginRight: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius: 2, alignItems: 'center', justifyContent: 'center'},
  checkedBox: {borderColor: RED, backgroundColor: RED},
  criticalText: {color: '#3e3e42', fontSize: 13, fontWeight: '600'},
  notesInput: {height: 48, paddingTop: 12, textAlignVertical: 'top'},
  sendButton: {height: 45, marginTop: 13, borderRadius: 24, backgroundColor: '#fb0050', alignItems: 'center', justifyContent: 'center'},
  sendButtonText: {color: '#ffffff', fontSize: 13, fontWeight: '700'},
  historyList: {marginTop: 12, gap: 13},
  historyCard: {overflow: 'hidden', borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 7, backgroundColor: '#ffffff'},
  historyHeader: {minHeight: 58, paddingHorizontal: 11, backgroundColor: '#fff0f3', flexDirection: 'row', alignItems: 'center'},
  historyGroup: {minWidth: 42, height: 30, paddingHorizontal: 7, borderWidth: 1, borderColor: '#ff7188', borderRadius: 16, alignItems: 'center', justifyContent: 'center'},
  historyGroupText: {color: RED, fontSize: 13, fontWeight: '700'},
  historyTitleBlock: {flex: 1, marginLeft: 12},
  historyName: {color: '#3f3f43', fontSize: 14, fontWeight: '700'},
  historyDate: {marginTop: 3, color: RED, fontSize: 12, fontWeight: '700'},
  historyInfo: {height: 48, paddingHorizontal: 9, flexDirection: 'row', alignItems: 'center'},
  bankBlock: {flex: 1},
  smallLabel: {color: '#89898d', fontSize: 10},
  infoValue: {marginTop: 2, color: '#444448', fontSize: 12, fontWeight: '700'},
  donorDetailsLabel: {marginHorizontal: 9, marginBottom: 4},
  donorTable: {marginHorizontal: 9, marginBottom: 8, borderWidth: 1, borderColor: '#e2e2e2'},
  donorRow: {height: 25, flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#dedede'},
  donorName: {flex: 1, paddingHorizontal: 7, color: '#646468', fontSize: 10, textAlignVertical: 'center', backgroundColor: '#f3f3f3'},
  donorDate: {width: 85, paddingHorizontal: 5, color: '#555559', fontSize: 9, textAlignVertical: 'center'},
  viewButton: {height: 34, backgroundColor: '#fb0050', alignItems: 'center', justifyContent: 'center'},
  viewButtonText: {color: '#ffffff', fontSize: 13, fontWeight: '700'},
});

export default RequestBloodScreen;
