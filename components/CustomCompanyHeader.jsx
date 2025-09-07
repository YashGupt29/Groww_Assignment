import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from './VView';
import TTouchable from './TTouchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';


const CustomCompanyHeader = ({ navigation, route, options }) => {
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? insets.top : 0;
  const title = options.title !== undefined ? options.title : route.name;

  return (
    <VView style={[styles.headerContainer, { paddingTop }]}>
      <TTouchable onPress={() => navigation.goBack()} style={styles.backButton}>
      <Icon name="arrow-left" size={18} color="black" />
          </TTouchable>
      <Text style={styles.headerTitle}>{title}</Text>
      <TTouchable onPress={() => console.log('Bookmark Pressed!')} style={styles.bookmarkButton}>
        <Icon name="bookmark-o" size={24} color="black" style={{marginRight:10}} />
      </TTouchable>
    </VView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground, 
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    paddingBottom: 10,
  },
  backButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'left',
    marginLeft: 0, // Ensure no extra margin
  },
  bookmarkButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

export default CustomCompanyHeader;
