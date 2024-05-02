import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IMovie} from '../../api/apiMovie';
import NowPlayingCard from './NowPlayingCard';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../screens/MainScreen';
// import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  data: IMovie[];
};

const windowWidth = Dimensions.get('window').width;

type MovieProps = StackNavigationProp<RootStackParamList, 'MovieDetailScreen'>;

const NowPlayingList = ({data}: Props) => {
  const navigation = useNavigation<MovieProps>();
  const handleCardClicked = (id: number) => {
    navigation.navigate('MovieDetailScreen', {
      movieId: id,
    });
  };

  const renderItem = ({item}: {item: IMovie}) => {
    return (
      <NowPlayingCard
        item={item}
        handleCardClicked={() => handleCardClicked(item.id)}
      />
    );
  };

  const keyExtractor = (item: IMovie, index: number) => {
    return `${item.id}-${item.original_title}-${index}`;
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Number(windowWidth)}
        inactiveSlideScale={0.87}
        itemWidth={266}
        keyExtractor={(item, index) => keyExtractor(item, index)}
        initialNumToRender={3}
        layout={'default'}
        loop={true}
      />
    </View>
  );
};

export default NowPlayingList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
