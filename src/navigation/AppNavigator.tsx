import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types';
import { WelcomeScreen } from '../screens/user/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { UserStack } from './UserStack';
import { AdminStack } from './AdminStack';
import { Loader } from '../components/Loader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{
                animationTypeForReplace: user ? 'push' : 'pop',
              }}
            />
            <Stack.Screen name="UserStack" component={UserStack} />
          </>
        ) : user.isAdmin ? (
          <Stack.Screen name="AdminStack" component={AdminStack} />
        ) : (
          <Stack.Screen name="UserStack" component={UserStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};