import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../recoil/User';

const LoggedInHeader = () => {
  const myInfo = useRecoilValue(userInfoState);

  React.useEffect(() => {}, []);

  return (
    <View style={styles.wrapper}>
      <FastImage
        source={{uri: myInfo.profileImage}}
        style={styles.imageStyle}
      />
      <Text style={styles.textStyle}>{myInfo.user_name} 님! 반가워요👋 </Text>
    </View>
  );
};

export default LoggedInHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  imageStyle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    resizeMode: 'cover',
    marginRight: 10,
  },
  textStyle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
