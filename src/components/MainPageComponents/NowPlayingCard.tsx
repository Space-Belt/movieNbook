import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMovie} from '../../api/apiMovie';
import {baseImagePath} from '../../api/apicalls';
import {width} from '../../screens/HomeScreen';
import {BORDERRADIUS, COLORS} from '../../theme/theme';

type props = {
  item: IMovie;
  handleCardClicked: (args: number) => void;
};

const NowPlayingCard = ({item, handleCardClicked}: props) => {
  return (
    <TouchableOpacity onPress={() => handleCardClicked(item.id)}>
      <View style={styles.container}>
        <FastImage
          source={{uri: baseImagePath('w780', item.poster_path)}}
          style={styles.imageStyle}
        />

        <Text style={styles.titleText}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NowPlayingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  imageStyle: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
    width: width * 0.7,
    resizeMode: 'cover',
  },

  titleText: {
    color: COLORS.White,
  },
});
