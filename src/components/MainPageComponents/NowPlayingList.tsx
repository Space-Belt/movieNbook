import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IMovie} from '../../api/apiMovie';
import NowPlayingCard from './NowPlayingCard';

type props = {
  data: IMovie[];
};

const windowWidth = Dimensions.get('window').width;

const NowPlayingList = ({data}: props) => {
  const renderItem = ({item}: {item: IMovie}) => {
    return <NowPlayingCard item={item} handleCardClicked={() => {}} />;
  };

  const keyExtractor = (item: IMovie) => {
    return `${item.id}`;
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Number(windowWidth)}
        itemWidth={Number(windowWidth) * 0.8}
        keyExtractor={keyExtractor}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.5}
        initialNumToRender={1}
        layout={'default'}
        loop={true}
      />
    </View>
  );
};

export default NowPlayingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
