import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivityPage from './screens/ActivityPage';
import ServicesPage from './screens/ServicesPage';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import PaymentOptionsPage from './screens/PaymentsMethods';
import EPayPage from './screens/EPayPage';
import FuelScreen from './screens/FuelScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MechanicScreen from './screens/MechanicScreen';

//wrap the main app in a provider to allow for global state management


const Stack = createStackNavigator();
function ProfileStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Settings') {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]); // Close the useEffect hook and add its dependencies array

  return (
    <Stack.Navigator screenOptions={(route) => ({
      headerStyle: { backgroundColor: '#fff', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor : 'gray'},
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 28, fontFamily: 'Asap-SemiBold' },
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
      tabBarVisible: getTabBarVisibility(route) 
    })}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerTitle : 'Profile',
        }} 
        />
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerTitle: 'Settings',
        tabBarVisible: false,
        headerStyle : { backgroundColor: '#F3F6FC', borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor: 'gray'}

        }} 
        
        />
        <Stack.Screen name = 'Payments' component = {PaymentOptionsPage}
        options = {{
          headerTitle: 'Payment Methods',
          headerStyle : { backgroundColor: '#F3F6FC', borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor: 'gray'}

        }}
          />
          
    </Stack.Navigator>
  );
}


const MechanicStack = () =>{
  return (
    <Stack.Navigator screenOptions={(route) => ({
      headerStyle: { backgroundColor: '#fff', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor : 'gray'},
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 28, fontFamily: 'Asap-SemiBold' },
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS, 
    })}
    >
      <Stack.Screen name="Mechanic" component={MechanicScreen} 
      options={{
        headerTitle : 'Mechanic',
        }} 
        />
    </Stack.Navigator>
  );
}



    <Stack.Navigator screenOptions={(route) => ({
      headerStyle: { backgroundColor: '#fff', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor : 'gray'},
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 28, fontFamily: 'Asap-SemiBold' },
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS, 
    })}
    >
      <Stack.Screen name="Mechanic" component={MechanicScreen} 
      options={{
        headerTitle : 'Mechanic',
        }} 
        />
    </Stack.Navigator>


const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName !== 'Settings'; // Hide tab bar on the "Settings" screen
};


export default function App() {
  const Tab = createBottomTabNavigator();
  

  const [loaded] = useFonts({
    'Asap-Bold': require('./assets/fonts/Asap-Bold.ttf'),
    'Asap-Regular': require('./assets/fonts/Asap-Regular.ttf'),
    'Asap-Medium': require('./assets/fonts/Asap-Medium.ttf'),
    'Asap-SemiBold': require('./assets/fonts/Asap-SemiBold.ttf'),
    'Asap-Light': require('./assets/fonts/Asap-Light.ttf'),
    'Asap-MediumItalic': require('./assets/fonts/Asap-MediumItalic.ttf'),
    'PTMono-Regular': require('./assets/fonts/PTMono-Regular.ttf'),
  });
  if (!loaded) {
    return null; // Render null while fonts are loading
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
   <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#054405', // Change the active icon color here
      tabBarStyle: { backgroundColor: '#fff' },
      tabBarLabelStyle: { fontSize: 12, fontFamily: 'Asap-Regular', marginBottom: 4 },
      headerStyle: { backgroundColor: '#fff', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor : 'gray'},
      headerStatusBarHeight: 50,
      headerTitleStyle: { fontSize: 28, fontFamily: 'Asap-SemiBold' },
      tabBarVisible: route.name !== 'Settings', // Hide tab bar on Settings screen
    })}
  >
    <Tab.Screen
      name="Services"
      component={ServicesPage}
      options={{
        tabBarLabel: 'Services',
        tabBarIcon: ({ color }) => <Ionicons name="hammer-outline" size={20} color={color} />, // Pass color prop to icon
        headerStyle: { backgroundColor: '#F3F6FC', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 0},
        tabBarStyle: { backgroundColor: '#F3F6FC' },
      }}
    />
    <Tab.Screen
      name="Activity"
      component={ActivityPage}
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={20} color={color} />, // Pass color prop to icon
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />, // Pass color prop to icon
        headerTitle: 'Arduiva',
      }}
    />
    <Tab.Screen 
      name='E_Pay'
      component={EPayPage}
      options={{
        tabBarLabel: 'E-Pay',
        tabBarIcon: ({ color }) => <Ionicons name="card-outline" size={20} color={color} />, // Pass color prop to icon
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />, // Pass color prop to icon
        headerShown: false,
      }}
    />
  </Tab.Navigator>
</NavigationContainer>


      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '', // Set the background color for the entire app
    fontFamily: 'Asap-Regular',
  },
});
