import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { company } from '../../constants/dummyData'

const CompanyAbout = () => {
  const { Name, Description, Industry, Sector } = company;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About {Name.toUpperCase()}</Text>
      <Text style={styles.description}>{Description}</Text>
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Industry: {Industry}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Sector: {Sector}</Text>
        </View>
      </View>
    </View>
  )
}

export default CompanyAbout

const styles = StyleSheet.create({
  container: {
   
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0e0d8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#a0522d',
  },
})
