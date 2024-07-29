import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Form submitted:', form);
    }, 2000);
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-imedium">
            Log in to Karfa
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 bg-green-800"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-1">
            <Text className="text-md text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-md font-psemibold text-green-600">
              Sign-up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;








// import { View, Text, ScrollView, Image } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { images } from '../../constants';
// import FormField from '@/components/FormField';
// import CustomButton from '@/components/CustomButton';
// import { Link } from 'expo-router';
// import signUp from './sign-up';

// const SignIn = () => {

//     const [form,setForm] =useState({
//        email: '',
//         password:''
//     })

//     const [isSubmitting, setisSubmitting] = useState(false)

//     const submit = () => {

//     }

//   return (
//     <SafeAreaView className="bg-black h-full">
//       <ScrollView>
//         <View className="w-full justify-center h-full px-4 my-6">
//           <Image 
//             source={images.logo}
//             resizeMode='contain' // Fixed the case for resizeMode
//             className="w-[115px] h-[35px]"
//           />
//           <Text className="text-2xl text-white font-semibold mt-10 font-imedium">
//             Log in to Karfa
//           </Text>
//           <FormField
//           title="Email"
//           value={form.email}
//           handleChangeText={(e) => setForm({
// ...form,
// email:e
//           })}
//           otherStyles="mt-7"
//           keyBoardType="email-address"
//           />
//                     <FormField
//           title="Password"
//           value={form.password}
//           handleChangeText={(e) => setForm({
// ...form,
// password:e
//           })}
//           otherStyles="mt-7"
//           />
// <CustomButton
// title = "Sign In"
// handlePress={submit}
// containerStyles="mt-7"
// isLoading={isSubmitting}

// />
// <View className="justify-center pt-1 flex-row gap-1" >
// <Text className = "text-md text-gray-100 font-pregular">
//     Don't have an account?
// </Text>
// <Link href="/sign-up" className='text-md font-psemibold text-green-600'>Sign-up</Link>
// </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default SignIn;


