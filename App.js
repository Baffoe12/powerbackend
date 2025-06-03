import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loginscreen from './screens/Loginscreen';
import Signupscreen from './screens/Signupscreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import Home from './screens/Home';
import SensorHistory from './screens/SensorHistory';
import Map from './screens/Map';
import Download from './screens/Download';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon = '';
          if (route.name === 'Home') {
            icon = '🏠';
          } else if (route.name === 'SensorHistory') {
            icon = '📜';
          } else if (route.name === 'Map') {
            icon = '🗺️';
          } else if (route.name === 'Download') {
            icon = '⬇️';
          }
          return (
            <Text style={{ fontSize: size, color: focused ? '#007AFF' : 'gray' }}>
              {icon}
            </Text>
          );
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SensorHistory" component={SensorHistory} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Download" component={Download} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="Signup" component={Signupscreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
