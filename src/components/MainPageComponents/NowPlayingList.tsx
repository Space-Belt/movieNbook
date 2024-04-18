import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IMovie} from '../../api/apiMovie';
import NowPlayingCard from './NowPlayingCard';

type Props = {
  data: IMovie[];
};

const windowWidth = Dimensions.get('window').width;

const NowPlayingList = ({data}: Props) => {
  const renderItem = ({item}: {item: IMovie}) => {
    return <NowPlayingCard item={item} handleCardClicked={() => {}} />;
  };

  const keyExtractor = (item: IMovie, index: number) => {
    return `${item.id}-${item.original_title}-${index}`;
  };

  React.useEffect(() => {
    console.log(windowWidth);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Number(windowWidth)}
        inactiveSlideScale={0.8}
        itemWidth={266}
        autoplay={true}
        autoplayDelay={1000}
        keyExtractor={(item, index) => keyExtractor(item, index)}
        initialNumToRender={2}
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
    marginTop: 30,
  },
});
