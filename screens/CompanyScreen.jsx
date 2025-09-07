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
    flex: 1, // This is the most important style!
    backgroundColor: "#fff", // Or your screen's background color
  },
  chartWrapper: {
    // This wrapper ensures the chart has a container to flex inside
    flex: 1,
  },
});
