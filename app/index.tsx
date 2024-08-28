import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import Registration from './screens/RegistrationScreen';
interface GradientTextProps {
  text: string;
  style: any;
}

const GradientText: React.FC<GradientTextProps> = ({ text, style }) => (
  <MaskedView
    maskElement={
      <Text style={[style, { backgroundColor: 'transparent' }]}>
        {text}
      </Text>
    }
  >
    <LinearGradient
      colors={['#82EE16', '#535151']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={[style, { opacity: 0 }]}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

export default function App() {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View style={{ width: '100%', alignItems: 'flex-start', position: 'relative', height: '100%', top: 343, paddingHorizontal: 16 }}>
            <GradientText 
              text="frogit" 
              style={{ 
                fontSize: 48, 
                fontFamily: 'imedium',
                fontWeight: '500',  // Adjust this if needed
              }} 
            />
            <View style={{ minHeight: 40, marginBottom: 32 }}>
              <Text style={{ color: 'gray', fontSize: 18, textAlign: 'left' }}>{text}</Text>
            </View>
            
            <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 8, paddingVertical: 12, marginBottom: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center', fontWeight: '600' }}>Continue with Apple</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 8, paddingVertical: 12, marginBottom: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center', fontWeight: '600' }}>Continue with Google</Text>
            </TouchableOpacity>

            <CustomButton
              title="Register"
              handlePress={() => router.push('/Register')}
              containerStyles="w-full bg-gray-800 rounded-md py-3 mb-4 flex-row justify-center items-center"
              textStyles="text-white text-center font-semibold"
            />
            
            <TouchableOpacity             style={{ width: '100%', borderWidth: 1, borderColor: '#374151', borderRadius: 8, paddingVertical: 12 }} 
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Log in</Text>
              {/* <Link href="/(tabs)/home" className='text-red-400'>Home Page</Link> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}