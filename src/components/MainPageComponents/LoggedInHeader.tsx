import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const LoggedInHeader = () => {
  const [userName, setMyUserName] = React.useState<string>('Hoon Park');

  React.useEffect(() => {}, []);
  return (
    <View style={styles.wrapper}>
      <FastImage source={ImageAssets.profileImage} style={styles.imageStyle} />
      <Text style={styles.textStyle}>Welcome {userName}!</Text>
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
    resizeMode: 'cover',
    marginRight: 10,
  },
  textStyle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});