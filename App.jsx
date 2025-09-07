import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './screens/ExploreScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import { StyleSheet } from 'react-native';
import Colors from './constants/Colors'; 
import { getTabBarIcon } from './utils/getTabBarIcon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyScreen from './screens/CompanyScreen';
import CustomCompanyHeader from './components/CustomCompanyHeader'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
    })}
  >
    <Tab.Screen name="Home" component={ExploreScreen} />
    <Tab.Screen name="Watchlist" component={WatchlistScreen} />
  </Tab.Navigator>
  );
}

// Move header definition outside the component to avoid re-rendering
const renderCompanyHeader = (props) => <CustomCompanyHeader {...props} />;

function App() {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <SafeAreaProvider>
        <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default App;
