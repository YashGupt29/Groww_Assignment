import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { ThemeContext } from '../App';

const CustomThemeTabBarButton = (props) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity {...props} onPress={toggleTheme} style={styles.themeToggleButton}>
      <Ionicons 
        name={theme === 'dark' ? 'moon' : 'sunny'} 
        size={24} 
        color={Colors.white} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -3, 
    alignSelf: 'center',
    shadowColor: '#000',
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
