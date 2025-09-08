import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';

const DurationSelector = ({ selectedDuration, onSelectDuration }) => {
  const durations = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  return (
    <View style={styles(currentColors).container}>
      <View style={styles(currentColors).selectorWrapper}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles(currentColors).durationButton,
              selectedDuration === duration && styles(currentColors).selectedDurationButton,
            ]}
            onPress={() => onSelectDuration(duration)}
          >
            <Text
              style={[
                styles(currentColors).durationText,
                selectedDuration === duration && styles(currentColors).selectedDurationText,
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

const styles = (currentColors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: currentColors.background,
  },
  selectorWrapper: {
    flexDirection: 'row',
    backgroundColor: currentColors.inputBackground,
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
    backgroundColor: currentColors.brown,
  },
  durationText: {
    color: currentColors.lightText,
    fontWeight: 'bold',
  },
  selectedDurationText: {
    color: currentColors.white,
  },
});

export default DurationSelector;
