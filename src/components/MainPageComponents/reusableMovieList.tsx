import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IMovie} from '../../api/apiMovie';

type props = {
  renderItem: React.ReactElement;
  data: any;
};

const reusableMovieList = ({data}: props) => {
  const keyExtractor = item => {
    return `${item}`;
  };
  const renderItem = item => {
    return <View></View>;
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: IMovie) => keyExtractor(item)}
        horizontal={true}
      />
    </View>
  );
};

export default reusableMovieList;

const styles = StyleSheet.create({});
