import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import StockChart from '../components/StockChart'
import CompanyHeader from  '../components/CompanyHeader'
import CompanyFooter from "../components/CompanyFooter"
import { useRoute } from '@react-navigation/native';
import { useCompanyOverview } from '../hooks/useCompanyOverview';
import DurationSelector from '../components/DurationSelector';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';
const CompanyScreen = () => {
  const route = useRoute();
  const { stock, companyLogoUrl } = route.params;
  const { data: companyOverview, isLoading, error } = useCompanyOverview(stock.ticker);
  const [selectedDuration, setSelectedDuration] = useState('1D');

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  if (isLoading) {
    return (
      <View style={styles(currentColors).loadingContainer}>
        <ActivityIndicator size="large" color={currentColors.primary} />
        <Text style={{color: currentColors.text}}>Loading company overview...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(currentColors).errorContainer}>
        <Text style={{color: currentColors.red}}>Error loading company overview: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles(currentColors).screen}>
      <View>
          <CompanyHeader companyLogoUrl={companyLogoUrl}/>
      </View>
      <View style={styles(currentColors).chartWrapper}> 
          <StockChart symbol={stock.ticker} duration={selectedDuration} />
      </View>
      <DurationSelector selectedDuration={selectedDuration} onSelectDuration={setSelectedDuration} />
      <CompanyFooter companyOverview={companyOverview} />
    </ScrollView>
  )
}


export default CompanyScreen;

const styles = (currentColors) => StyleSheet.create({
  screen: {
    flex: 1, 
    backgroundColor: currentColors.background, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentColors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: currentColors.background,
  },
  chartWrapper: {
    backgroundColor: currentColors.background,
  },
});
