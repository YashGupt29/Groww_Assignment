import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import Colors from '../constants/Colors';
import { getTabBarIcon } from '../utils/getTabBarIcon';
import CustomThemeTabBarButton from './ThemeToggleButton';
import { ThemeContext } from '../App';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function Tabs() {
  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  const tabScreens = [
    { name: "Home", component: ExploreScreen, options: {} },
    {
      name: "ThemeToggle",
      component: ExploreScreen,
      options: {
        tabBarLabel: () => null,
        tabBarButton: CustomThemeTabBarButton,
      },
    },
    { name: "Watchlist", component: WatchlistScreen, options: {} },
  ];

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
      {tabScreens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = (currentColors) => StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: currentColors.cardBackground,
    elevation: 0,
    bottom: 0,
    borderTopWidth: 0
  },
});

export default Tabs;
