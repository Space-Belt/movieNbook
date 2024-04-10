import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, FONTSIZE} from '../theme/theme';

interface Props {
  title: string;
}

const CategoryHeader = ({title}: Props) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '700',
    color: COLORS.White,
  },
});
