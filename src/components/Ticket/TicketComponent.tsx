import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {baseImagePath} from '../../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import DashedLine from 'react-native-dashed-line';
import CustomIcon from '../icons/CustomIcon';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';

type Props = {};

const TicketComponent = (props: Props) => {
  const poster = baseImagePath('w185', '/cxevDYdeFkiixRShbObdwAHBZry.jpg');

  return (
    <View style={styles.ticketWrapper}>
      <ImageBackground source={{uri: poster}} style={styles.ticketBGImage}>
        <LinearGradient
          colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
          style={styles.linearGradient}></LinearGradient>
      </ImageBackground>

      <DashedLine
        dashLength={15}
        dashThickness={1}
        dashGap={5}
        dashColor={COLORS.Black}
        style={styles.dashedLine}
      />

      <View style={styles.ticketBottom}>
        <View style={styles.textBox}>
          <View>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.dateText}>18</Text>
              <Text style={styles.mediumSubText}>Mon</Text>
            </View>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.dateText}>18</Text>
              <Text style={styles.mediumSubText}>Mon</Text>
            </View>
          </View>
          <View>
            <View style={styles.movieInfoTextWrapper}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.runtimeText}>
                {/* {Math.floor(movieData?.runtime / 60)}h{' '}
                {Math.floor(movieData?.runtime % 60)}m */}
                02:40
              </Text>
            </View>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.dateText}>18</Text>
              <Text style={styles.mediumSubText}>Mon</Text>
            </View>
          </View>
        </View>
        <FastImage
          source={ImageAssets.barcodeImage}
          style={styles.barcodeStyle}
        />
      </View>
    </View>
  );
};

export default TicketComponent;

const styles = StyleSheet.create({
  ticketWrapper: {
    marginTop: 35,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 2 / 3,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  dashedLine: {
    backgroundColor: COLORS.Orange,
  },
  leftBlackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
    position: 'absolute',
    bottom: -40,
    left: -40,
  },
  rightBlackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
    position: 'absolute',
    bottom: -40,
    right: -40,
  },
  ticketBottom: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  leftTopBlackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
    position: 'absolute',
    top: -40,
    left: -40,
  },
  rightTopBlackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
    position: 'absolute',
    top: -40,
    right: -40,
  },
  movieInfoTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  dateText: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  mediumSubText: {
    fontSize: 12,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  barcodeStyle: {
    height: 50,
    aspectRatio: 156 / 50,
  },
});
