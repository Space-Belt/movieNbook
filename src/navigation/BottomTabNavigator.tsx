// import {COLORS} from "../theme/theme";
// import CustomIcon from '../components/icons/CustomIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {StyleSheet, View} from 'react-native';
import CustomIcon from '../components/icons/CustomIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserScreen from '../screens/UserScreen';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const Tab = createBottomTabNavigator();

const tabBarIconRendering = (name: string, focused: boolean) => {
  return (
    <View
      style={[
        styles.activeTabBackground,
        focused ? {backgroundColor: COLORS.Orange} : {},
      ]}>
      <CustomIcon name={name} color={COLORS.White} size={FONTSIZE.size_30} />
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return tabBarIconRendering('video', focused);
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return tabBarIconRendering('search', focused);
          },
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return tabBarIconRendering('ticket', focused);
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarShowLabel: false,

          tabBarIcon: ({focused, color, size}) => {
            return tabBarIconRendering('user', focused);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default BottomTabNavigator;
