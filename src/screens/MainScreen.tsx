import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';

const RootStack = createStackNavigator();

const MainScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const checkLogin = () => {
    return false;
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
        <RootStack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};

export default MainScreen;
