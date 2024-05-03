import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useRecoilState} from 'recoil';
import MainStackNavigator from '../navigation/MainStackNavigator';

import {getMyInfo} from '../api/apiUser';

import {useNavigation} from '@react-navigation/native';
import {isLoggedInState} from '../recoil/Auth';
import {userInfoState} from '../recoil/User';

export type RootStackParamList = {
  MovieDetailScreen: {movieId: number};
  BottomTabNavigator: undefined;
  MainStackNavigator: undefined;
  EditProfileScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isMyInfo, setIsMyInfo] = useRecoilState(userInfoState);

  React.useEffect(() => {
    const checkIsLogin = async () => {
      const result = await AsyncStorage.getItem('accessToken');
      if (result) {
        setIsLoggedIn(true);
        navigation.navigate('BottomTab' as never);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkIsLogin();
  }, []);

  React.useEffect(() => {
    const getInfo = async () => {
      const result = await getMyInfo();
      setIsMyInfo({
        id: result?.id,
        email: result?.email,
        user_name: result?.user_name,
        profileImage: result?.profileImage,
      });
    };
    getInfo();
  }, []);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="MainStackNavigator"
        component={MainStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default MainScreen;
