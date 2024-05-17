import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ActivityPage from './screens/ActivityPage';
import ServicesPage from './screens/ServicesPage';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './secondary screens/SettingsScreen';
import PaymentOptionsPage from './secondary screens/PaymentsMethods';
import EPayPage from './screens/EPayPage';
import MechanicScreen from './secondary screens/MechanicScreen';
import LocationScreen from './secondary screens/LocationScreen';
import UserInfo from './secondary screens/UserInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './Redux/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator initialRouteName='Home' screenOptions={{
    tabBarActiveTintColor: 'green',
    tabBarInactiveTintColor: '#86868b',
    tabBarLabelStyle: { fontFamily: 'Asap-Regular' },
    tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0.5, borderColor: '#ccc', paddingBottom: 4, paddingVertical: 4},
    headerStyle : { borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0, backgroundColor: '#FFF' },
  }}>
    <Tab.Screen name="Services" component={ServicesPage} options={{
      tabBarIcon: ({ color }) => <Ionicons name="hammer-outline" size={20} color={color} />,
      headerStyle: { borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0, backgroundColor: '#F3F6FC' },
      tabBarStyle: { backgroundColor: '#F3F6FC', borderTopWidth: 0.5, borderColor: '#ccc', paddingBottom: 4, paddingVertical: 4 },
      title: 'Services',
      headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 16 },
    }} />
    <Tab.Screen name="Activity" component={ActivityPage} options={{
      title: 'Activity',
      headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 16 },
      tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={20} color={color} />,
    }} />
    <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
      title: 'Arduiva',
      tabBarLabel: 'Home',
      headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 16 },
    }} />
    <Tab.Screen name="E_Pay" component={EPayPage} options={{
      title: 'E_Pay',
      headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 16 },
      tabBarIcon: ({ color }) => <Ionicons name="card-outline" size={20} color={color} />,
    }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
      title: 'Profile',
      headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 16 },
      tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />,
    }} />
  </Tab.Navigator>
)
export default function App() {
  const [loaded] = useFonts({
    'Asap-Bold': require('./assets/fonts/Asap-Bold.ttf'),
    'Asap-Regular': require('./assets/fonts/Asap-Regular.ttf'),
    'Asap-Medium': require('./assets/fonts/Asap-Medium.ttf'),
    'Asap-SemiBold': require('./assets/fonts/Asap-SemiBold.ttf'),
    'Asap-Light': require('./assets/fonts/Asap-Light.ttf'),
    'Asap-MediumItalic': require('./assets/fonts/Asap-MediumItalic.ttf'),
    'PTMono-Regular': require('./assets/fonts/PTMono-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
  });

  if (!loaded) {
    return null; // Render null while fonts are loading
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs" screenOptions={{
            headerStyle: { borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0, backgroundColor: '#F3F6FC' },
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Add this line to enable slide from right transition
          }}>
            <Stack.Screen name="Tabs" component={AppTabs} />
            <Stack.Screen name="Settings" component={SettingsScreen} options = {{
              headerShown: true,
              headerStyle: { borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0, backgroundColor: '#F3F6FC' },
              
              headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 8 },
            }}/>
            <Stack.Screen name="Payments" component={PaymentOptionsPage} options = {{
              headerShown: true,
              headerStyle: { borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0, backgroundColor: '#F3F6FC' },
              
              headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 8 },

            }}/>
            <Stack.Screen name="Mechanic" component={MechanicScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name = 'UserInfo' component = {UserInfo} options = {{
              title : 'User Information',
              headerShown : true,
              headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 26, color: '#161818', paddingTop: 8 },
              headerStyle: {backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ccc', elevation: 1, shadowOpacity: 0}

              
           

              

            }} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Asap-regular',
  },
});
