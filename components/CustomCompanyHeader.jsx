import React, { useState } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VView from './VView';
import TTouchable from './TTouchable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import AddToWatchlistModal from './AddToWatchlistModal';
import { ThemeContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist } from '../slices/watchlistSlice';
import Toast from 'react-native-toast-message';


const CustomCompanyHeader = ({ navigation, route, options }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const paddingTop = Platform.OS === 'android' ? insets.top : 0;
  const title = options.title !== undefined ? options.title : route.name;
  const stock = route.params?.stock; 

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  const dispatch = useDispatch();
  const isStockInWatchlist = useSelector(state => 
    state.watchlist.watchlists['default']?.items.some(item => item.ticker === stock?.ticker)
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleBookmarkPress = () => {
    if (isStockInWatchlist) {
      toggleModal();
    } else {
      dispatch(addToWatchlist({ watchlistId: 'default', stock }));
      Toast.show({
        type: 'watchlistSuccess',
        text1: 'Watchlist Added',
        text2: `${stock.ticker} has been added to My Watchlist.`,
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 30,
        props: { 
          currentColors: currentColors, 
          onButtonPress: toggleModal 
        },
      });
    }
  };

  return (
    <VView style={[styles(currentColors).headerContainer, { paddingTop }]}>
      <TTouchable onPress={() => navigation.goBack()} style={styles(currentColors).backButton}>
      <Icon name="arrow-left" size={18} color={currentColors.text} />
          </TTouchable>
      <Text style={styles(currentColors).headerTitle}>{title}</Text>
      <TTouchable onPress={handleBookmarkPress} style={styles(currentColors).bookmarkButton}>
        <Icon 
          name={isStockInWatchlist ? "bookmark" : "bookmark-o"} 
          size={24} 
          color={isStockInWatchlist ? currentColors.lightGreen : currentColors.text} 
          style={styles(currentColors).bookmarkIcon} 
        />
      </TTouchable>
      <AddToWatchlistModal isVisible={isModalVisible} onClose={toggleModal} stock={stock} />
    </VView>
  );
};

const styles = (currentColors) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: currentColors.cardBackground, 
    borderBottomWidth: 1,
    borderBottomColor: currentColors.borderColor,
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
    color: currentColors.text,
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
