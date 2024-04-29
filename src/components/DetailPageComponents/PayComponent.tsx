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
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import CardChip from '../../assets/images/cardChip.svg';
import Visa from '../../assets/images/visa.svg';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  handleGoBack: () => void;
};

const PayComponent = ({handleGoBack}: Props) => {
  const [selectedCard, setSelectedCard] = React.useState<number>();

  const selectedCardStyle: StyleProp<ViewStyle> = {
    borderColor: selectedCard === 0 ? 'red' : '#262B33',
  };
  return (
    <View style={styles.container}>
      <ProfileHeader
        closeBtnVisible={true}
        title=""
        handleGoBack={handleGoBack}
      />

      <View style={[styles.cardWrapper, selectedCardStyle]}>
        <Text style={styles.selectCardText}>Select Card</Text>
        <LinearGradient
          colors={['#262B33', '#0C0F14']}
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
    </View>
  );
};

export default PayComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  linearGradient: {
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 186,
    borderRadius: 15,
    justifyContent: 'space-between',
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
});
