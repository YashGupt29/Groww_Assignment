import { StyleSheet } from 'react-native';
import Colors from './Colors';
import { ThemeContext } from '../App';

const AppStyles = (currentColors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: currentColors.background,
  },
  headerContainer: {
    padding: 15,
    backgroundColor: currentColors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: currentColors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: currentColors.text,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardContainer: {
    backgroundColor: currentColors.cardBackground,
    borderRadius: 8,
    padding: 10,
    margin: 8,
    shadowColor: currentColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: currentColors.inputBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  // Typography
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: currentColors.text,
  },
  bodyText: {
    fontSize: 14,
    color: currentColors.lightText,
  },
  // Flexbox helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStyles;
