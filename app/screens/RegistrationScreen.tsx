import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RegistrationFlow from '../(auth)/RegistrationFlow';

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>
        <RegistrationFlow />
      </View>
    </SafeAreaView>
  );
};

// adding basics 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RegistrationScreen;



// import React from 'react';
// import { View, StyleSheet, SafeAreaView } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import RegistrationFlow from '../(auth)/RegistrationFlow';

// const RegistrationScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="light" />
//       <View style={styles.content}>
//         <RegistrationFlow />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
// });

// export default RegistrationScreen;