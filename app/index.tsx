import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';

interface GradientTextProps {
  text: string;
  style: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, style }) => (
  <MaskedView
    maskElement={
      <Text className={style}>
        {text}
      </Text>
    }
  >
    <LinearGradient
      colors={['#82EE16', '#535151']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text className={`${style} opacity-0`}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const fullText = 'Everything outdoor ever|';
  const [isTyping, setIsTyping] = useState<boolean>(true);

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
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full items-left relative h-full top-[343px] px-4">
          <GradientText 
            text="frogit" 
            style="text-4xl font-medium text-green-500"
          />
          <Text className="text-white text-lg mb-8 text-left">{text}</Text>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            <Text className="text-black text-center font-semibold">Continue with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
            <Text className="text-black text-center font-semibold">Continue with Google</Text>
          </TouchableOpacity>

          <CustomButton
            title="Continue with email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full bg-gray-800"
            textStyles="text-white"
          />
          
          <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
            <Text className="text-white text-center font-semibold">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;



//this wasn't the gradeitn

// import React, { useState, useEffect } from 'react';
// import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';
// import { router } from 'expo-router';
// import CustomButton from '@/components/CustomButton';

// interface GradientTextProps {
//   text: string;
//   style: string;
// }

// const GradientText: React.FC<GradientTextProps> = ({ text, style }) => (
//   <MaskedView
//     maskElement={
//       <Text className={style}>
//         {text}
//       </Text>
//     }
//   >
//     <LinearGradient
//       colors={['#82EE16', '#535151']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//     >
//       <Text className={`${style} opacity-0`}>{text}</Text>
//     </LinearGradient>
//   </MaskedView>
// );

// const App: React.FC = () => {
//   const [text, setText] = useState<string>('');
//   const fullText = 'Everything outdoor ever|';
//   const [isTyping, setIsTyping] = useState<boolean>(true);

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

//   return (
//     <SafeAreaView className="bg-black h-full">
//       <ScrollView contentContainerStyle={{ height: '100%' }}>
//         <View className="w-full items-left relative h-full top-[343px] px-4">
//           <GradientText 
//             text="frogit" 
//             style="text-4xl font-medium text-green-500"
//           />
//           <Text className="text-white text-lg mb-8 text-left">{text}</Text>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
//             <Text className="text-black text-center font-semibold">Continue with Apple</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity className="w-full bg-white rounded-md py-3 mb-4 flex-row justify-center items-center">
//             <Text className="text-black text-center font-semibold">Continue with Google</Text>
//           </TouchableOpacity>

//           <CustomButton
//             title="Continue with email"
//             handlePress={() => router.push('/sign-in')}
//             containerStyles="w-full bg-gray-800 flex-row rounded-md py-3 mb-4"
//             textStyles="text-white text-center font-semibold"
//           />
          
//           <TouchableOpacity className="w-full border border-gray-700 rounded-md py-3">
//             <Text className="text-white text-center font-semibold">Log in</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default App;
















// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';
// import { Redirect, router } from 'expo-router';
// import CustomButton from '@/components/CustomButton';

// interface GradientTextProps {
//   text: string;
//   style: any;
// }

// const GradientText: React.FC<GradientTextProps> = ({ text, style }) => (
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

// const App: React.FC = () => {
//   const [text, setText] = useState<string>('');
//   const fullText = 'Everything outdoor ever|';
//   const [isTyping, setIsTyping] = useState<boolean>(true);

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

//   return (
//     <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
//       <ScrollView contentContainerStyle={{ height: '100%' }}>
//         <View style={{ width: '100%', alignItems: 'flex-start', position: 'relative', height: '100%', top: 343, paddingHorizontal: 16 }}>
//           <GradientText 
//             text="frogit" 
//             style={{ 
//               fontSize: 48, 
//               fontFamily: 'imedium',
//               fontWeight: '500',  // Adjust this if needed
//             }} 
//           />
//           <Text style={{ color: 'white', fontSize: 18, marginBottom: 32, textAlign: 'left' }}>{text}</Text>
          
//           <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 8, paddingVertical: 12, marginBottom: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//             {/* <Image source={require('./path-to-your-apple-logo.png')} style={{ width: 20, height: 20, marginRight: 8 }} /> */}
//             <Text style={{ color: 'black', textAlign: 'center', fontWeight: '600' }}>Continue with Apple</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 8, paddingVertical: 12, marginBottom: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//             {/* <Image source={require('./path-to-your-google-logo.png')} style={{ width: 20, height: 20, marginRight: 8 }} /> */}
//             <Text style={{ color: 'black', textAlign: 'center', fontWeight: '600' }}>Continue with Google</Text>
//           </TouchableOpacity>

//           <CustomButton
//             title="Continue with email"
//             handlePress={() => router.push('/sign-in')}
//             containerStyles={{ width: '100%', backgroundColor: '#4B5563', borderRadius: 8, paddingVertical: 12, marginBottom: 16 }}
//           />
          
//           <TouchableOpacity style={{ width: '100%', borderWidth: 1, borderColor: '#374151', borderRadius: 8, paddingVertical: 12 }}>
//             <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Log in</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default App;





























// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';
// import { Redirect, router } from 'expo-router';
// import CustomButton from '@/components/CustomButton';

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

// // interface GradientTextProps {
// //   text: string;
// //   style: any;
// // }

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
//           <CustomButton
// title = 'Continue with email'
// handlePress={() => router.push('/sign-in')}
// containerStyles = 'w-full mt-7'
// />

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }