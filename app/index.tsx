import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { Link } from 'expo-router';



export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      
      <Text className="text-3xl text-green-600 font-Inter-variable">Frogit</Text>
      <Link href="/profile" style={{color:'blue'}}>go to profile
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
