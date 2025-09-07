import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { company } from '../constants/dummyData';
import Colors from '../constants/Colors';
import VView from './VView';

const CompanyHeader = () => {
  const { Name, Symbol, AssetType, Exchange, MarketCapitalization, PERatio } = company;

  // Simple function to format market cap to a readable string (e.g., 2.78T, 231.51B)
  const formatMarketCap = (cap) => {
    if (!cap) return 'N/A';
    const num = parseInt(cap);
    if (num >= 10 ** 12) {
      return `${(num / 10 ** 12).toFixed(2)}T`;
    } else if (num >= 10 ** 9) {
      return `${(num / 10 ** 9).toFixed(2)}B`;
    } else {
      return num.toLocaleString();
    }
  };

  const formattedMarketCap = formatMarketCap(MarketCapitalization);

  return (
    <VView style={styles.container}>
      <View style={styles.logoPlaceholder} />
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{Name.toUpperCase()}</Text>
        <Text style={styles.companyDetails}>{Symbol}, {AssetType}</Text>
        <Text style={styles.companyDetails}>{Exchange}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.price}>${(Math.random() * 200 + 100).toFixed(2)}</Text>
        <Text style={[styles.change, { color: Math.random() > 0.5 ? Colors.green : Colors.red }]}>
          {(Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)}%
          {Math.random() > 0.5 ? ' ▲' : ' ▼'}
        </Text>
      </View>
    </VView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,

  },
  logoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: Colors.inputBackground,
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  companyDetails: {
    fontSize: 10,
    color: Colors.darkGray,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CompanyHeader;
