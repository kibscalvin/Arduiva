import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivityPage from './screens/ActivityPage';
import ServicesPage from './screens/ServicesPage';
import ProfilePage from './screens/ProfilePage';
import EPayPage from './screens/EPayPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';

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
          screenOptions={{   //Global settings for all navigation screens across the app, if you use screenOptions prop.
            tabBarActiveTintColor: '#054405', // Change the active icon color here
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'Asap-Regular', marginBottom: 4 },
            headerStyle: { backgroundColor: '#fff', height: 100, borderBottomWidth: 1, borderColor: '#ccc', elevation: 5, shadowColor : 'gray'},
            headerStatusBarHeight: 50,
            headerTitleStyle: { fontSize: 28, fontFamily: 'Asap-SemiBold' },
          }}
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
          name = 'E_Pay'
          component = {EPayPage}
          options = {{
            tabBarLabel: 'E-Pay',
            tabBarIcon: ({ color }) => <Ionicons name="card-outline" size={20} color={color} />, // Pass color prop to icon
          
          }}
          />
         
      
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />, // Pass color prop to icon
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
