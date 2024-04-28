import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/theme';

const TicketScreen = () => {
  return <View style={styles.container}></View>;
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
