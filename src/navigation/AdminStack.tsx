import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../constants/colors';
import { AdminStackParamList } from '../types';
import { AdminDashboard } from "../screens/admin/AdminDashboard";
import { PetManagementScreen } from '../screens/admin/PetManagementScreen';
import { AddPetModal } from '../screens/admin/AddPetModal';
import { ApplicationReviewScreen } from '../screens/admin/ApplicationReviewScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      contentStyle: {
        backgroundColor: theme.background,
      },
    }}
  >
    <Stack.Screen
      name="AdminDashboard"
      component={AdminDashboard}
      options={{ title: 'Dashboard' }}
    />
    <Stack.Screen
      name="PetManagement"
      component={PetManagementScreen}
      options={{ title: 'Manage Pets' }}
    />
    <Stack.Screen
      name="AddPet"
      component={AddPetModal}
      options={{
        presentation: 'modal',
        title: 'Add New Pet',
      }}
    />
    <Stack.Screen
      name="ApplicationReview"
      component={ApplicationReviewScreen}
      options={{ title: 'Applications' }}
    />
  </Stack.Navigator>
);