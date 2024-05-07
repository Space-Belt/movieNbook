import {useRecoilState} from 'recoil';
import {toastContent, toastVisibility} from '../../recoil/ToastStore';

export const useToast = () => {
  const [toastMessage, setToastMessage] = useRecoilState(toastContent);
  const [isVisible, setIsVisible] = useRecoilState(toastVisibility);

  const showToast = (message: string, type: string) => {
    setToastMessage({
      message: message,
      type: type,
    });
    setIsVisible(true);

    setTimeout(() => {
      setToastMessage({message: '', type: ''});
      setIsVisible(false);
    }, 2300);
  };

  return {showToast, isVisible};
};
