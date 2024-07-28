import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
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
        <View className="w-full justify-center h-full px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-imedium">
            Sign up to Karfa!
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7 bg-green-500"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-green-600">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;




// import { View, Text, ScrollView, Image } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { images } from '../../constants';
// import FormField from '@/components/FormField';
// import CustomButton from '@/components/CustomButton';
// import { Link } from 'expo-router';
// import signUp from './sign-up';

// const SignUp = () => {

//     const [form,setForm] =useState({
//         username: '',
//        email: '',
//         password:''
//     })

//     const [isSubmitting, setSubmitting] = useState(false)

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
//            Sign up to Karfa!
//           </Text>
//           <FormField
//           title="Username"
//           value={form.username}
//           handleChangeText={(e) => setForm({
// ...form,
// email:e
//           })}
//           otherStyles="mt-10"
  
//           />
//                     <FormField
//           title="Password"
//           value={form.password}
//           handleChangeText={(e) => setForm({
// ...form,
// password:e
// //making sure that all tghe aspectrs are comvered
//           })}
//           otherStyles="mt-7"
//           />
// <CustomButton
// title = "Sign In"
// handlePress={submit}
// containerStyles="mt-7"
// isLoading={isSubmitting}

// //adding more formulation
// //I dont know if i should be doing this 

// />
// <View className="justify-center pt-5 flex-row gap-2" >
// <Text className = "text-lg text-gray-100 font-pregular">
//     Have an account already
// </Text>
// <Link href="/sign-up" className='text-lg font-psemibold text-green-600'>Sign in</Link>
// </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default SignUp;


