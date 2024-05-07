import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';
import MainScreen from './screens/MainScreen';
import ToastMessage from './components/ToastMessage/ToastMessage';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <MainScreen />
          <ToastMessage />
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
