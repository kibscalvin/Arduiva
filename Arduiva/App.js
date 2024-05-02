import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivityPage from './screens/ActivityPage';
import ServicesPage from './screens/ServicesPage';
//import EPayPage from './screens/EPayPage';
import ProfilePage from './screens/ProfilePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, PTSans_400Regular, PTSans_400Regular_Italic, PTSans_700Bold, PTSans_700Bold_Italic } from '@expo-google-fonts/pt-sans';

export default function App() {
  const Tab = createBottomTabNavigator();
  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    // You can return a loading indicator or null while the fonts are loading
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Ionicons name="home" size={20} color="#161818" />
        }}/>
        <Tab.Screen name="Activity" component={ActivityPage} options={{
            tabBarLabel: 'Activity',
            tabBarIcon: () => <Ionicons name="book" size={20} color="#161818" />
        }}/>
        <Tab.Screen name="Services" component={ServicesPage} options={{
            tabBarLabel: 'Services',
            tabBarIcon: () => <Ionicons name="settings" size={20} color="#161818" />
        }}/>
        {/* <Tab.Screen name="EPay" component={EPayPage} options={{
            tabBarLabel: 'EPay',
            tabBarIcon: () => <Ionicons name="card" size={20} color="#161818" />
        }}/> */}
        <Tab.Screen name="Profile" component={ProfilePage} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => <Ionicons name="person" size={20} color="#161818" />
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
