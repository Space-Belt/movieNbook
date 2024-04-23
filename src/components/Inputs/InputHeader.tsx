import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../icons/CustomIcon';

interface Props {
  handleDelete: () => void;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const InputHeader = ({handleDelete, searchText, setSearchText}: Props) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        value={searchText}
        onChangeText={textInput => setSearchText(textInput)}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={handleDelete}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
  searchedText: {
    color: COLORS.White,
  },
});
