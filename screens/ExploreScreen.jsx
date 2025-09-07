import React from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from '../components/VView';
import TTouchable from '../components/TTouchable';
import StockCard from '../components/StockCard';
import StockListScreen from './StockListScreen';

const ExploreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;

  const stockData = {
    top_gainers: [
      { ticker: "AAPL", name: "Apple Inc", price: 177.15, change_percentage: "+4.15%" },
      { ticker: "TSLA", name: "Tesla Inc", price: 278.50, change_percentage: "+3.42%" },
      { ticker: "MSFT", name: "Microsoft Corp", price: 332.20, change_percentage: "+2.88%" },
      { ticker: "GOOGL", name: "Alphabet Inc", price: 138.75, change_percentage: "+2.35%" }
    ],
    top_losers: [
      { ticker: "AMZN", name: "Amazon.com Inc", price: 137.00, change_percentage: "-2.15%" },
      { ticker: "NFLX", name: "Netflix Inc", price: 392.80, change_percentage: "-1.72%" },
      { ticker: "NVDA", name: "NVIDIA Corp", price: 468.50, change_percentage: "-1.25%" },
      { ticker: "META", name: "Meta Platforms", price: 302.10, change_percentage: "-0.95%" }
    ]
  };


  
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

      <ScrollView style={styles.scrollViewContent}>
        <VView style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Gainers</Text>
          <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Gainers', data: stockData.top_gainers })}>
            <Text style={styles.viewAllText}>View All</Text>
          </TTouchable>
        </VView>
        <VView style={styles.cardsContainer}>
          {stockData.top_gainers.map(stock => (
            <StockCard
              key={stock.ticker}
              stockName={stock.name}
              price={stock.price}
              change_percentage={stock.change_percentage}
              navigation={navigation} 
            />
          ))}
        </VView>

        <VView style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Losers</Text>
          <TTouchable onPress={() => navigation.navigate('StockList', { title: 'Top Losers', data: stockData.top_losers })}>
            <Text style={styles.viewAllText}>View All</Text>
          </TTouchable>
        </VView>
        <VView style={styles.cardsContainer}>
          {stockData.top_losers.map(stock => (
            <StockCard
              key={stock.ticker}
              stockName={stock.name}
              price={stock.price}
              change_percentage={stock.change_percentage}
              onPress={() => console.log(`Stock ${stock.name} pressed`)}
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
});

export default ExploreScreen;
