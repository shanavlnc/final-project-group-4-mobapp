import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { PetsProvider } from './context/PetsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation';

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <ApplicationsProvider>
          <PaperProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </ApplicationsProvider>
      </PetsProvider>
    </AuthProvider>
  );
}