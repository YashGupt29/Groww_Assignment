import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { company } from '../../constants/dummyData'
import { formatMarketCap, formatDividendYield, formatProfitMargin, formatPrice } from '../../utils/formatters';
import CompanyAbout from "./CompanyAbout"

const CompanyFooter = () => {
  const { MarketCapitalization, PERatio, Beta, DividendYield, ProfitMargin, '52WeekLow': weekLow, '52WeekHigh': weekHigh } = company;

  return (
    <View style={styles.container}>
        <CompanyAbout/>
      <View style={styles.weekRangeContainer}>
        <View>
          <Text style={styles.label}>52-Week Low</Text>
          <Text style={styles.value}>{formatPrice(weekLow)}</Text>
        </View>
        <View style={styles.priceIndicator}>
          <Text style={styles.currentPrice}>Current price: {formatPrice(177.15)}</Text>
          <Text style={styles.arrowIcon}>▼</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View>
          <Text style={styles.label}>52-Week High</Text>
          <Text style={styles.value}>{formatPrice(weekHigh)}</Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Market Cap</Text>
          <Text style={styles.value}>{formatMarketCap(parseFloat(MarketCapitalization))}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>P/E Ratio</Text>
          <Text style={styles.value}>{parseFloat(PERatio).toFixed(2)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Beta</Text>
          <Text style={styles.value}>{parseFloat(Beta).toFixed(3)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Dividend Yield</Text>
          <Text style={styles.value}>{formatDividendYield(DividendYield)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.label}>Profit Margin</Text>
          <Text style={styles.value}>{formatProfitMargin(ProfitMargin)}</Text>
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