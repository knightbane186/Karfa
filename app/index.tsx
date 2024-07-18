import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { Link } from 'expo-router';


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      
      <Text className="text-3xl text-gray-400 font-isemibold">Frogit</Text>
      <Link href="/home" style={{color:'blue'}}>go to profile
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
