import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import StockChart from '../components/graph/StockChart'
import { stockData } from '../constants/dummyData'
import CompanyHeader from  '../components/CompanyHeader'
import CompanyFooter from "../components/ui_Company_Screen/CompanyFooter"
import { useRoute } from '@react-navigation/native';
import { useCompanyOverview } from '../hooks/useCompanyOverview';
import DurationSelector from '../components/DurationSelector';

const CompanyScreen = () => {
  const route = useRoute();
  const { stockName } = route.params;
  const { data: companyOverview, isLoading, error } = useCompanyOverview(stockName);
  const [selectedDuration, setSelectedDuration] = useState('1D');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading company overview...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading company overview: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View>
          <CompanyHeader/>
      </View>
      <View style={styles.chartWrapper}> 
          <StockChart symbol={stockName} duration={selectedDuration} />
      </View>
      <DurationSelector selectedDuration={selectedDuration} onSelectDuration={setSelectedDuration} />
      <CompanyFooter companyOverview={companyOverview} />
    </ScrollView>
  )
}


export default CompanyScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    backgroundColor: "#ffffff", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
