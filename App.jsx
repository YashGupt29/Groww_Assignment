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
import { store } from './utils/store';
import Toast from 'react-native-toast-message';
import { ToastConfig } from './components/ToastConfig';
import SplashScreen from './screens/SplashScreen';

export const ThemeContext = React.createContext();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) =>
        getTabBarIcon({ route, focused, color, size }),
      tabBarActiveTintColor: currentColors.primary,
      tabBarInactiveTintColor: currentColors.lightText,
      tabBarStyle: styles(currentColors).tabBarStyle,
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setTheme(newColorScheme);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}> 
        <GestureHandlerRootView style={styles(Colors[theme]).rootView}>
          <SafeAreaProvider>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
              <NavigationContainer 
                theme={{
                  dark: theme === 'dark',
                  colors: {
                    primary: Colors[theme].primary,
                    background: Colors[theme].background,
                    card: Colors[theme].cardBackground,
                    text: Colors[theme].text,
                    border: Colors[theme].borderColor,
                    notification: Colors[theme].secondary,
                  },
                  fonts: { 
                    regular: {}
                  },
                }}
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
      <Toast config={ToastConfig} position='bottom' bottomOffset={0} />
    </Provider>
  );
}

const styles = (currentColors) => StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: currentColors.background,
  },
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: currentColors.cardBackground,
    elevation: 0,
    bottom: 0,
    borderTopWidth: 0
  },
});

export default App;
