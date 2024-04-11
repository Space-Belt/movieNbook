import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {IMovie} from '../../api/apiMovie';
import NowPlayingCard from './NowPlayingCard';

type props = {
  data: IMovie[];
};

const NowPlayingList = ({data}: props) => {
  const renderItem = ({item}: {item: IMovie}) => {
    return <NowPlayingCard item={item} />;
  };

  const keyExtractor = (item: IMovie) => {
    return `${item.id}`;
  };

  React.useEffect(() => {
    console.log('dfdf');
    console.log(data);
  }, [data]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: IMovie) => keyExtractor(item)}
      horizontal={true}
    />
  );
};

export default NowPlayingList;

const styles = StyleSheet.create({});
