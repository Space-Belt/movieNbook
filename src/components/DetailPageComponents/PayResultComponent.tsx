import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import ProfileHeader from '../Profile/ProfileHeader';
import SuccessIcon from '../../assets/images/paySuccess.svg';
import {useNavigation} from '@react-navigation/native';
import BasicWrapper from '../BasicWrapper';

type Props = {
  handleGoBack: () => void;
  setPage: Dispatch<SetStateAction<number>>;
};

const PayResultComponent = ({handleGoBack, setPage}: Props) => {
  const navigation = useNavigation();
  return (
    <BasicWrapper>
      <View style={styles.container}>
        <ProfileHeader
          closeBtnVisible={true}
          title=""
          handleGoBack={handleGoBack}
        />
        <View style={styles.centerBox}>
          <SuccessIcon />
          <Text style={styles.infoText}>Thank you!</Text>
          <Text style={styles.infoText}>your order is confirmed</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Ticket' as never);
          }}
          style={styles.btnStyle}>
          <Text style={styles.buttonText}>SUCCESS</Text>
        </TouchableOpacity>
      </View>
    </BasicWrapper>
  );
};

export default PayResultComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'space-between',
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  btnStyle: {
    backgroundColor: COLORS.Orange,
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
