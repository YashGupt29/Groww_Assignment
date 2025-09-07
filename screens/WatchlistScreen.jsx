import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import VView from '../components/VView';

const dummyWatchlists = [
  {
    id: '1',
    name: 'Watchlist 1',
    stocks: [
      { ticker: "AAPL", name: "Apple Inc", price: 177.15, change_percentage: "+4.15%" },
      { ticker: "TSLA", name: "Tesla Inc", price: 278.50, change_percentage: "+3.42%" },
      { ticker: "MSFT", name: "Microsoft Corp", price: 332.20, change_percentage: "+2.88%" },
    ],
  },
  {
    id: '2',
    name: 'Watchlist 2',
    stocks: [
      { ticker: "GOOGL", name: "Alphabet Inc", price: 138.75, change_percentage: "+2.35%" },
      { ticker: "AMZN", name: "Amazon.com Inc", price: 137.00, change_percentage: "-2.15%" },
      { ticker: "NFLX", name: "Netflix Inc", price: 392.80, change_percentage: "-1.72%" },
    ],
  },
];

const WatchlistScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;

  const renderWatchlistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.watchlistItem}
      onPress={() => navigation.navigate('StockList', { title: item.name, data: item.stocks })}
    >
      <Text style={styles.watchlistName}>{item.name}</Text>
      <Text style={styles.stockCount}>{item.stocks.length} stocks</Text>
    </TouchableOpacity>
  );

  return (
    <VView style={styles.container}>
      <VView style={[styles.header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles.headerTitle}>My Watchlists</Text>
      </VView>
      <FlatList
        data={dummyWatchlists}
        renderItem={renderWatchlistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  watchlistItem: {
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  watchlistName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockCount: {
    fontSize: 14,
  },
});

export default WatchlistScreen;
