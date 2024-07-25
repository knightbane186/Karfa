
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import CustomButton from '@/components/customButton'; // Import the CustomButton component

// ... (GradientText component remains unchanged)

export default function App() {
  // ... (useState and useEffect remain unchanged)

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full items-left relative h-full top-[343px] px-4">
          <GradientText 
            text="frogit" 
            style={{ 
              fontSize: 48, 
              fontFamily: 'imedium',
              fontWeight: '500'
            }} 
          />
          <Text className="text-white text-lg mb-8 text-left">{text}</Text>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            <Text className="text-black text-center font-semibold">Continue with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            <Text className="text-black text-center font-semibold">Continue with Google</Text>
          </TouchableOpacity>
          
          {/* Replace TouchableOpacity with CustomButton for "Sign up with email" */}
          <CustomButton
            title="Sign up with email"
            onPress={() => {/customButton}}
            style={{
              backgroundColor: '#1F2937', // Equivalent to bg-gray-800
              borderRadius: 6, // Equivalent to rounded-md
              marginBottom: 16, // Equivalent to mb-4
            }}
            textStyle={{
              color: 'white',
              fontWeight: '600', // Equivalent to font-semibold
              textAlign: 'center',
            }}
          />
          
          <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
            <Text className="text-white text-center font-semibold">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}





























// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';



// const GradientText = ({ text, style }) => (
//   <MaskedView
//     maskElement={
//       <Text style={[style, { backgroundColor: 'transparent' }]}>
//         {text}
//       </Text>
//     }
//   >
//     <LinearGradient
//       colors={['#82EE16', '#535151']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//     >
//       <Text style={[style, { opacity: 0 }]}>{text}</Text>
//     </LinearGradient>
//   </MaskedView>
// );

// export default function App() {
//   const [text, setText] = useState('');
//   const fullText = 'Everything outdoor ever|';
//   const [isTyping, setIsTyping] = useState(true);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isTyping) {
//       let i = 0;
//       interval = setInterval(() => {
//         if (i < fullText.length) {
//           setText((prev) => prev + fullText.charAt(i));
//           i++;
//         } else {
//           setIsTyping(false);
//           setTimeout(() => {
//             setText('');
//             setIsTyping(true);
//           }, 1000); // Wait for 1 second before restarting
//         }
//       }, 100); // Adjust typing speed here (100ms between each character)
//     }
//     return () => clearInterval(interval);
//   }, [isTyping]);
// // just adding the basics/s creen time is done 

//   return (
//     <SafeAreaView className="bg-black h-full">
//       <ScrollView contentContainerStyle={{height:'100%'}}>
//         <View className="w-full items-left relative h-full top-[343px] px-4">
//           <GradientText 
//             text="frogit" 
//             style={{ 
//               fontSize: 48, 
//               fontFamily: 'imedium',
//               fontWeight: '500'  // Adjust this if needed
//             }} 
//           />
//           <Text className="text-white text-lg mb-8 text-left">{text}</Text>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
//             {/* <Image source={require('./path-to-your-apple-logo.png')} className="w-5 h-5 mr-2" /> */}

//             <Text className="text-black text-center font-semibold">Continue with Apple</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
//             {/* <Image source={require('./path-to-your-google-logo.png')} className="w-5 h-5 mr-2" /> */}
//             <Text className="text-black text-center font-semibold">Continue with Google</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full bg-gray-800 rounded-md py-3 mb-4">
//             {/* <Text className="text-white text-center font-semibold">Sign up with email</Text> */}
//             <Text className="text-black text-center font-semibold">Sign up with email</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
//             <Text className="text-white text-center font-semibold">Log in</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }