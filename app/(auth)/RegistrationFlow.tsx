import React, { useState } from 'react';
import { View } from 'react-native';
import AccountTypeSelector from '@/components/AccountTypeSelector';
import NormalRegistrationForm from './NormalRegistrationForm';
import BusinessRegistrationForm from './BusinessRegistrationForm';

const RegistrationFlow = () => {
  const [accountType, setAccountType] = useState<'normal' | 'business' | null>(null);

  if (!accountType) {
    return <AccountTypeSelector onSelect={setAccountType} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {accountType === 'normal' ? (
        <NormalRegistrationForm />
      ) : (
        <BusinessRegistrationForm />
      )}
    </View>
  );
};

export default RegistrationFlow;