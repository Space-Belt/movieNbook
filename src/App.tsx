import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import MainScreen from './screens/MainScreen';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

export default App;
