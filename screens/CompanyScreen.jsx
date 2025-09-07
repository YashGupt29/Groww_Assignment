import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StockChart from '../components/graph/StockChart'
import { stockData } from '../constants/dummyData'
import CompanyHeader from  '../components/CompanyHeader'

const CompanyScreen = () => {
  const chartData = Object.keys(stockData.TimeSeriesDaily).map(date => ({
    date: date,
    close: stockData.TimeSeriesDaily[date].close,
  })).reverse(); 

  return (
    <View>
      <View>
          <CompanyHeader/>
      </View>
      <View style={styles.chartWrapper}> 
          <StockChart data={chartData} />
      </View>
    </View>
  )
}


export default CompanyScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    backgroundColor: "#fff", 
  },
  chartWrapper: {
    flex: 1,
  },
});
