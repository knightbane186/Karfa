import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-3xl text-green-600 font-inter">Frogit</Text>
      <StatusBar style="auto" />
    </View>
  );
}

