import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputHeader from '../components/Inputs/InputHeader';
import {searchMovies} from '../api/apiMovie';

const SearchScreen = () => {
  const handleSearch = async (text: string) => {
    let result = await searchMovies(text);
    console.log(result);
  };
  return (
    <View style={styles.container}>
      <InputHeader searchFunction={handleSearch} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {},
});
