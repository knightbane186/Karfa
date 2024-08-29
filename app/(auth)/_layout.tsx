import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuthContext } from './AuthProvider';

const RootLayout = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <>
      <Stack>
        {user ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Add other authenticated routes here */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="sign-in"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="sign-up"
              options={{
                headerShown: false   
              }}
            />
          </>
        )}
      </Stack>
      <StatusBar backgroundColor='#16122' style='light'/>
    </>
  );
};

const AuthLayout = () => (
  <AuthProvider>
    <RootLayout />
  </AuthProvider>
);

export default AuthLayout;