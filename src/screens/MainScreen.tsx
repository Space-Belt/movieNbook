import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const RootStack = createStackNavigator();

const MainScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
    </RootStack.Navigator>
  );
};

export default MainScreen;
