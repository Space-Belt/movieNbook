import {atom} from 'recoil';

export interface IUserInfo {
  id?: number;
  email?: string;
  user_name?: string;
  profileImage?: string;
}

const initialUserInfo: IUserInfo = {
  id: undefined,
  email: undefined,
  user_name: undefined,
  profileImage: undefined,
};

export const userInfoState = atom<IUserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
