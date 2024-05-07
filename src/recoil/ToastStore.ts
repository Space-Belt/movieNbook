import {atom} from 'recoil';

interface IToastMessage {
  type: string;
  message: string;
}

const initialToastState: IToastMessage = {
  type: '',
  message: '',
};

export const toastContent = atom<IToastMessage>({
  key: 'toastContent',
  default: initialToastState,
});

export const toastVisibility = atom({
  key: 'toastVisibility',
  default: false,
});
