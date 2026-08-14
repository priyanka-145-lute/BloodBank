import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const RED = '#F0003C';
const DARK_RED = '#D80032';
const LIGHT_RED = '#FFF4F7';
const BORDER_COLOR = '#F193AA';

const banners = [
  require('../../assets/Banner1.jpg'),
  require('../../assets/Banner2.jpg'),
  require('../../assets/Banner3.jpg'),
  require('../../assets/Banner4.jpg'),
];

const urgentRequirements = [
  {
    id: '1',
    name: 'Rahul Sharma',
    bloodGroup: 'O+',
    units: 2,
    date: '09-03-2026',
    address: 'MG Road, Near Fortune Mall, Nagpur',
  },
  {
    id: '2',
    name: 'Amit Patil',
    bloodGroup: 'B+',
    units: 1,
    date: '10-03-2026',
    address: 'Shivaji Nagar, Pune',
  },
  {
    id: '3',
    name: 'Priya Singh',
    bloodGroup: 'A-',
    units: 2,
    date: '11-03-2026',
    address: 'Hadapsar, Pune',
  },
];

const emergencyServices = [
  {id: '1', title: 'Blood Banks', image: require('../../assets/bloodbanks.png'), route: 'BloodBanks'},
  {id: '2', title: 'Ambulance', image: require('../../assets/ambulance.png'), route: 'Ambulance'},
  {id: '3', title: 'Pharmacy', image: require('../../assets/pharmacy.png'), route: 'Pharmacy'},
  {id: '4', title: 'Radiology', image: require('../../assets/radiology.png'), route: 'Radiology'},
  {id: '5', title: 'Pathology', image: require('../../assets/pathology.png'), route: 'Pathology'},
  {id: '6', title: 'Hospital', image: require('../../assets/hospital.png'), route: 'Hospital'},
];

const HOME_IMAGES = {
  menu: require('../../assets/menu.png'),
  notification: require('../../assets/notification.png'),
  donateBlood: require('../../assets/blood-donation.png'),
  requestBlood: require('../../assets/bloodRequest.png'),
};

type HomeScreenProps = {
  navigation: {
    navigate: (screenName: string) => void;
    openDrawer?: () => void;
  };
};

type Banner = (typeof banners)[number];
type UrgentRequirement = (typeof urgentRequirements)[number];

type EmergencyItemProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

const BannerSeparator = () => <View style={styles.bannerSeparator} />;
const RequirementSeparator = () => <View style={styles.requirementSeparator} />;

