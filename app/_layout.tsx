
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
<Stack.Screen name="bookings" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});



// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { SplashScreen, Stack } from 'expo-router';
// import {useFonts} from 'expo-font'

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [fontsLoaded,error] = useFonts({
//     "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
//     'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
//   });
//   useEffect(()=> {
// if(error) throw error;
// if(fontsLoaded) SplashScreen.hideAsync();
//   },[fontsLoaded,error])

// if(!fontsLoaded && !error) return null;

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       {/* <Stack.Screen name="data" options={{ headerShown: false }} /> */}
//       {/* <Stack.Screen name="screens" options={{ headerShown: false }} /> */}
//       {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
//     </Stack>
//   );
// };

// export default RootLayout;

// const styles = StyleSheet.create({});