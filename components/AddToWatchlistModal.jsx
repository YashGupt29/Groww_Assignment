import React, { useState, useEffect } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions,Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing,withSpring } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height;

const AddToWatchlistModal = ({ isVisible, onClose }) => {
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [watchlists, setWatchlists] = useState([
    { id: '1', name: 'Watchlist 1', checked: false },
    { id: '2', name: 'Watchlist 2', checked: false },
  ]);

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
  }, [isVisible,slideAnim]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }));

  const handleAddWatchlist = () => {
    if (newWatchlistName.trim() !== '') {
      setWatchlists([...watchlists, { id: Date.now().toString(), name: newWatchlistName, checked: false }]);
      setNewWatchlistName('');
    }
  };

  const handleToggleWatchlist = (id) => {
    setWatchlists(watchlists.map(list =>
      list.id === id ? { ...list, checked: !list.checked } : list
    ));
  };

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
            <TouchableOpacity style={styles.addButton} onPress={handleAddWatchlist}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.watchlistOptions}>
            {watchlists.map(list => (
              <TouchableOpacity key={list.id} style={styles.checkboxContainer} onPress={() => handleToggleWatchlist(list.id)}>
                <View style={[styles.checkbox, list.checked && styles.checkedCheckbox]} />
                <Text style={styles.watchlistName}>{list.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
});

export default AddToWatchlistModal;
