import React, { useCallback, useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from '../components/VView';
import TTouchable from '../components/TTouchable';
import StockCard from '../components/StockCard';
import { useTopGainersLosers } from '../hooks/useTopGainersLosers';
import { fetchSymbolSearch } from '../services/fetchSymbolSearch';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';
import Toast from 'react-native-toast-message';

const ExploreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;
  const { data, isLoading, error, refetch ,isRefetching } = useTopGainersLosers();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setSearchLoading(true);
        const results = await fetchSymbolSearch(searchQuery);
        setSearchResults(results);
        setSearchLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isRefetching) { 
    return (
      <VView style={styles(currentColors).loadingContainer}>
        <ActivityIndicator size="large" color={currentColors.primary} />
        <Text style={styles(currentColors).loadingText}>Loading stocks...</Text>
      </VView>
    );
  }

  if (error) {
    return (
      <VView style={styles(currentColors).errorContainer}>
        <Text style={styles(currentColors).errorText}>Error: {error.message}</Text>
      </VView>
    );
  }
  if (data && typeof data === 'object' && data.Information) {
    Toast.show({
      type: 'error',
      text1: 'API Limit Reached For Today',
      text2: data?.Information,
      props: { currentColors: currentColors },
    });
    return (
      <VView style={styles(currentColors).noDataContainer}>
        <Text style={styles(currentColors).noDataText}>No stock data fetched.
          Try Again Tomorrow
        </Text>
      </VView>
    );
  }
  const topGainers = Array.isArray(data?.top_gainers) ? data.top_gainers.slice(0, 4) : [];
  const topLosers = Array.isArray(data?.top_losers) ? data.top_losers.slice(0, 4) : [];
  const fullTopGainers = Array.isArray(data?.top_gainers) ? data.top_gainers : [];
  const fullTopLosers = Array.isArray(data?.top_losers) ? data.top_losers : [];

  return (
    <VView style={styles(currentColors).container}>
      <VView style={[styles(currentColors).header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles(currentColors).headerTitle}>Stocks App</Text>
        <TextInput
          style={styles(currentColors).searchBar}
          placeholder="Search here..."
          placeholderTextColor={currentColors.lightText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </VView>
      <ScrollView 
        style={styles(currentColors).scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={currentColors.text} />
        }
      >
        {searchLoading ? (
          <VView style={styles(currentColors).loadingContainer}>
            <ActivityIndicator size="large" color={currentColors.primary} />
            <Text style={styles(currentColors).loadingText}>Searching stocks...</Text>
          </VView>
        ) : searchResults.length > 0 ? (
          <VView style={styles(currentColors).cardsContainer}>
            {searchResults.map((stock) => (
              <StockCard
                key={stock["1. symbol"]}
                stockName={stock["2. name"]}
                price={parseFloat(stock["9. matchScore"]).toFixed(2)}
                change_percentage={stock["8. currency"]}
                country={stock["4. region"]}
                navigation={navigation}
                stockData={stock}
                isSearchResult={true}
              />
            ))}
          </VView>
        ) : searchQuery.length > 0 ? (
          <VView style={styles(currentColors).errorContainer}>
            <Text style={styles(currentColors).errorText}>No results found for "{searchQuery}".</Text>
          </VView>
        ) : (
          <>
            <VView style={styles(currentColors).sectionHeader}>
              <Text style={styles(currentColors).sectionTitle}>Top Gainers</Text>
              <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Gainers', data: fullTopGainers })} style={styles(currentColors).viewAllButton}>
                <Text style={styles(currentColors).viewAllButtonText}>View All</Text>
              </TTouchable>
            </VView>
            <VView style={styles(currentColors).cardsContainer}>
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

            <VView style={styles(currentColors).sectionHeader}>
              <Text style={styles(currentColors).sectionTitle}>Top Losers</Text>
              <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Losers', data: fullTopLosers })} style={styles(currentColors).viewAllButton}>
                <Text style={styles(currentColors).viewAllButtonText}>View All</Text>
              </TTouchable>
            </VView>
            <VView style={styles(currentColors).cardsContainer}>
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
          </>
        )}
      </ScrollView>
    </VView>
  );
};

const styles = (currentColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: currentColors.borderColor,
    backgroundColor: currentColors.cardBackground,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  searchBar: {
    flex: 1,
    marginLeft: 20,
    padding: 8,
    borderRadius: 5,
    backgroundColor: currentColors.inputBackground,
    color: currentColors.text,
  },
  scrollViewContent: {
    padding: 10,
    backgroundColor: currentColors.background,
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
    color: currentColors.text,
  },
  viewAllText: {
    color: currentColors.primary,
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
    backgroundColor: currentColors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: currentColors.lightText,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: currentColors.background,
  },
  errorText: {
    fontSize: 16,
    color: currentColors.red,
    textAlign: 'center',
  },
  viewAllButton: {
    backgroundColor: currentColors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewAllButtonText: {
    color: currentColors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentColors.background,
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: currentColors.text,
    textAlign: 'center',
  },
});

export default ExploreScreen;
