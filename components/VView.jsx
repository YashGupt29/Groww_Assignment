import React from 'react';
import { View, StyleSheet } from 'react-native';

const VView = ({ children, style }) => {
  return <View style={[styles.VView, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  VView: {
    // Default styles for VView
  },
});

export default VView;
