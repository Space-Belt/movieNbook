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

export type RootStackParamList = {
  MovieDetailScreen: {movieId: number};
  BottomTabNavigator: undefined;
  MainStackNavigator: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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
