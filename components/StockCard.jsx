import React from 'react';
import { Text, StyleSheet } from 'react-native';
import VView from './VView';
import TTouchable from './TTouchable';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../App';

const StockCard = ({ stockName, price, change_percentage, navigation, stockData, isSearchResult, country }) => {
  const isPositive = Number.parseFloat(change_percentage) > 0;
  const onPressStockCard=()=>{
    navigation.navigate('CompanyScreen', { stock: stockData });
  };

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  return (
    <TTouchable onPress={onPressStockCard} style={styles(currentColors).card}>
         <VView style={styles(currentColors).iconPlaceholder} />
      <VView style={styles(currentColors).textContainer}>
        <Text style={styles(currentColors).stockName}>{stockName}</Text>
        {isSearchResult ? (
          <>
            <Text style={styles(currentColors).countryName}>{country}</Text>
            <Text style={styles(currentColors).searchPrice}>Match Score: {price}</Text>
            <Text style={styles(currentColors).searchCurrency}>Currency: {change_percentage}</Text>
          </>
        ) : (
          <>
            <Text style={[styles(currentColors).price, { color: currentColors.text}]}>
            ₹ {price}
            </Text>
            <VView style={styles(currentColors).changeContainer}>
              
              <Text style={[styles(currentColors).changePercentage, { color: isPositive ? currentColors.green : currentColors.red }]}>
                ({change_percentage})
              </Text>
              <VView style={[styles(currentColors).changeIconBackground, { backgroundColor: isPositive ? currentColors.lightGreen : currentColors.lightRed }]}>
                <Icon
                  name={isPositive ? 'arrow-up' : 'arrow-down'}
                  size={9}
                  color={isPositive ? currentColors.green : currentColors.red}
                />
              </VView>
            </VView>
          </>
        )}
      </VView>
    </TTouchable>
  );
};

const styles = (currentColors) => StyleSheet.create({
  card: {
    width: 170,
    height: 'auto',
    backgroundColor: currentColors.cardBackground,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'flex-start', 
    shadowColor: currentColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: currentColors.inputBackground,
    marginBottom: 5,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  countryName: {
    fontSize: 14,
    color: currentColors.text,
    marginBottom: 5,
  },
  searchPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: currentColors.text,
    marginTop: 5,
  },
  searchCurrency: {
    fontSize: 12,
    color: currentColors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  changeIconBackground: {
    borderRadius: 100, 
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 4, 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePercentage: {
    fontSize: 12,
  },
  textContainer: {
    alignItems: 'start',
  },
});

export default React.memo(StockCard);
