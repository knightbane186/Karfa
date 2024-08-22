import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomButton from '@/components/CustomButton';

const NormalRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Normal user registration:', { username, name, mobileNumber });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter username (e.g., john_doe)"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter full name (e.g., John Doe)"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number (e.g., +1234567890)"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <CustomButton
        title="Register"
        handlePress={handleRegister}
        containerStyles={styles.button}
        textStyles={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#82EE16',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'red',
    fontWeight: '600',
  },
});

export default NormalRegistrationForm;




// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import CustomButton from '@/components/CustomButton';

// const NormalRegistrationForm = () => {
//   const [username, setUsername] = useState('');
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleRegister = () => {
//     // Implement registration logic here
//     console.log('Normal user registration:', { username, name, mobileNumber });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mobile Number"
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//         keyboardType="phone-pad"
//       />
//       <CustomButton
//         title="Register"
//         handlePress={handleRegister}
//         containerStyles={styles.button}
//         textStyles={styles.buttonText}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#82EE16',
//     borderRadius: 8,
//     padding: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontWeight: '600',
//   },
// });

// export default NormalRegistrationForm;