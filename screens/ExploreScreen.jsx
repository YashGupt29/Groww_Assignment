import React, { useCallback } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from '../components/VView';
import TTouchable from '../components/TTouchable';
import StockCard from '../components/StockCard';
import { useTopGainersLosers } from '../hooks/useTopGainersLosers';

const ExploreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;
  const { data, isLoading, error, refetch } = useTopGainersLosers();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) { // Show initial loading
    return (
      <VView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading stocks...</Text>
      </VView>
    );
  }

  if (error) {
    return (
      <VView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </VView>
    );
  }

  const topGainers = data?.top_gainers.slice(0, 4) || [];
  const topLosers = data?.top_losers.slice(0, 4) || [];
  const fullTopGainers = data?.top_gainers  || [];
  const fullTopLosers = data?.top_losers  || [];

  return (
    <VView style={styles.container}>
      <VView style={[styles.header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles.headerTitle}>Stocks App</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search here..."
          placeholderTextColor="#424242" 
        />
      </VView>
      <ScrollView 
        style={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <VView style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Gainers</Text>
          <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Gainers', data: fullTopGainers })}>
            <Text style={styles.viewAllText}>View All</Text>
          </TTouchable>
        </VView>
        <VView style={styles.cardsContainer}>
          {topGainers.map(stock => (
            <StockCard
              key={stock.ticker}
              stockName={stock.ticker}
              price={stock.price}
              change_percentage={stock.change_percentage}
              navigation={navigation} 
              stockData={stock}
            />
          ))}
        </VView>

        <VView style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Losers</Text>
          <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Losers', data: fullTopLosers })}>
            <Text style={styles.viewAllText}>View All</Text>
          </TTouchable>
        </VView>
        <VView style={styles.cardsContainer}>
          {topLosers.map(stock => (
            <StockCard
              key={stock.ticker}
              stockName={stock.ticker}
              price={stock.price}
              change_percentage={stock.change_percentage}
              navigation={navigation}
              stockData={stock}
            />
          ))}
        </VView>
      </ScrollView>
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    marginLeft: 20,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    color:"black"
  },
  scrollViewContent: {
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: 'blue',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ExploreScreen;
