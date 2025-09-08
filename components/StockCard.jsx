import React from 'react';
import { Text, StyleSheet } from 'react-native';
import VView from './VView';
import TTouchable from './TTouchable';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const StockCard = ({ stockName, price, change_percentage, navigation, stockData }) => {
  const isPositive = Number.parseFloat(change_percentage) > 0;
  const onPressStockCard=()=>{
    navigation.navigate('CompanyScreen', { stock: stockData });
  };

  return (
    <TTouchable onPress={onPressStockCard} style={styles.card}>
         <VView style={styles.iconPlaceholder} />
      <VView style={styles.textContainer}>
        <Text style={styles.stockName}>{stockName}</Text>
        <Text style={[styles.price, { color: isPositive ? Colors.green : Colors.red }]}>
        ₹ {price}
        </Text>
        <VView style={styles.changeContainer}>
          
          <Text style={[styles.changePercentage, { color: isPositive ? Colors.green : Colors.red }]}>
            ({change_percentage})
          </Text>
          <VView style={[styles.changeIconBackground, { backgroundColor: isPositive ? Colors.lightGreen : Colors.lightRed }]}>
            <Icon
              name={isPositive ? 'arrow-up' : 'arrow-down'}
              size={9}
              color={isPositive ? Colors.green : Colors.red}
            />
          </VView>
        </VView>
      </VView>
    </TTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 'auto',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'flex-start', 
    shadowColor: Colors.black,
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
    backgroundColor: Colors.inputBackground,
    marginBottom: 5,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
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
