import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RED = '#F0003C';
const BORDER = '#EEEEEE';

const ProfileScreen = ({navigation}: any) => {
  const [isDonor, setIsDonor] = useState(false);

  const personalDetails = [
    {
      label: 'Mobile',
      value: '7385369033',
    },
    {
      label: 'Name',
      value: 'Priyanka',
    },
    {
      label: 'Email ID',
      value: 'priyankalute145@gmail.com',
    },
    {
      label: 'Gender',
      value: 'Female',
    },
    {
      label: 'Date Of Birth',
      value: '2004-05-14',
    },
  ];

  const addressDetails = [
    {
      label: 'Address',
      value: 'Nandanvan, Nagpur',
    },
    {
      label: 'State',
      value: 'Maharashtra',
    },
    {
      label: 'City',
      value: 'Nagpur',
    },
    {
      label: 'Area',
      value: 'Priyanka Lute',
    },
    {
      label: 'PIN Code',
      value: '440009',
    },
  ];

  const donorDetails = [
    {
      label: 'Blood Group',
      value: '',
    },
    {
      label: 'Height',
      value: '',
    },
    {
      label: 'Weight',
      value: '',
    },
    {
      label: 'Last Donate Date',
      value: '',
    },
  ];

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={RED}
        barStyle="light-content"
      />

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={handleHome}>
          <MaterialCommunityIcons
            name="home-outline"
            size={19}
            color={RED}
          />
        </TouchableOpacity>
      </View>

      {/* ================= SCROLL CONTENT ================= */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ================= PROFILE CARD ================= */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account"
              size={38}
              color="#1976D2"
            />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Priyanka
            </Text>

            <Text style={styles.profileId}>
              ID : BS-01106786
            </Text>
          </View>

          <TouchableOpacity
            style={styles.smallEditButton}
            activeOpacity={0.8}
            onPress={handleEditProfile}>
            <MaterialCommunityIcons
              name="pencil"
              size={12}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* ================= PERSONAL DETAILS ================= */}
        <View style={styles.detailsCard}>
          {personalDetails.map((item, index) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.value}
              last={
                index === personalDetails.length - 1
              }
            />
          ))}
        </View>

        {/* ================= ADDRESS DETAILS ================= */}
        <View style={styles.detailsCard}>
          {addressDetails.map((item, index) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.value}
              last={
                index === addressDetails.length - 1
              }
            />
          ))}
        </View>

        {/* ================= DONOR DETAILS ================= */}
        <View style={styles.detailsCard}>

          {/* Are You Donor */}
          <View style={styles.donorRow}>
            <Text style={styles.label}>
              Are you Donor?
            </Text>

            <View style={styles.radioContainer}>

              {/* YES */}
              <TouchableOpacity
                style={styles.radioItem}
                activeOpacity={0.8}
                onPress={() => setIsDonor(true)}>

                <View
                  style={[
                    styles.radioBox,
                    isDonor &&
                      styles.radioBoxSelected,
                  ]}>
                  {isDonor && (
                    <View style={styles.radioFill} />
                  )}
                </View>

                <Text style={styles.radioText}>
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO */}
              <TouchableOpacity
                style={styles.radioItem}
                activeOpacity={0.8}
                onPress={() => setIsDonor(false)}>

                <View
                  style={[
                    styles.radioBox,
                    !isDonor &&
                      styles.radioBoxSelected,
                  ]}>
                  {!isDonor && (
                    <View style={styles.radioFill} />
                  )}
                </View>

                <Text style={styles.radioText}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {donorDetails.map((item, index) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.value}
              last={
                index === donorDetails.length - 1
              }
            />
          ))}
        </View>

        {/* ================= EDIT PROFILE BUTTON ================= */}
        <View style={styles.bottomCard}>
          <TouchableOpacity
            style={styles.editProfileButton}
            activeOpacity={0.85}
            onPress={handleEditProfile}>

            <MaterialCommunityIcons
              name="square-edit-outline"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.editProfileText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type DetailRowProps = {
  label: string;
  value?: string;
  last?: boolean;
};

const DetailRow = ({
  label,
  value,
  last = false,
}: DetailRowProps) => {
  return (
    <View
      style={[
        styles.detailRow,
        last && styles.lastRow,
      ]}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.value}>
        {value}
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ================= HEADER ================= */

  header: {
    height: 51,
    backgroundColor: RED,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,

    elevation: 4,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  backButton: {
    width: 30,
    height: 40,

    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 15,
    fontWeight: '600',

    marginLeft: 2,
  },

  homeButton: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  scrollContent: {
    paddingBottom: 15,
  },

  /* ================= PROFILE CARD ================= */

  profileCard: {
    minHeight: 95,

    backgroundColor: '#C90032',

    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  avatar: {
    width: 61,
    height: 61,

    borderRadius: 31,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#F5A623',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 13,
  },

  profileName: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '700',

    marginBottom: 4,
  },

  profileId: {
    color: '#FFFFFF',

    fontSize: 11,
    fontWeight: '400',
  },

  smallEditButton: {
    width: 36,
    height: 25,

    borderRadius: 15,

    backgroundColor: RED,

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= DETAILS CARD ================= */

  detailsCard: {
    backgroundColor: '#FFFFFF',

    marginTop: 12,

    // Left and Right Space
    marginHorizontal: 10,

    borderRadius: 13,

    borderWidth: 1,
    borderColor: BORDER,

    overflow: 'hidden',

    elevation: 1,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  detailRow: {
    minHeight: 51,

    paddingHorizontal: 13,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  label: {
    color: '#9599A2',

    fontSize: 11,
    fontWeight: '400',
  },

  value: {
    flex: 1,

    marginLeft: 20,

    textAlign: 'right',

    color: '#3C3C3C',

    fontSize: 12,
    fontWeight: '600',
  },

  /* ================= DONOR ================= */

  donorRow: {
    minHeight: 52,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 13,

    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 16,
  },

  radioBox: {
    width: 20,
    height: 20,

    borderWidth: 1.5,
    borderColor: '#FF4C75',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFFFFF',
  },

  radioBoxSelected: {
    borderColor: RED,
  },

  radioFill: {
    width: 12,
    height: 12,

    backgroundColor: RED,
  },

  radioText: {
    fontSize: 11,

    color: '#333333',

    marginLeft: 6,
  },

  /* ================= BOTTOM CARD ================= */

  bottomCard: {
    // Same left/right space as other cards
    marginHorizontal: 10,

    marginTop: 12,

    padding: 8,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: BORDER,

    borderRadius: 13,

    elevation: 1,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  /* ================= EDIT PROFILE BUTTON ================= */

  editProfileButton: {
    height: 43,

    backgroundColor: RED,

    borderRadius: 6,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 13,
  },

  editProfileText: {
    flex: 1,

    textAlign: 'right',

    color: '#FFFFFF',

    fontSize: 12,
    fontWeight: '600',
  },
});