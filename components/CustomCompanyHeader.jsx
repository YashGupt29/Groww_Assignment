import React, { useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from './VView';
import TTouchable from './TTouchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import AddToWatchlistModal from './AddToWatchlistModal';


const CustomCompanyHeader = ({ navigation, route, options }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? insets.top : 0;
  const title = options.title !== undefined ? options.title : route.name;
  const stock = route.params?.stock; 

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <VView style={[styles.headerContainer, { paddingTop }]}>
      <TTouchable onPress={() => navigation.goBack()} style={styles.backButton}>
      <Icon name="arrow-left" size={18} color="black" />
          </TTouchable>
      <Text style={styles.headerTitle}>{title}</Text>
      <TTouchable onPress={toggleModal} style={styles.bookmarkButton}>
        <Icon name="bookmark-o" size={24} color="black" style={styles.bookmarkIcon} />
      </TTouchable>
      <AddToWatchlistModal isVisible={isModalVisible} onClose={toggleModal} stock={stock} />
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
  bookmarkIcon: {
    marginRight: 10,
  },
});

export default CustomCompanyHeader;
