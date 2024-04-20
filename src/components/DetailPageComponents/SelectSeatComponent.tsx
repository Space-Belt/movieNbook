import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearHeader from './LinearHeader';
import {COLORS} from '../../theme/theme';

type Props = {
  poster: string;
  handleGoBack: () => void;
};

const SelectSeatComponent = ({poster, handleGoBack}: Props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topWrapper}>
        <LinearHeader imagePath={poster} action={handleGoBack} />
      </View>
    </ScrollView>
  );
};

export default SelectSeatComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  topWrapper: {height: 471},
});
