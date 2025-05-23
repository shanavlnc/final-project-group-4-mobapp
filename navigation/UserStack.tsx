import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import WelcomeScreen from '../screens/user/WelcomeScreen';
import HomeScreen from '../screens/user/HomeScreen';
import PetDetailScreen from '../screens/user/PetDetailScreen';
import SavedPetsScreen from '../screens/user/SavedPetsScreen';
import AboutScreen from '../screens/user/AboutScreen';
import AdoptionFormScreen from '../screens/user/AdoptionFormScreen';

export type UserStackParamList = {
  Welcome: undefined;
  Home: undefined;
  PetDetail: { petId: string };
  SavedPets: undefined;
  About: undefined;
  AdoptionForm: { petId: string };
};

const Stack = createNativeStackNavigator<UserStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SavedPets') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else {
            iconName = 'paw'; // default icon
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Browse Pets' }} />
      <Tab.Screen name="SavedPets" component={SavedPetsScreen} options={{ title: 'Saved Pets' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Tab.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PetDetail" 
        component={PetDetailScreen} 
        options={{ title: 'Pet Details' }}
      />
      <Stack.Screen 
        name="AdoptionForm" 
        component={AdoptionFormScreen} 
        options={{ title: 'Adoption Application' }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;