import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import StockCard from '../components/StockCard';
import VView from '../components/VView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 10; 
const CARD_HEIGHT = 125; 

const StockListScreen = ({ navigation, route }) => {
  const { title, watchlistId } = route.params || {}; 
  const allWatchlists = useSelector(state => state.watchlist.watchlists);

  const initialData = useMemo(() => {
    if (watchlistId && allWatchlists[watchlistId]) {
      return allWatchlists[watchlistId].items;
    } else {
      return route.params?.data || [];
    }
  }, [watchlistId, allWatchlists, route.params?.data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedData([]);
    loadMoreItems(initialData, 1); 
  }, [initialData, loadMoreItems]);

  const loadMoreItems = useCallback((dataToLoad, page) => {
    if (isLoading) return; 
    setIsLoading(true);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = dataToLoad.slice(startIndex, endIndex);

    if (newItems.length > 0) {
      setDisplayedData(prevData => [...prevData, ...newItems]);
      setCurrentPage(page + 1);
    } else {
    }
    setIsLoading(false);
  }, [isLoading]);

  const handleLoadMore = useCallback(() => {
    loadMoreItems(initialData, currentPage);
  }, [loadMoreItems, initialData, currentPage]);

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderItem = useCallback(({
    item
  }) => (
    <StockCard
      stockName={item.symbol || item.ticker}
      price={item.price}
      change_percentage={item.change_percentage}
      navigation={navigation}
      stockData={item}
    />
  ), [navigation]);

  return (
    <VView style={styles.container}>
      <VView style={[styles.header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </VView>
      {initialData.length === 0 ? (
        <View style={styles.emptyWatchlistContainer}>
          <Text style={styles.emptyWatchlistText}>
            {watchlistId ? "Add Stocks To your watchlist" : "Error fetching data. Please try again later."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol || item.ticker}
          numColumns={2}
          columnWrapperStyle={styles.row}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews={true}
          getItemLayout={(flatListData, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        />
      )}
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  emptyWatchlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyWatchlistText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default StockListScreen;
