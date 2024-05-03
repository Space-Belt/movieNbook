import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {baseImagePath} from '../../api/apicalls';
import {IMovie} from '../../api/apiMovie';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {MovieProps} from './NowPlayingList';

type Props = {
  item: IMovie;
};

const ReusableCard = ({item}: Props) => {
  const navigation = useNavigation<MovieProps>();
  const handleNavigate = (id: number) => {
    navigation.navigate('MovieDetailScreen', {
      movieId: id,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigate(item.id);
      }}>
      <View style={styles.imageBox}>
        <FastImage
          source={{uri: baseImagePath('w780', item.poster_path)}}
          style={styles.imageStyle}
        />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableCard;

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    width: 133,
  },
  imageStyle: {
    width: 133,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  movieTitle: {
    textAlign: 'center',
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    marginTop: 10,
  },
});
