import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Colors from '../constants/Colors';

export const ToastConfig = {
  watchlistSuccess: ({ text1, text2, props, ...rest }) => {
    const { currentColors, onButtonPress } = props;
    return (
      <View style={styles(currentColors).customToastContainer}>
        <BaseToast
          {...rest}
          style={[{ borderLeftColor: currentColors.green, backgroundColor: currentColors.cardBackground, flex: 1 }]}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{ color: currentColors.text, fontSize: 15, fontWeight: '400' }}
          text2Style={{ color: currentColors.lightText, fontSize: 13 }}
          text1={text1}
          text2={text2}
        />
        {onButtonPress && (
          <TouchableOpacity onPress={onButtonPress} style={styles(currentColors).changeButton}>
            <Text style={styles(currentColors).changeButtonText}>Change</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
};

const styles = (currentColors) => StyleSheet.create({
    customToastContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      backgroundColor: 'transparent',
      borderRadius: 8,
      minHeight: 60,
    },
    changeButton: {
      backgroundColor: Colors.light.primary, 
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginLeft: 10,
    },
    changeButtonText: {
      color: Colors.light.white,
      fontWeight: 'bold',
    },
  });
