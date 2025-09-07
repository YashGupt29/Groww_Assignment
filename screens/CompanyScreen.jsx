import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StockChart from '../components/graph/StockChart'
import { stockData } from '../constants/dummyData'

const CompanyScreen = () => {
  // Transform the dummy data into the format expected by StockChart
  const chartData = Object.keys(stockData.TimeSeriesDaily).map(date => ({
    date: date,
    close: stockData.TimeSeriesDaily[date].close,
  })).reverse(); // Reverse to have the latest date on the right

  return (
    <View>
      <Text>CompanyOverview</Text>
      <StockChart data={chartData} />
    </View>
  )
}

export default CompanyScreen;

const styles = StyleSheet.create({});
