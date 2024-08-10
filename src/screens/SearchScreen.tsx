import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {searchMovies} from '../api/apiMovie';
import {baseImagePath} from '../api/apicalls';
import BasicWrapper from '../components/BasicWrapper';
import EmptyResult from '../components/EmptyResult';
import InputHeader from '../components/Inputs/InputHeader';
import MovieCard from '../components/MainPageComponents/MovieCard';
import {useDebouncedState} from '../components/hooks/useDebounceSearch';
import {COLORS, SPACING} from '../theme/theme';
import {isAndroid} from '../utils/platform';
import {width} from './HomeScreen';

const SearchScreen = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const debouncedQuery = useDebouncedState(searchText, 500);

  const {
    data: searchResult,
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
    refetch();
  }, [debouncedQuery]);

  if (isError) {
    return (
      <BasicWrapper>
        <View style={styles.container}>
          <InputHeader
            handleDelete={initSearchText}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      </BasicWrapper>
    );
  }
  return (
    <BasicWrapper>
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
    </BasicWrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isAndroid ? 20 : 0,
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
