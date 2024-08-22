import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomButton from '@/components/CustomButton';

const BusinessRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [abnNumber, setAbnNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Business user registration:', { username, mobileNumber, abnNumber, email });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="ABN Number"
        value={abnNumber}
        onChangeText={setAbnNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
    backgroundColor: 'white',
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
    color: 'black',
    fontWeight: '600',
  },
});

export default BusinessRegistrationForm;