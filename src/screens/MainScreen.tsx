import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainStackNavigator from '../navigation/MainStackNavigator';

const RootStack = createStackNavigator();

const MainScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};

export default MainScreen;
