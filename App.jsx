import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './screens/ExploreScreen';
import WatchlistScreen from './screens/WatchlistScreen'; 
import { StyleSheet, useColorScheme, Appearance } from 'react-native';
import Colors from './constants/Colors'; 
import { getTabBarIcon } from './utils/getTabBarIcon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyScreen from './screens/CompanyScreen';
import StockListScreen from './screens/StockListScreen';
import CustomCompanyHeader from './components/CustomCompanyHeader'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient'; 
import CustomThemeTabBarButton from './components/ThemeToggleButton';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Toast from 'react-native-toast-message';

export const ThemeContext = React.createContext();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) =>
        getTabBarIcon({ route, focused, color, size }),
      tabBarActiveTintColor: Colors.primary, 
      tabBarInactiveTintColor: Colors.lightText, 
      tabBarStyle: styles.tabBarStyle,
    })}
  >
    <Tab.Screen name="Home" component={ExploreScreen} />
    <Tab.Screen 
      name="ThemeToggle" 
      component={ExploreScreen} 
      options={{
        tabBarLabel: () => null,
        tabBarButton: CustomThemeTabBarButton,
      }}
    />
    <Tab.Screen name="Watchlist" component={WatchlistScreen} />
  </Tab.Navigator>
  );
}

const renderCompanyHeader = (props) => <CustomCompanyHeader {...props} />;

function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setTheme(newColorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}> 
        <GestureHandlerRootView style={styles.rootView}>
          <SafeAreaProvider>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
              <NavigationContainer 
                style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
              >
                <Stack.Navigator>
                <Stack.Screen
                  name="Tabs"
                  component={Tabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CompanyScreen"
                  component={CompanyScreen}
                  options={{
                    header: renderCompanyHeader,
                    title: 'Detail Overview',
                  }}
                />
                <Stack.Screen name="StockList" component={StockListScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeContext.Provider>
        </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
      <Toast position='bottom' />
    </Provider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent', 
    elevation: 0,
  },
});

export default App;
