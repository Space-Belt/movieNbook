import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {IMovie} from '../../api/apiMovie';
import {COLORS, FONTSIZE} from '../../theme/theme';
import ReusableCard from './ReusableCard';

type Props = {
  data: IMovie[];
};

const ReusableList = ({data}: Props) => {
  const keyExtractor = ({item}: {item: IMovie}, index: number) => {
    return `${item.id}-${item.title}-${index}`;
  };
  const renderItem = ({item}: {item: IMovie}) => {
    return <ReusableCard item={item} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => keyExtractor({item}, index)}
      horizontal={true}
      contentContainerStyle={styles.containerStyle}
    />
  );
};

export default ReusableList;

const styles = StyleSheet.create({
  containerStyle: {
    gap: 35,
    flex: 1,
  },
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
