import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import {StyleSheet} from 'react-native';
import useBackPressHandler from '../hooks/useBackPressHandler';
import EditProfileScreen from '../screens/EditProfileScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import BottomTabNavigator, {BottomTabParamList} from './BottomTabNavigator';

export type MainStackParamList = {
  BottomTab: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  MovieDetailScreen: {movieId: number};
  EditProfileScreen: undefined;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  useBackPressHandler();

  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomTab">
      <MainStack.Screen name="BottomTab" component={BottomTabNavigator} />
      <MainStack.Screen
        name="MovieDetailScreen"
        component={MovieDetailScreen}
      />
      <MainStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
