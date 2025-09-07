import React from 'react';
import { Text, StyleSheet } from 'react-native';
import VView from '../components/VView';

function WatchlistScreen() {
  return (
    <VView style={styles.container}>
      <Text>Watchlist Screen</Text>
    </VView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchlistScreen;
