import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import StockChart from '../components/graph/StockChart'
import { stockData } from '../constants/dummyData'
import CompanyHeader from  '../components/CompanyHeader'
import CompanyFooter from "../components/ui_Company_Screen/CompanyFooter"

const CompanyScreen = () => {
  const chartData = Object.keys(stockData.TimeSeriesDaily).map(date => ({
    date: date,
    close: stockData.TimeSeriesDaily[date].close,
  })).reverse(); 

  return (
    <ScrollView style={styles.screen}>
      <View>
          <CompanyHeader/>
      </View>
      <View style={styles.chartWrapper}> 
          <StockChart data={chartData} />
      </View>
      <CompanyFooter/>
    </ScrollView>
  )
}


export default CompanyScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    backgroundColor: "#ffffff", 
  }
});
