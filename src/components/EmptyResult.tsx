import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Empty from '../assets/images/empty.svg';
import {COLORS, FONTSIZE} from '../theme/theme';

type Props = {
  noticeContent: string;
};

const EmptyResult = ({noticeContent}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconArrangement}>
        <Empty style={styles.iconStyle} />
        <Text style={styles.textStyle}>{noticeContent}</Text>
      </View>
    </View>
  );
};

export default EmptyResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  textStyle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginTop: 15,
  },
  iconArrangement: {
    alignItems: 'center',
  },
});
