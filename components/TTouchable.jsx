import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const TTouchable = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.TTouchable, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TTouchable: {
    // Default styles for TTouchable
  },
});

export default TTouchable;
