import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputHeader from '../components/Inputs/InputHeader';
import {searchMovies} from '../api/apiMovie';
import {COLORS} from '../theme/theme';
import EmptyResult from '../components/EmptyResult';
import {useQuery} from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import {useDebouncedState} from '../components/hooks/useDebounceSearch';

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
      <EmptyResult noticeContent={'Sorry, Nothing Found'} />
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
