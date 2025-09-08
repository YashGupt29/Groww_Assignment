import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import VView from '../components/VView';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../App';

const WatchlistScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? insets.top : 0;
  const allWatchlists = useSelector(state => state.watchlist.watchlists);

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  const renderWatchlistItem = ({ item }) => (
    <TouchableOpacity
      style={styles(currentColors).watchlistItem}
      onPress={() => navigation.navigate('StockList', { title: item.name, watchlistId: item.id })} 
    >
      <Text style={styles(currentColors).watchlistName}>{item.name}</Text>
      <Text style={styles(currentColors).stockCount}>{item.items.length} stocks</Text>
    </TouchableOpacity>
  );

  return (
    <VView style={styles(currentColors).container}>
      <VView style={[styles(currentColors).header, { paddingTop: headerPaddingTop }]}>
        <Text style={styles(currentColors).headerTitle}>My Watchlists</Text>
      </VView>
      {Object.values(allWatchlists).length === 0 ? (
        <View style={styles(currentColors).emptyWatchlistContainer}>
          <Text style={styles(currentColors).emptyWatchlistText}>You have no watchlists.</Text>
          <Text style={styles(currentColors).emptyWatchlistText}>Create new watchlists from company detail pages.</Text>
        </View>
      ) : (
        <FlatList
          data={Object.values(allWatchlists)}
          renderItem={renderWatchlistItem}
          keyExtractor={(item) => item.id} 
          contentContainerStyle={styles(currentColors).listContent}
        />
      )}
    </VView>
  );
};

const styles = (currentColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentColors.background,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: currentColors.borderColor,
    backgroundColor: currentColors.cardBackground,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  listContent: {
    padding: 10,
  },
  watchlistItem: {
    backgroundColor: currentColors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: currentColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bookmarkIcon: {
    marginRight: 10,
  },
  watchlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  stockCount: {
    fontSize: 14,
    color: currentColors.lightText,
  },
  emptyWatchlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyWatchlistText: {
    fontSize: 16,
    color: currentColors.lightText,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default WatchlistScreen;
