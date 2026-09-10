import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RED = '#ec003b';

const DonorsScreen = ({navigation}: any) => {
  const goHome = () => navigation.getParent()?.navigate('Home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={goHome} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blood Donors</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={goHome} style={styles.homeButton}>
          <Ionicons name="home-outline" size={22} color={RED} />
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('BloodDonors')} style={[styles.optionCard, styles.donorsCard]}>
          <Ionicons name="hand-left" size={28} color="#ffffff" />
          <Text style={styles.optionText}>Blood Donors</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('BloodRecipients')} style={[styles.optionCard, styles.recipientsCard]}>
          <Ionicons name="person" size={27} color="#ffffff" />
          <Text style={styles.optionText}>Blood Recipients</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  header: {height: 42, paddingHorizontal: 8, backgroundColor: RED, flexDirection: 'row', alignItems: 'center'},
  backButton: {width: 26, height: 36, alignItems: 'center', justifyContent: 'center'},
  headerTitle: {flex: 1, marginLeft: 4, color: '#ffffff', fontSize: 14, fontWeight: '500'},
  homeButton: {width: 30, height: 30, borderRadius: 15, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'},
  options: {flexDirection: 'row', paddingHorizontal: 9, paddingTop: 12, gap: 21},
  optionCard: {flex: 1, height: 72, borderRadius: 10, alignItems: 'center', justifyContent: 'center', elevation: 8, shadowColor: '#000000', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.14, shadowRadius: 9},
  donorsCard: {backgroundColor: '#fa174c'},
  recipientsCard: {backgroundColor: '#287aba'},
  optionText: {marginTop: 5, color: '#ffffff', fontSize: 12, fontWeight: '600'},
});

export default DonorsScreen;
