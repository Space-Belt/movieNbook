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
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.ticketWrapper}>
        <ImageBackground source={{uri: poster}} style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}></LinearGradient>
        </ImageBackground>
        <View>
          <DashedLine
            dashLength={15}
            dashThickness={1}
            dashGap={5}
            dashColor={COLORS.Black}
            style={styles.dashedLine}
          />
        </View>

        <View style={styles.ticketBottom}>
          <View style={styles.textBox}>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.dateText}>18</Text>
              <Text style={styles.mediumSubText}>Mon</Text>
            </View>
            <View style={styles.movieInfoTextWrapper}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.mediumSubText}>02:40</Text>
            </View>
          </View>

          <View style={styles.textBox}>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.rowNSeatText}>Rows</Text>
              <Text style={styles.runtimeText}>
                {/* {Math.floor(movieData?.runtime / 60)}h{' '}
                {Math.floor(movieData?.runtime % 60)}m */}
                04
              </Text>
            </View>
            <View style={styles.movieInfoTextWrapper}>
              <Text style={styles.rowNSeatText}>Seats</Text>
              <Text style={styles.mediumSubText}>24,25</Text>
            </View>
          </View>
          <FastImage
            source={ImageAssets.barcodeImage}
            style={styles.barcodeStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketComponent;

const styles = StyleSheet.create({
  ticketWrapper: {
    width: 300,
    marginTop: 35,
    justifyContent: 'center',
    overflow: 'hidden',
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
    width: 300,
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
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dateText: {
    fontSize: FONTSIZE.size_24,
    height: 40,
    fontWeight: '500',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    justifyContent: 'center',
  },
  mediumSubText: {
    fontSize: 12,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  clockIcon: {
    top: 5,
    fontSize: FONTSIZE.size_24,
    justifyContent: 'center',
    height: 40,
    color: COLORS.White,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  rowNSeatText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  barcodeStyle: {
    height: 50,
    aspectRatio: 156 / 50,
    marginTop: 25,
  },
});
