import Icon from 'react-native-vector-icons/FontAwesome';


export const getTabBarIcon = ({ route, focused, color, size }) => {
    let iconName;
  
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home';
    } else if (route.name === 'Watchlist') {
      iconName = focused ? 'star' : 'star-o';
    }
  
    return <Icon name={iconName} size={size} color={color} />;
  };
  