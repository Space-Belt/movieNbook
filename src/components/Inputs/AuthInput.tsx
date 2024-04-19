import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {BORDERRADIUS, COLORS, FONTSIZE} from '../../theme/theme';
import {SvgProps} from 'react-native-svg';

type Props = {
  value: any;
  // icon: React.FC<SvgProps>;
  icon: React.ReactElement;
  setValue: Dispatch<SetStateAction<any>>;
  placeholder: string;
  type: KeyboardTypeOptions | undefined;
  secureTextEntry: boolean;

  regex?: RegExp;
};

const AuthInput = ({
  value,
  icon,
  setValue,
  placeholder,
  type,
  secureTextEntry,

  regex,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const focusStyle: StyleProp<TextStyle> = {
    borderColor: '#FF5524',
  };

  return (
    <View style={[styles.inputWrapper, isFocused && focusStyle]}>
      {icon}
      <TextInput
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        keyboardType={type}
        placeholder={placeholder}
        placeholderTextColor={COLORS.Grey}
        style={styles.textInputStyle}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    color: COLORS.White,
    marginLeft: 10,
    fontSize: FONTSIZE.size_12,
  },
  inputWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: BORDERRADIUS.radius_15,
    height: 50,
  },
});