import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';

const CustomThemeTabBarButton = (props) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];
  return (
    <TouchableOpacity {...props} onPress={toggleTheme} style={styles(currentColors).themeToggleButton}>
      <Ionicons 
        name={theme === 'dark' ? 'moon' : 'sunny'} 
        size={24} 
        color={currentColors.white} 
      />
    </TouchableOpacity>
  );
};

const styles = (currentColors) => StyleSheet.create({
  themeToggleButton: {
    backgroundColor: currentColors.primary,
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -3, 
    alignSelf: 'center',
    shadowColor: currentColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
});

export default CustomThemeTabBarButton;
