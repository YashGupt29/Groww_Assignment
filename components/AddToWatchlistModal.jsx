import React, { useState, useEffect } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions,Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlist, addToWatchlist, removeFromWatchlist } from '../slices/watchlistSlice';
import Toast from 'react-native-toast-message';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenHeight = Dimensions.get('window').height;

const AddToWatchlistModal = ({ isVisible, onClose, stock ,onSetModal}) => {
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [selectedWatchlists, setSelectedWatchlists] = useState({});
  const dispatch = useDispatch();
  const allWatchlists = useSelector(state => state.watchlist.watchlists);

  const slideAnim = useSharedValue(screenHeight);

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  useEffect(() => {
    slideAnim.value = isVisible
      ? withSpring(0, {
          damping: 20,      
          stiffness: 100,   
          mass: 1,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        })
      : withSpring(screenHeight, {
          damping: 20,
          stiffness: 150,
        });
  }, [isVisible,slideAnim, stock]);

  useEffect(() => {
    if (isVisible && stock) {
      const initialSelection = {};
      Object.values(allWatchlists).forEach(watchlist => {
        initialSelection[watchlist.id] = watchlist.items.some(item => item.ticker === stock.ticker);
      });
      setSelectedWatchlists(initialSelection);
    }
  }, [isVisible, stock, allWatchlists]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }));

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim() !== '') {
      const newId = Date.now().toString();
      dispatch(createWatchlist({ id: newId, name: newWatchlistName.trim() }));
      setNewWatchlistName('');
      setSelectedWatchlists(prev => ({ ...prev, [newId]: true }));
    }
  };

  const handleToggleWatchlist = (id) => {
    setSelectedWatchlists(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveWatchlists = () => {
    const currentWatchlistIds = Object.keys(allWatchlists);
    const selectedWatchlistIds = Object.keys(selectedWatchlists).filter(id => selectedWatchlists[id]);

    currentWatchlistIds.forEach(watchlistId => {
      const isInSelected = selectedWatchlistIds.includes(watchlistId);
      const isCurrentlyInWatchlist = allWatchlists[watchlistId].items.some(item => item.ticker === stock.ticker);

      if (isInSelected && !isCurrentlyInWatchlist) {
        dispatch(addToWatchlist({ watchlistId, stock }));
      } else if (!isInSelected && isCurrentlyInWatchlist) {
        dispatch(removeFromWatchlist({ watchlistId, ticker: stock.ticker }));
      }
    });
    onClose();
    const hasRemainingWatchlists = Object.values(selectedWatchlists).some(selected => selected);
    const toastText2 = hasRemainingWatchlists 
      ? `${stock.ticker} watchlists have been updated.`
      : `${stock.ticker} has been removed from all watchlists.`;
    const toastText1 = hasRemainingWatchlists ? 'Watchlist Updated' : 'Watchlist Successfully Removed';

    Toast.show({
      type: 'watchlistSuccess',
      text1: toastText1,
      text2: toastText2,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 30,
      props: {
        currentColors: currentColors,
        onButtonPress: () => onSetModal(true) 
      },
    });
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles(currentColors).modalOverlay} onPress={onClose}>
        <Animated.View style={[
          styles(currentColors).modalContainer,
          animatedStyle
        ]} onStartShouldSetResponder={() => true}> 
          <Text style={styles(currentColors).modalTitle}>Add to Watchlist</Text>

          <View style={styles(currentColors).newWatchlistContainer}>
            <TextInput
              style={styles(currentColors).textInput}
              placeholder="New Watchlist Name"
              placeholderTextColor={currentColors.lightText}
              value={newWatchlistName}
              onChangeText={setNewWatchlistName}
            />
            <TouchableOpacity style={styles(currentColors).addButton} onPress={handleCreateWatchlist}>
              <Text style={styles(currentColors).addButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles(currentColors).watchlistOptions}>
            {Object.values(allWatchlists).map(watchlist => (
              <TouchableOpacity key={watchlist.id} style={styles(currentColors).checkboxContainer} onPress={() => handleToggleWatchlist(watchlist.id)}>
                <View style={[styles(currentColors).customCheckbox, selectedWatchlists[watchlist.id] && { backgroundColor: currentColors.primary, borderColor: currentColors.primary }]}>
                  {selectedWatchlists[watchlist.id] && (
                    <Icon
                      name="check"
                      size={14}
                      color={theme === 'light' ? currentColors.white : currentColors.lightText}
                    />
                  )}
                </View>
                <Text style={styles(currentColors).watchlistName}>{watchlist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles(currentColors).actionButton, { backgroundColor: currentColors.primary }]}
            onPress={handleSaveWatchlists}
          >
            <Text style={styles(currentColors).actionButtonText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = (currentColors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: currentColors.modalOverlayBackground,
  },
  modalContainer: {
    backgroundColor: currentColors.cardBackground,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: currentColors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: currentColors.text,
  },
  newWatchlistContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: currentColors.borderColor,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    color: currentColors.text,
    backgroundColor: currentColors.inputBackground,
  },
  addButton: {
    backgroundColor: currentColors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: currentColors.white,
    fontWeight: 'bold',
  },
  watchlistOptions: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: currentColors.borderColor,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchlistName: {
    fontSize: 16,
    color: currentColors.text,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
    width: '100%',
  },
  actionButtonText: {
    color: currentColors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddToWatchlistModal;
