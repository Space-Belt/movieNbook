import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import ProfileHeader from '../Profile/ProfileHeader';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import CardChip from '../../assets/images/cardChip.svg';
import Visa from '../../assets/images/visa.svg';
import LinearGradient from 'react-native-linear-gradient';
import Wallet from '../../assets/images/wallet.svg';

type Props = {
  handleGoBack: () => void;
};

const PayComponent = ({handleGoBack}: Props) => {
  const [selectedCard, setSelectedCard] = React.useState<number>();

  const selectedCardStyle: StyleProp<ViewStyle> = {
    borderWidth: 2,
    borderColor: 'red',
  };

  const regesBtnColor: StyleProp<ViewStyle> = {
    backgroundColor: COLORS.Orange,
  };
  return (
    <View style={styles.container}>
      <View>
        <ProfileHeader
          closeBtnVisible={true}
          title=""
          handleGoBack={handleGoBack}
        />

        <View
          style={[styles.cardWrapper, selectedCard === 0 && selectedCardStyle]}>
          <Text style={styles.selectCardText}>Select Card</Text>
          <LinearGradient
            colors={['#262B33', '#0C0F14']}
            start={{x: 0, y: 90}}
            end={{x: 1, y: 90}}
            style={styles.linearGradient}>
            <TouchableOpacity
              style={styles.cardStyle}
              onPress={() => setSelectedCard(0)}>
              <View style={styles.cardTopIconWrapper}>
                <CardChip />
                <Visa />
              </View>
              <View style={styles.cardNumberTextWrapper}>
                <Text style={styles.cardNumberText}>3566</Text>
                <Text style={styles.cardNumberText}>3566</Text>
                <Text style={styles.cardNumberText}>3566</Text>
                <Text style={styles.cardNumberText}>3566</Text>
              </View>
              <View style={styles.cardBottomWrapper}>
                <View style={styles.ownerWrapper}>
                  <Text style={styles.ownerTitle}>Card Holder Name</Text>
                  <Text style={styles.ownerName}>Park Hoon Joo</Text>
                </View>
                <View style={styles.expireWrapper}>
                  <Text style={styles.expireTitle}>Expiry Date</Text>
                  <Text style={styles.expireText}>01/26</Text>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <TouchableOpacity onPress={() => setSelectedCard(1)}>
          <LinearGradient
            colors={['#262B33', '#0C0F14']}
            start={{x: 0, y: 25}}
            end={{x: 1, y: 25}}
            style={[
              styles.walletWrapper,
              selectedCard === 1 && selectedCardStyle,
            ]}>
            <View style={styles.walletLeftSide}>
              <Wallet />
              <Text style={styles.leftSideText}>Wallet</Text>
            </View>
            <Text style={styles.rightSideText}>$ 100.05</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.priceWrapper}>
          <View>
            <Text style={styles.totalPriceTitle}>Total Price</Text>
            <View style={styles.priceTextWrapper}>
              <Text style={styles.dollorSign}>$</Text>
              <Text style={styles.moneyText}>19.00</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.signUpBtn, regesBtnColor]}>
          <Text style={styles.buttonText}>Insufficient Balance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'space-between',
  },
  linearGradient: {
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 186,
    borderRadius: 15,
    // justifyContent: 'space-between',
  },
  cardWrapper: {
    borderWidth: 2,
    borderRadius: 25,
    height: 241,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#262B33',
  },
  selectCardText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
  },
  cardStyle: {
    height: '100%',
    justifyContent: 'space-between',
  },
  cardTopIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumberTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberText: {
    letterSpacing: 4,
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
    marginRight: 10,
  },
  cardBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ownerWrapper: {},
  expireWrapper: {},
  ownerTitle: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'left',
    color: '#8E9295',
  },
  ownerName: {
    fontSize: FONTSIZE.size_16,
    textAlign: 'left',
    color: COLORS.White,
    fontWeight: '600',
  },
  expireTitle: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'right',
    color: '#8E9295',
  },
  expireText: {
    fontSize: FONTSIZE.size_16,
    textAlign: 'right',
    color: COLORS.White,
    fontWeight: '600',
  },
  walletWrapper: {
    marginTop: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSideText: {
    marginLeft: 15,
    fontSize: FONTSIZE.size_14,
    fontWeight: '600',
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  rightSideText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  priceWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalPriceTitle: {
    fontSize: FONTSIZE.size_14,
    color: '#737373',
  },
  priceTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dollorSign: {
    color: COLORS.Orange,
    fontWeight: '500',
    fontSize: FONTSIZE.size_24,
    marginRight: 5,
  },
  moneyText: {
    fontWeight: '500',
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  signUpBtn: {
    backgroundColor: COLORS.Grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 20,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: '600',
  },
});
