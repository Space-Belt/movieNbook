import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const debouncedQuery = useDebouncedState(searchText, 500);

  const {
    data: searchResult,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['searchResults'],
    queryFn: () => searchMovies(searchText),
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
  const keyExtractor = (item: any, index: number) => {
    return `${item.id}-number-${index}`;
  };

  const initSearchText = () => {
    setSearchText('');
  };

  React.useEffect(() => {
    // if (debouncedQuery.length > 0) {
    refetch();
    // }
  }, [debouncedQuery]);

  if (isError) {
    return (
      <View style={styles.container}>
        <InputHeader
          handleDelete={initSearchText}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <InputHeader
        handleDelete={initSearchText}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {searchResult?.length === 0 ? (
        <EmptyResult
          noticeContent={
            searchText.length === 0
              ? '검색어를 입력해보세요!'
              : `검색어 : ${searchText}에 \n 부합하는 결과가 없습니다.`
          }
        />
      ) : (
        <View style={styles.flatWrapper}>
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            numColumns={2}
            initialNumToRender={10}
            keyExtractor={(item: any, index) => keyExtractor(item, index)}
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.flatStyle}
          />
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
  flatWrapper: {
    flex: 1,
  },
  flatStyle: {
    gap: SPACING.space_12,
  },
  contentContainerStyle: {
    marginHorizontal: 5,
  },
});
