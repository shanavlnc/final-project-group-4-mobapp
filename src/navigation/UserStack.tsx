import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/colors';
import { UserStackParamList, UserTabParamList } from '../types';
import { HomeScreen } from '../screens/user/HomeScreen';
import { SavedPetsScreen } from '../screens/user/SavedPetScreen';
import { AboutScreen } from '../screens/user/AboutScreen';
import { PetDetailScreen } from '../screens/user/PetDetailsScreen';
import { AdoptionFormScreen } from '../screens/user/AdoptionFormScreen';

const Tab = createBottomTabNavigator<UserTabParamList>();
const Stack = createStackNavigator<UserStackParamList>();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.background },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PetDetail" component={PetDetailScreen} />
    <Stack.Screen 
      name="AdoptionForm" 
      component={AdoptionFormScreen}
      options={{
        headerShown: true,
        title: 'Adoption Application',
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

export const UserStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'Browse') {
          iconName = focused ? 'paw' : 'paw-outline';
        } else if (route.name === 'Saved') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: theme.textLight,
      tabBarStyle: {
        backgroundColor: theme.cardBackground,
        borderTopWidth: 0,
        paddingBottom: 4,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 4,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Browse" 
      component={HomeStack} 
      options={{ title: 'Browse Pets' }}
    />
    <Tab.Screen 
      name="Saved" 
      component={SavedPetsScreen} 
      options={{ title: 'Saved Pets' }}
    />
    <Tab.Screen 
      name="About" 
      component={AboutScreen} 
      options={{ title: 'About Us' }}
    />
  </Tab.Navigator>
);