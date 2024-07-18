import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  return (
<SafeAreaView className="bg-customBlack h-full">
  <ScrollView contentContainerStyle={{height:'100%'}}>
    <View className="w-full justify-center items-center h-full px-4">

    </View>

  </ScrollView>

</SafeAreaView>
  );
}
