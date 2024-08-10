import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import MainStackNavigator from '../navigation/MainStackNavigator';

import {getMyInfo} from '../api/apiUser';

import {useQuery} from '@tanstack/react-query';
import {useToast} from '../components/hooks/useToast';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import {isLoggedInState} from '../recoil/Auth';
import {userInfoState} from '../recoil/User';

export type RootStackParamList = {
  MovieDetailScreen: {movieId: number};
  AuthStackNavigator: undefined;
  SignInScreen: undefined;
  BottomTabNavigator: undefined;
  MainStackNavigator: undefined;
  SignUpScreen: undefined;
  BottomTab: undefined;
  EditProfileScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setIsMyInfo = useSetRecoilState(userInfoState);

  const {showToast} = useToast();

  const {data: myInfoResponse} = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });

  React.useEffect(() => {
    const currentTime = new Date().getTime();

    const checkIsLogin = async () => {
      const tokenResult = await AsyncStorage.getItem('accessToken');
      const tokenExpired = await AsyncStorage.getItem('tokenExpired');

      if (tokenResult && tokenExpired) {
        if (currentTime < parseInt(tokenExpired)) {
          setIsLoggedIn(true);
          showToast('Login Success', 'success');
        } else {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('expiryTime');
          setIsLoggedIn(false);
          showToast('Login Failed', 'error');
        }
      } else {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('expiryTime');
        setIsLoggedIn(false);
      }
    };

    checkIsLogin();
  }, []);

  React.useEffect(() => {
    if (!myInfoResponse) return;

    const {id, email, user_name, profileImage} = myInfoResponse;

    setIsMyInfo({
      id,
      email,
      user_name,
      profileImage,
    });
  }, [myInfoResponse]);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? (
        <RootStack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
        />
      ) : (
        <RootStack.Screen
          name="MainStackNavigator"
          component={MainStackNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};

export default MainScreen;
