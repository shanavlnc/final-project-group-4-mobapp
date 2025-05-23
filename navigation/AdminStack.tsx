import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AddEditPetScreen from '../screens/admin/AddEditPetScreen';
import ApplicationsScreen from '../screens/admin/ApplicationsScreen';
import ApprovedApplicationsScreen from '../screens/admin/ApprovedApplicationsScreen';
import { Ionicons } from '@expo/vector-icons';

export type AdminStackParamList = {
  AdminHome: undefined;
  AddEditPet: { petId?: string };
  Applications: undefined;
  ApprovedApplications: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();
const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'AdminHome') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'Applications') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ApprovedApplications') {
            iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="AdminHome" component={AdminHomeScreen} options={{ title: 'Pets' }} />
      <Tab.Screen name="Applications" component={ApplicationsScreen} options={{ title: 'Applications' }} />
      <Tab.Screen name="ApprovedApplications" component={ApprovedApplicationsScreen} options={{ title: 'Approved' }} />
    </Tab.Navigator>
  );
};

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminHome" 
        component={AdminTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddEditPet" 
        component={AddEditPetScreen} 
        options={{ title: 'Add/Edit Pet' }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;