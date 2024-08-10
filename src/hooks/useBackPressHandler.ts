import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {navigationRef} from '../lib/navigation';

const useBackPressHandler = () => {
  const onBackPress = React.useCallback(() => {
    if (
      navigationRef.getCurrentRoute()?.name === 'Home' ||
      navigationRef.getCurrentRoute()?.name === 'SignInScreen'
    ) {
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
  }, []);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);
};

export default useBackPressHandler;
