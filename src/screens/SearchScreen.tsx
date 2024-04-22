import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import InputHeader from '../components/Inputs/InputHeader';
import {searchMovies} from '../api/apiMovie';
import {COLORS, SPACING} from '../theme/theme';
import EmptyResult from '../components/EmptyResult';
import {useQuery} from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import {useDebouncedState} from '../components/hooks/useDebounceSearch';
import MovieCard from '../components/MainPageComponents/MovieCard';
import {width} from './HomeScreen';
import {baseImagePath} from '../api/apicalls';

const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const debouncedQuery = useDebouncedState(searchText, 1000);

  const {
    data: searchResult,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['searchResults'],
    queryFn: async () => await searchMovies(searchText),
    enabled: true,
  });

  const renderItem = ({item}: {item: any}) => {
    return (
      <MovieCard
        cardWidth={width / 2 - SPACING.space_12 * 2}
        title={item.original_title}
        imagePath={baseImagePath('w342', item.poster_path)}
      />
    );
  };

  React.useEffect(() => {
    if (debouncedQuery.length > 0) {
      refetch();
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <InputHeader
        searchFunction={() => {}}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {searchResult == undefined ? (
        <EmptyResult noticeContent={'Sorry, Nothing Found'} />
      ) : (
        <View>
          <FlatList data={searchResult} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
