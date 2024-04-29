import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/theme';
import ProfileHeader from '../components/Profile/ProfileHeader';
import EmptyResult from '../components/EmptyResult';
import TicketComponent from '../components/Ticket/TicketComponent';

const TicketScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ProfileHeader title={'My Tickets'} closeBtnVisible={true} />
        {/* <EmptyResult noticeContent={`You Don't Have Any Tickets`} /> */}

        <TicketComponent />
      </SafeAreaView>
    </ScrollView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
