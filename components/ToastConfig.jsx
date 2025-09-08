import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { BaseToast } from 'react-native-toast-message';
import Colors from '../constants/Colors';

export const ToastConfig = {
  watchlistSuccess: ({ text1, text2, props, ...rest }) => {
    const { currentColors, onButtonPress } = props;

    return (
      <BaseToast
        {...rest}
        style={{width:'100%', borderLeftColor: currentColors.green, backgroundColor: currentColors.cardBackground,marginBottom:"-15" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: currentColors.text, fontSize: 15, fontWeight: '400' }}
        text2Style={{ color: currentColors.lightText, fontSize: 13 }}
        text1={text1}
        text2={text2}
        trailingIcon={null} // Remove default arrow
        renderTrailingIcon={() =>
          onButtonPress ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity onPress={onButtonPress} style={styles(currentColors).changeButton}>
                <Text style={styles(currentColors).changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    );
  },

  success: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: props?.currentColors?.green || Colors.light.green, backgroundColor: props?.currentColors?.cardBackground || Colors.light.cardBackground }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ color: props?.currentColors?.text || Colors.light.text, fontSize: 15, fontWeight: '400' }}
      text2Style={{ color: props?.currentColors?.lightText || Colors.light.lightText, fontSize: 13 }}
      text1={text1}
      text2={text2}
    />
  ),
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
      backgroundColor: currentColors.primary, 
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginLeft: 10,
    },
    changeButtonText: {
      color: currentColors.white,
      fontWeight: 'bold',
    },
  });
