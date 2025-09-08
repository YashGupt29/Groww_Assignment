import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatMarketCap, formatDividendYield, formatProfitMargin, formatPrice } from '../../utils/formatters';
import CompanyAbout from "./CompanyAbout"
import Colors from '../../constants/Colors';
import { ThemeContext } from '../../App';

const CompanyFooter = ({ companyOverview }) => {
  const { MarketCapitalization, PERatio, Beta, DividendYield, ProfitMargin, '52WeekLow': weekLow, '52WeekHigh': weekHigh, AnalystTargetPrice: currentPrice } = companyOverview || {};

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  const formatValue = (value, formatter = (v) => v) => {
    if (value === null || value === undefined || value === "None" || (typeof value === 'string' && value.trim() === '') || (typeof value === 'number' && isNaN(value))) {
      return 'N/A';
    }
    return formatter(value);
  };

  return (
    <View style={styles(currentColors).container}>
        <CompanyAbout companyOverview={companyOverview} />
      <View style={styles(currentColors).weekRangeContainer}>
        <View>
          <Text style={styles(currentColors).label}>52-Week Low</Text>
          <Text style={styles(currentColors).value}>{formatValue(weekLow, formatPrice)}</Text>
        </View>
        <View style={styles(currentColors).priceIndicator}>
          <Text style={styles(currentColors).currentPrice}>Current price: {formatValue(currentPrice, formatPrice)}</Text>
          <Text style={styles(currentColors).arrowIcon}>▼</Text>
          <View style={styles(currentColors).horizontalLine} />
        </View>
        <View>
          <Text style={styles(currentColors).label}>52-Week High</Text>
          <Text style={styles(currentColors).value}>{formatValue(weekHigh, formatPrice)}</Text>
        </View>
      </View>

      <View style={styles(currentColors).metricsContainer}>
        <View style={styles(currentColors).metricItem}>
          <Text style={styles(currentColors).label}>Market Cap</Text>
          <Text style={styles(currentColors).value}>{formatValue(MarketCapitalization, (val) => formatMarketCap(parseFloat(val)))}</Text>
        </View>
        <View style={styles(currentColors).metricItem}>
          <Text style={styles(currentColors).label}>P/E Ratio</Text>
          <Text style={styles(currentColors).value}>{formatValue(PERatio, (val) => parseFloat(val).toFixed(2))}</Text>
        </View>
        <View style={styles(currentColors).metricItem}>
          <Text style={styles(currentColors).label}>Beta</Text>
          <Text style={styles(currentColors).value}>{formatValue(Beta, (val) => parseFloat(val).toFixed(3))}</Text>
        </View>
        <View style={styles(currentColors).metricItem}>
          <Text style={styles(currentColors).label}>Dividend Yield</Text>
          <Text style={styles(currentColors).value}>{formatValue(DividendYield, formatDividendYield)}</Text>
        </View>
        <View style={styles(currentColors).metricItem}>
          <Text style={styles(currentColors).label}>Profit Margin</Text>
          <Text style={styles(currentColors).value}>{formatValue(ProfitMargin, formatProfitMargin)}</Text>
        </View>
      </View>
    </View>
  )
}

export default CompanyFooter

const styles = (currentColors) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: currentColors.cardBackground,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: currentColors.black,
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
    color: currentColors.lightText,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  priceIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  currentPrice: {
    fontSize: 14,
    color: currentColors.text,
  },
  arrowIcon: {
    fontSize: 12,
    color: currentColors.text,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: currentColors.borderColor,
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