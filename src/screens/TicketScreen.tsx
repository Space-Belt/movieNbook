import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ProfileHeader from '../components/Profile/ProfileHeader';
import TicketComponent from '../components/Ticket/TicketComponent';
import {COLORS} from '../theme/theme';

const TicketScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ProfileHeader title={'My Tickets'} closeBtnVisible={false} />
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
