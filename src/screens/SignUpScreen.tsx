import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import AuthInput from '../components/Inputs/AuthInput';
import KeyIcon from '../assets/images/key.svg';
import UserIcon from '../assets/images/user.svg';
import {signUp} from '../api/apiAuth';

const SignUpScreen = () => {
  const [userName, setUserName] = React.useState<string>('');
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [checkPassword, setCheckPassword] = React.useState<string>('');

  const isFilled = false;

  const filledStyle: StyleProp<ViewStyle> = {
    backgroundColor: isFilled ? '#FF5524' : '#333',
  };

  const handleSignUp = () => {
    signUp(userName, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.signInText}>회원가입</Text>
        <AuthInput
          icon={<UserIcon />}
          value={userName}
          setValue={setUserName}
          placeholder={'이름'}
          type={'default'}
          secureTextEntry={false}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <AuthInput
          icon={<UserIcon />}
          value={email}
          setValue={setEmail}
          placeholder={'이메일'}
          type={'email-address'}
          secureTextEntry={false}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <AuthInput
          icon={<KeyIcon />}
          value={password}
          setValue={setPassword}
          placeholder={'비밀번호'}
          type={'default'}
          secureTextEntry={true}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <AuthInput
          icon={<KeyIcon />}
          value={checkPassword}
          setValue={setCheckPassword}
          placeholder={'비밀번호 확인'}
          type={'default'}
          secureTextEntry={true}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <TouchableOpacity
          onPress={() => {
            handleSignUp();
          }}
          style={[styles.buttonStyle, filledStyle]}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
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
});