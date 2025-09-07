import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const DurationSelector = ({ selectedDuration, onSelectDuration }) => {
  const durations = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  return (
    <View style={styles.container}>
      <View style={styles.selectorWrapper}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.selectedDurationButton,
            ]}
            onPress={() => onSelectDuration(duration)}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === duration && styles.selectedDurationText,
              ]}
            >
              {duration}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  selectorWrapper: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    borderRadius: 20,
    border:2,
    overflow: 'hidden',
  },
  durationButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedDurationButton: {
    backgroundColor: Colors.brown,
  },
  durationText: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  selectedDurationText: {
    color: Colors.white,
  },
});

export default DurationSelector;
