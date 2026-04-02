// // import React from "react";
// // import { NavigationContainer } from "@react-navigation/native";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // import LoginScreen from "../screens/LoginScreen";
// // import RegisterScreen from "../screens/RegisterScreen";
// // import DashboardScreen from "../screens/DashboardScreen";

// // const Stack = createNativeStackNavigator();

// // export default function AppNavigator() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator screenOptions={{ headerShown: false }}>
// //         <Stack.Screen name="Login" component={LoginScreen} />
// //         <Stack.Screen name="Register" component={RegisterScreen} />
// //         <Stack.Screen name="Dashboard" component={DashboardScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import FreeDeliveryOnboarding from "../screens/LoginScreen";
// import RegisterScreen from "../screens/RegisterScreen";
// import AdminTabNavigator from "./AdminTabNavigator";
// import VideoDetailScreen from "../admin/VideoDetailScreen";
// import DashboardScreen from "../screens/DashboardScreen";
// import SearchScreen from "../screens/SearchScreen";
// import DetailsScreen from "../screens/DetailsScreen";
// import {
//   SignUpScreen,
//   LoginScreen,
//   AccessLocationScreen,
// } from "../screens/Authscreens.js";
// import CartScreen from "../screens/Cartscreen.js";
// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Logins" component={FreeDeliveryOnboarding} />
//         <Stack.Screen name="Home" component={DashboardScreen} />
//         <Stack.Screen name="Search" component={SearchScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//         <Stack.Screen name="AdminPanel" component={AdminTabNavigator} />

//         <Stack.Screen name="Signup" component={SignUpScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="AccessLocation" component={AccessLocationScreen} />
//         <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
//         <Stack.Screen name="Cart" component={CartScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import MyBidsScreen from '../screens/MyBidsScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CarDetailScreen from '../screens/CarDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'MyBids') iconName = focused ? 'hammer' : 'hammer-outline';
          else if (route.name === 'Wallet') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E30613',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 8 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="MyBids" component={MyBidsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen 
          name="CarDetail" 
          component={CarDetailScreen} 
          options={{ 
            headerShown: true, 
            title: 'Car Details',
            headerTintColor: '#E30613',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}