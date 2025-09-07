import { StyleSheet } from 'react-native';
import Colors from './Colors';

const AppStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    padding: 15,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 10,
    margin: 8,
    shadowColor: Colors.black,
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
    backgroundColor: Colors.inputBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  // Typography
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.lightText,
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
