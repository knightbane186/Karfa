import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { addUser } from '../data/UdummyData';

const NormalRegistrationForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (username && name && mobileNumber && password) {
      const newUser = {
        id: Date.now().toString(),
        username,
        password,
        name,
        mobileNumber,
        accountType: 'normal',
      };
      addUser(newUser);
      Alert.alert('Success', 'Registration successful!');
      onSuccess();
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
    color: 'black',
    fontWeight: '600',
  },
});

export default NormalRegistrationForm;
