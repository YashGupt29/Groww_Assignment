import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyScreen from './screens/CompanyScreen';
import StockListScreen from './screens/StockListScreen';
import CustomCompanyHeader from './components/CustomCompanyHeader';
import Tabs from './components/Tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import Toast from 'react-native-toast-message';
import { ToastConfig } from './components/ToastConfig';
import SplashScreen from './screens/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { getNavigationTheme } from './utils/navigation';
import { StyleSheet, useColorScheme, Appearance } from 'react-native';
import Colors from './constants/Colors';

export const ThemeContext = React.createContext();


function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    const handleColorSchemeChange = ({ colorScheme: newColorScheme }) => {
      setTheme(newColorScheme);
    };

    const subscription = Appearance.addChangeListener(handleColorSchemeChange);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      subscription.remove();
      clearTimeout(timer);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={styles(Colors[theme]).rootView}>
            <SafeAreaProvider>
              <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <NavigationContainer
                theme={getNavigationTheme(theme)}
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
                    header: CustomCompanyHeader,
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
      </ErrorBoundary>
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
