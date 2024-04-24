import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const useCheckAuth = () => {
  const [checkLogin, setCheckLogin] = React.useState<boolean>(false);

  // const {getItem} = useAsyncStorage('accessToken')

  const checkIsLogin = async () => {
    const result = await AsyncStorage.getItem('accessToken');
    if (result !== null || result !== undefined) {
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
  };

  React.useEffect(() => {
    checkIsLogin();
  }, []);

  return checkLogin;
};
