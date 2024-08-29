import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AccountTypeSelector from '@/components/AccountTypeSelector';
import NormalRegistrationForm from './NormalRegistrationForm';
import BusinessRegistrationForm from './BusinessRegistrationForm';
import { useRouter } from 'expo-router';

const RegistrationFlow = () => {
  const [accountType, setAccountType] = useState<'normal' | 'business' | null>(null);
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {!accountType ? (
        <AccountTypeSelector onSelect={setAccountType} />
      ) : accountType === 'normal' ? (
        <NormalRegistrationForm onSuccess={handleRegistrationSuccess} />
      ) : (
        <BusinessRegistrationForm onSuccess={handleRegistrationSuccess} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
  },
});

export default RegistrationFlow;