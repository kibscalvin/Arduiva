import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivityPage from './screens/ActivityPage';
import ServicesPage from './screens/ServicesPage';
import ProfilePage from './screens/ProfilePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Asset from 'react-native-asset';


export default function App() {
  const Tab = createBottomTabNavigator();


 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
       
          initialRouteName="Home"
          screenOptions={{
           
            tabBarStyle: { backgroundColor: '#fafafa' }, // Fix syntax error here
            headerStyle: { backgroundColor: '#fafafa', height: 100 },
            headerStatusBarHeight: 50,
            headerTitleStyle: { fontSize:28}
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => <Ionicons name="home" size={20} color="#86868b" />,
              headerTitle: 'Arduiva',
            }}
          />
          <Tab.Screen
            name="Activity"
            component={ActivityPage}
            options={{
              tabBarLabel: 'Activity',
              tabBarIcon: () => <Ionicons name="book" size={20} color="#86868b" />,
            }}
          />
          <Tab.Screen
            name="Services"
            component={ServicesPage}
            options={{
              tabBarLabel: 'Services',
              tabBarIcon: () => <Ionicons name="settings" size={20} color="#86868b" />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: () => <Ionicons name="person" size={20} color="#86868b" />,
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
  },
});
