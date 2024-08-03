import {Platform} from 'react-native';

export const getPlatform = () => {
  const answer = Platform.OS === 'ios' ? true : false;
  return answer;
};
