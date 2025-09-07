import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatMarketCap, formatDividendYield, formatProfitMargin, formatPrice } from '../../utils/formatters';
import CompanyAbout from "./CompanyAbout"

const CompanyFooter = ({ companyOverview }) => {
  const { MarketCapitalization, PERatio, Beta, DividendYield, ProfitMargin, '52WeekLow': weekLow, '52WeekHigh': weekHigh, AnalystTargetPrice: currentPrice } = companyOverview || {};

  const formatValue = (value, formatter = (v) => v) => {
    if (value === null || value === undefined || value === "None" || (typeof value === 'string' && value.trim() === '') || (typeof value === 'number' && isNaN(value))) {
      return 'N/A';
    }
    return formatter(value);
  };

  return (
    <View style={styles.container}>
        <CompanyAbout companyOverview={companyOverview} />
      <View style={styles.weekRangeContainer}>
        <View>
          <Text style={styles.label}>52-Week Low</Text>
          <Text style={styles.value}>{formatValue(weekLow, formatPrice)}</Text>
        </View>
        <View style={styles.priceIndicator}>
          <Text style={styles.currentPrice}>Current price: {formatValue(currentPrice, formatPrice)}</Text>
          <Text style={styles.arrowIcon}>▼</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View>
          <Text style={styles.label}>52-Week High</Text>
          <Text style={styles.value}>{formatValue(weekHigh, formatPrice)}</Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Market Cap</Text>
          <Text style={styles.value}>{formatValue(MarketCapitalization, (val) => formatMarketCap(parseFloat(val)))}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>P/E Ratio</Text>
          <Text style={styles.value}>{formatValue(PERatio, (val) => parseFloat(val).toFixed(2))}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Beta</Text>
          <Text style={styles.value}>{formatValue(Beta, (val) => parseFloat(val).toFixed(3))}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Dividend Yield</Text>
          <Text style={styles.value}>{formatValue(DividendYield, formatDividendYield)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Profit Margin</Text>
          <Text style={styles.value}>{formatValue(ProfitMargin, formatProfitMargin)}</Text>
        </View>
      </View>
    </View>
  )
}

export default CompanyFooter

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  weekRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  priceIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  currentPrice: {
    fontSize: 14,
    color: '#333',
  },
  arrowIcon: {
    fontSize: 12,
    color: '#333',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginRight:14
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },  
  metricItem: {
    width: '25%', 
    marginBottom: 5,
  },
})