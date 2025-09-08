import React, { useState, useEffect } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions,Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlist, addToWatchlist } from '../slices/watchlistSlice';
import Toast from 'react-native-toast-message';

const screenHeight = Dimensions.get('window').height;

const AddToWatchlistModal = ({ isVisible, onClose, stock}) => {
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [selectedWatchlists, setSelectedWatchlists] = useState({});
  const dispatch = useDispatch();
  const allWatchlists = useSelector(state => state.watchlist.watchlists);

  const slideAnim = useSharedValue(screenHeight);

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

  const handleAddToSelectedWatchlists = () => {
    Object.keys(selectedWatchlists).forEach(watchlistId => {
      if (selectedWatchlists[watchlistId]) {
        dispatch(addToWatchlist({ watchlistId, stock }));
      }
    });
    onClose();
    Toast.show({
      type: 'success',
      text1: 'Watchlist Updated',
      text2: `Stock ${stock.ticker} added to selected watchlists.`,
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 30,
    });
  };

  const hasSelectedWatchlists = Object.values(selectedWatchlists).some(selected => selected);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Animated.View style={[
          styles.modalContainer,
          animatedStyle
        ]} onStartShouldSetResponder={() => true}> 
          <Text style={styles.modalTitle}>Add to Watchlist</Text>

          <View style={styles.newWatchlistContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="New Watchlist Name"
              value={newWatchlistName}
              onChangeText={setNewWatchlistName}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleCreateWatchlist}>
              <Text style={styles.addButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.watchlistOptions}>
            {Object.values(allWatchlists).map(watchlist => (
              <TouchableOpacity key={watchlist.id} style={styles.checkboxContainer} onPress={() => handleToggleWatchlist(watchlist.id)}>
                <View style={[styles.checkbox, selectedWatchlists[watchlist.id] && styles.checkedCheckbox]} />
                <Text style={styles.watchlistName}>{watchlist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {hasSelectedWatchlists && ( 
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleAddToSelectedWatchlists}
            >
              <Text style={styles.actionButtonText}>Add to Selected Watchlists</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newWatchlistContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  watchlistName: {
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddToWatchlistModal;
