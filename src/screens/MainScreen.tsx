import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';
import MovieDetailScreen from './MovieDetailScreen';
import {useCheckAuth} from '../components/hooks/useCheckAuth';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState, useRecoilValue} from 'recoil';
import {isLoggedInState} from '../recoil/auth';
import {getMyInfo} from '../api/apiUser';
import {userInfoState} from '../recoil/User';

export type RootStackParamList = {
  MovieDetailScreen: {movieId: number};
  BottomTabNavigator: undefined;
  MainStackNavigator: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isMyInfo, setIsMyInfo] = useRecoilState(userInfoState);

  React.useEffect(() => {
    const checkIsLogin = async () => {
      const result = await AsyncStorage.getItem('accessToken');
      if (result) {
        setIsLoggedIn(true);
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
        id: result.id,
        email: result.email,
        user_name: result.user_name,
        profileImage: result.profileImage,
      });
    };
    getInfo();
  }, []);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <RootStack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <RootStack.Screen
            name="MovieDetailScreen"
            component={MovieDetailScreen}
          />
        </>
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
