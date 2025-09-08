import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { ThemeContext } from '../../App';

const CompanyAbout = ({ companyOverview }) => {
  const { Name, Description, Industry, Sector } = companyOverview || {};

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  const formatText = (text) => {
    if (text === null || text === undefined || (typeof text === 'string' && text.trim() === '')) {
      return 'N/A';
    }
    return text;
  };

  return (
    <View style={styles(currentColors).container}>
      <Text style={styles(currentColors).header}>About {formatText(Name)?.toUpperCase()}</Text>
      <Text style={styles(currentColors).description}>{formatText(Description)}</Text>
      <View style={styles(currentColors).tagsContainer}>
        <View style={styles(currentColors).tag}>
          <Text style={styles(currentColors).tagText}>Industry: {formatText(Industry)}</Text>
        </View>
        <View style={styles(currentColors).tag}>
          <Text style={styles(currentColors).tagText}>Sector: {formatText(Sector)}</Text>
        </View>
      </View>
    </View>
  )
}

export default CompanyAbout

const styles = (currentColors) => StyleSheet.create({
  container: {
   
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: currentColors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: currentColors.lightText,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: currentColors.inputBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    color: currentColors.brown,
  },
})
