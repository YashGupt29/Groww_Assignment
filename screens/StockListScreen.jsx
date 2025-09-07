import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import StockCard from '../components/StockCard';
import VView from '../components/VView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const ITEMS_PER_PAGE = 10; 

const StockListScreen = ({ title,data, navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = () => {
    if (isLoading) return; 

    setIsLoading(true);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = data.slice(startIndex, endIndex);

    if (newItems.length > 0) {
      setDisplayedData(prevData => [...prevData, ...newItems]);
      setCurrentPage(prevPage => prevPage + 1);
    }
    setIsLoading(false);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <VView style={styles.container}>
      <VView style={[styles.header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </VView>
      <FlatList
        data={displayedData}
        renderItem={({ item }) => (
          <StockCard
            stockName={item.name}
            price={item.price}
            change_percentage={item.change_percentage}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => item.ticker + index} 
        numColumns={2} 
        columnWrapperStyle={styles.row}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={renderFooter}
      />
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
});

export default StockListScreen;
