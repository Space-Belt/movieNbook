import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';
import MovieDetailScreen from './MovieDetailScreen';

export type RootStackParamList = {
  MovieDetailScreen: {movieId: number};
  BottomTabNavigator: undefined;
  MainStackNavigator: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const checkLogin = () => {
    return true;
  };
  React.useEffect(() => {
    setIsLoggedIn(checkLogin());
  }, []);
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen
          name="MainStackNavigator"
          component={MainStackNavigator}
        />
      ) : (
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
      )}
    </RootStack.Navigator>
  );
};

export default MainScreen;
