import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { company } from '../constants/dummyData';
import Colors from '../constants/Colors';
import VView from './VView';
import { ThemeContext } from '../App';

const CompanyHeader = ({ companyLogoUrl }) => {
  const { Name, Symbol, AssetType, Exchange } = company;

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  return (
    <VView style={styles(currentColors).container}>
      {companyLogoUrl ? (
        <Image source={{ uri: companyLogoUrl }} style={styles(currentColors).companyLogo} />
      ) : (
        <View style={styles(currentColors).logoPlaceholder} />
      )}
      <View style={styles(currentColors).companyInfo}>
        <Text style={styles(currentColors).companyName}>{Name.toUpperCase()}</Text>
        <Text style={styles(currentColors).companyDetails}>{Symbol}, {AssetType}</Text>
        <Text style={styles(currentColors).companyDetails}>{Exchange}</Text>
      </View>
      <View style={styles(currentColors).priceInfo}>
        <Text style={styles(currentColors).price}>${(Math.random() * 200 + 100).toFixed(2)}</Text>
        <Text style={[styles(currentColors).change, { color: Math.random() > 0.5 ? currentColors.green : currentColors.red }]}>
          {(Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)}%
          {Math.random() > 0.5 ? ' ▲' : ' ▼'}
        </Text>
      </View>
    </VView>
  );
};

const styles = (currentColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: currentColors.background,

  },
  logoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: currentColors.inputBackground,
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  companyDetails: {
    fontSize: 10,
    color: currentColors.lightText,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  companyLogo: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 16,
  },
});

export default CompanyHeader;
