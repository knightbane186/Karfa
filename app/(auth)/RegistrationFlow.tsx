
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AccountTypeSelector from '@/components/AccountTypeSelector';
import NormalRegistrationForm from './NormalRegistrationForm';
import BusinessRegistrationForm from './BusinessRegistrationForm';

const RegistrationFlow = () => {
  const [accountType, setAccountType] = useState<'normal' | 'business' | null>(null);

  return (
    <View style={styles.container}>
      {!accountType ? (
        <AccountTypeSelector onSelect={setAccountType} />
      ) : accountType === 'normal' ? (
        <NormalRegistrationForm />
      ) : (
        <BusinessRegistrationForm />
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



// import React, { useState } from 'react';
// import { View } from 'react-native';
// import AccountTypeSelector from '@/components/AccountTypeSelector';
// import NormalRegistrationForm from './NormalRegistrationForm';
// import BusinessRegistrationForm from './BusinessRegistrationForm';

// const RegistrationFlow = () => {
//   const [accountType, setAccountType] = useState<'normal' | 'business' | null>(null);

//   if (!accountType) {
//     return <AccountTypeSelector onSelect={setAccountType} />;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       {accountType === 'normal' ? (
//         <NormalRegistrationForm />
//       ) : (
//         <BusinessRegistrationForm />
//       )}
//     </View>
//   );
// };

// export default RegistrationFlow;