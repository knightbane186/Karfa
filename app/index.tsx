// import { StatusBar } from 'expo-status-bar';
// import { Text, View, ScrollView } from 'react-native';
// import { Link } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';



// export default function App() {
//   return (
// <SafeAreaView className="bg-customBlack h-full">
//   <ScrollView contentContainerStyle={{height:'100%'}}>
//     <View className="w-full justify-center items-center h-full px-4">

//     </View>

//   </ScrollView>

// </SafeAreaView>
//   );
// }

// import { StatusBar } from 'expo-status-bar';
// import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { Link } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function App() {
//   return (
//     <SafeAreaView className="bg-black h-full">
//       <ScrollView contentContainerStyle={{height:'100%'}}>
//         <View className="w-full justify-center items-center h-full px-4">
//           <Text className="text-green-500 text-4xl mb-2">frogit</Text>
//           <Text className="text-white text-lg mb-8">Everything outdoor ever|</Text>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4">
//             <Text className="text-black text-center font-semibold">Continue with Apple</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4">
//             <Text className="text-black text-center font-semibold">Continue with Google</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full bg-gray-800 rounded-md py-3 mb-4">
//             <Text className="text-white text-center font-semibold">Sign up with email</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
//             <Text className="text-white text-center font-semibold">Log in</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [text, setText] = useState('');
  const fullText = 'Everything outdoor ever|';
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      let i = 0;
      interval = setInterval(() => {
        if (i < fullText.length) {
          setText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setText('');
            setIsTyping(true);
          }, 1000); // Wait for 1 second before restarting
        }
      }, 100); // Adjust typing speed here (100ms between each character)
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full items-left relative h-full top-[343px] px-4">
          <Text className="text-green-500 font-isemibold text-4xl mb-2 text-left">frogit</Text>
          <Text className="text-white text-lg mb-8 text-left">{text}</Text>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            {/* <Image source={require('./path-to-your-apple-logo.png')} className="w-5 h-5 mr-2" /> */}
            <Text className="text-black text-center font-semibold">Continue with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            {/* <Image source={require('./path-to-your-google-logo.png')} className="w-5 h-5 mr-2" /> */}
            <Text className="text-black text-center font-semibold">Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-full bg-gray-800 rounded-md py-3 mb-4">
            <Text className="text-white text-center font-semibold">Sign up with email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
            <Text className="text-white text-center font-semibold">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}