const EmergencyItem = ({title, image, onPress}: EmergencyItemProps) => (
  <TouchableOpacity
    activeOpacity={0.75}
    style={styles.emergencyItem}
    onPress={onPress}>
    <View style={styles.emergencyIconContainer}>
      <Image source={image} resizeMode="contain" style={styles.emergencyIcon} />
    </View>
    <Text numberOfLines={1} style={styles.emergencyItemText}>
      {title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {width} = useWindowDimensions();
  const bannerWidth = width - 24;
  const bannerStep = width;
  const requirementViewportWidth = width - 14;
  const requirementWidth = requirementViewportWidth - 36;
  const bannerRef = useRef<FlatList<Banner>>(null);
  const requirementRef = useRef<FlatList<UrgentRequirement>>(null);
  const bannerIndexRef = useRef(0);
  const requirementIndexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (bannerIndexRef.current + 1) % banners.length;
      bannerIndexRef.current = nextIndex;
      bannerRef.current?.scrollToOffset({
        offset: nextIndex * bannerStep,
        animated: true,
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [bannerStep]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex =
        (requirementIndexRef.current + 1) % urgentRequirements.length;
      requirementIndexRef.current = nextIndex;
      requirementRef.current?.scrollToOffset({
        offset: nextIndex * requirementViewportWidth,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [requirementViewportWidth]);

  const navigateTo = (screenName: string) => navigation.navigate(screenName);

  const renderBanner = ({item}: ListRenderItemInfo<Banner>) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.bannerContainer, {width: bannerWidth}]}
      onPress={() => navigateTo('DonateBlood')}>
      <Image source={item} resizeMode="stretch" style={styles.bannerImage} />
    </TouchableOpacity>
  );

  const renderRequirement = ({item}: ListRenderItemInfo<UrgentRequirement>) => (
    <View style={[styles.requirementCard, {width: requirementWidth}]}>
      <View style={styles.requirementTopRow}>
        <Text numberOfLines={1} style={styles.patientName}>
          {item.name}
        </Text>
        <View style={styles.bloodGroupBadge}>
          <Text style={styles.bloodGroupText}>{item.bloodGroup}</Text>
        </View>
      </View>

      <View style={styles.requirementInformationRow}>
        <View style={styles.informationBox}>
          <Text style={styles.informationMarker}>♦</Text>
          <Text style={styles.informationText}>Unit : {item.units}</Text>
        </View>
        <View style={styles.informationBox}>
          <Text style={styles.informationMarker}>□</Text>
          <Text style={styles.informationText}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Text style={styles.locationMarker}>⌖</Text>
        <Text numberOfLines={1} style={styles.locationText}>
          {item.address}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar backgroundColor={DARK_RED} barStyle="light-content" />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerIconButton}
            onPress={() => navigation.openDrawer?.()}>
            <Image source={HOME_IMAGES.menu} resizeMode="contain" style={styles.menuImage} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.notificationButton}
            onPress={() => navigateTo('Notifications')}>
            <Image
              source={HOME_IMAGES.notification}
              resizeMode="contain"
              style={styles.notificationImage}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <FlatList
            ref={bannerRef}
            data={banners}
            horizontal
            bounces={false}
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `banner-${index}`}
            renderItem={renderBanner}
            ItemSeparatorComponent={BannerSeparator}
            contentContainerStyle={styles.bannerListContent}
            snapToInterval={bannerStep}
            snapToAlignment="start"
            decelerationRate="fast"
            onMomentumScrollEnd={event => {
              bannerIndexRef.current = Math.round(
                event.nativeEvent.contentOffset.x / bannerStep,
              );
            }}
          />

          <View style={styles.primaryActionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryActionCard}
              onPress={() => navigateTo('DonateBlood')}>
              <Image
                source={HOME_IMAGES.donateBlood}
                resizeMode="contain"
                style={styles.primaryActionImage}
              />
              <Text style={styles.primaryActionText}>Donate Blood</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryActionCard}
              onPress={() => navigateTo('RequestBlood')}>
              <Image
                source={HOME_IMAGES.requestBlood}
                resizeMode="contain"
                style={styles.primaryActionImage}
              />
              <Text style={styles.primaryActionText}>Request for Blood</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Urgent Requirements</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigateTo('EmergencyRequirements')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              ref={requirementRef}
              data={urgentRequirements}
              horizontal
              bounces={false}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderRequirement}
              ItemSeparatorComponent={RequirementSeparator}
              contentContainerStyle={styles.requirementListContent}
              snapToInterval={requirementViewportWidth}
              snapToAlignment="start"
              decelerationRate="fast"
              onMomentumScrollEnd={event => {
                requirementIndexRef.current = Math.round(
                  event.nativeEvent.contentOffset.x / requirementViewportWidth,
                );
              }}
            />
          </View>

          <View style={styles.emergencySection}>
            <Text style={styles.emergencySectionTitle}>Emergency Helps</Text>
            <View style={styles.emergencyGrid}>
              {emergencyServices.map(item => (
                <EmergencyItem
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  onPress={() => navigateTo(item.route)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: RED},
  mainContainer: {flex: 1, backgroundColor: '#ffffff'},
  header: {height: 52, backgroundColor: RED, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12},
  headerIconButton: {width: 40, height: 42, alignItems: 'flex-start', justifyContent: 'center'},
  menuImage: {width: 35, height: 35,tintColor: '#FFFFFF'},
  notificationButton: {width: 34, height: 34, borderRadius: 17,  alignItems: 'center', justifyContent: 'center'},
  notificationImage: {width: 34, height: 34},
  scrollContent: {paddingBottom: 24},
  bannerListContent: {paddingHorizontal: 12, paddingTop: 12},
  bannerSeparator: {width: 24},
  bannerContainer: {height: 170, backgroundColor: '#FFFFFF', borderRadius: 9, overflow: 'hidden', borderWidth: 1, borderColor: '#E04A5F'},
  bannerImage: {width: '100%', height: '100%'},
  primaryActionsRow: {flexDirection: 'row', marginHorizontal: 12, marginTop: 12, columnGap: 12},
  primaryActionCard: {flex: 1, height: 95, backgroundColor: LIGHT_RED, borderWidth: 1, borderColor: BORDER_COLOR, borderRadius: 9, alignItems: 'center', justifyContent: 'center'},
  primaryActionImage: {width: 43, height: 43,backgroundColor: '#FFFFFF', borderRadius: 21, padding: 6},
  primaryActionText: {color: '#292929', fontSize: 12, fontWeight: '500', marginTop: 1},
  sectionCard: {backgroundColor: '#F8F8F8', marginHorizontal: 12, marginTop: 12, borderRadius: 4, borderWidth: 1, borderColor: '#E5E5E5', paddingTop: 12, paddingBottom: 14, overflow: 'hidden'},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 12},
  sectionTitle: {color: '#171717', fontSize: 14, fontWeight: '500'},
  viewAllText: {color: RED, fontSize: 12},
  requirementListContent: {paddingHorizontal: 15,},
  requirementSeparator: {width: 10},
  requirementCard: {minHeight: 105, paddingHorizontal: 7, paddingTop: 7, paddingBottom: 6, backgroundColor: '#FFF7F9', borderWidth: 1, borderColor: '#F2B6C3', borderRadius: 8},
  requirementTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  patientName: {flex: 1, color: '#3A3A3A', fontSize: 12, fontWeight: '600', marginRight: 8},
  bloodGroupBadge: {minWidth: 27, height: 22, paddingHorizontal: 6, backgroundColor: '#F90020', borderRadius: 5, alignItems: 'center', justifyContent: 'center'},
  bloodGroupText: {color: '#FFFFFF', fontSize: 11, fontWeight: '700'},
  requirementInformationRow: {flexDirection: 'row', alignItems: 'center', marginTop: 5, columnGap: 7},
  informationBox: {minHeight: 25, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderStyle: 'dotted', borderColor: '#E990A6', borderRadius: 4, paddingHorizontal: 5, columnGap: 4},
  informationMarker: {width: 14, color: RED, fontSize: 14, textAlign: 'center'},
  informationText: {color: '#333333', fontSize: 11, fontWeight: '500'},
  locationRow: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  locationMarker: {width: 14, color: RED, fontSize: 13, textAlign: 'center'},
  locationText: {flex: 1, color: '#555555', fontSize: 10.5, marginLeft: 3},
  emergencySection: {backgroundColor: '#FFFFFF', marginHorizontal: 12, marginTop: 12, borderRadius: 4, borderWidth: 1, borderColor: '#E5E5E5', paddingHorizontal: 12, paddingTop: 14, paddingBottom: 18},
  emergencySectionTitle: {color: '#171717', fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 14},
  emergencyGrid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14},
  emergencyItem: {width: '31%', height: 88, backgroundColor: '#FFF9FA', borderWidth: 1, borderColor: RED, borderRadius: 4, alignItems: 'center', justifyContent: 'center'},
  emergencyIconContainer: {height: 45, alignItems: 'center', justifyContent: 'center'},
  emergencyIcon: {width: 42, height: 42},
  emergencyItemText: {width: '100%', color: '#242424', fontSize: 10.5, textAlign: 'center', paddingHorizontal: 2, marginTop: 1},
});




