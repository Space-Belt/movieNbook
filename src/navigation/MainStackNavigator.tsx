import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {Alert, BackHandler, StyleSheet} from 'react-native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import {RootStackParamList} from '../screens/MainScreen';
import {navigationRef} from '../lib/navigation';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  React.useEffect(() => {
    const handleBackPress = () => {
      if (navigationRef.getCurrentRoute()?.name === 'Home') {
        Alert.alert('잠깐!!', '정말 앱을 종료하시겠어요?', [
          {
            text: '취소',
            onPress: () => null,
            style: 'cancel',
          },
          {text: '나가기', onPress: () => BackHandler.exitApp()},
        ]);
      } else {
        navigationRef.goBack();
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', () => handleBackPress());

    return BackHandler.removeEventListener('hardwareBackPress', () =>
      handleBackPress(),
    );
  }, []);

  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      <MainStack.Screen name="SignInScreen" component={SignInScreen} />
      <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
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
