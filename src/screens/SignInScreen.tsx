import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import KeyIcon from '../assets/images/key.svg';
import UserIcon from '../assets/images/user.svg';

import {useNavigation} from '@react-navigation/native';
import {ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSetRecoilState} from 'recoil';
import {signIn} from '../api/apiAuth';
import AuthInput from '../components/Inputs/AuthInput';
import {isLoggedInState} from '../recoil/Auth';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import BasicWrapper from '../components/BasicWrapper';

const SignInScreen = () => {
  const navigation = useNavigation();

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');

  const isFilled: boolean = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    const result = await signIn(email, password);
    if (result === 201) {
      setIsLoggedIn(true);
      navigation.navigate('BottomTab' as never);
    } else {
      setIsLoggedIn(false);
    }
  };

  const filledStyle: StyleProp<ViewStyle> = {
    backgroundColor: isFilled ? '#FF5524' : '#333',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.signInText}>Sign In</Text>
        <AuthInput
          icon={<UserIcon />}
          value={email}
          setValue={setEmail}
          placeholder={'Email'}
          type={'email-address'}
          secureTextEntry={false}
        />
        <AuthInput
          icon={<KeyIcon />}
          value={password}
          setValue={setPassword}
          placeholder={'Password'}
          type={'default'}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.buttonStyle, filledStyle]}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUpScreen' as never);
          }}
          style={styles.signUpBtn}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingHorizontal: 25,
  },
  viewContainer: {
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 25,
  },
  inputWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: BORDERRADIUS.radius_15,
    height: 50,
  },
  signInText: {
    marginTop: 40,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  textInputStyle: {
    color: COLORS.White,
    marginLeft: 10,
    fontSize: FONTSIZE.size_12,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 50,
    backgroundColor: COLORS.Grey,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    color: COLORS.White,
  },
  signUpBtn: {
    backgroundColor: '#E1CD17',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 20,

    borderRadius: BORDERRADIUS.radius_20,
  },
});
