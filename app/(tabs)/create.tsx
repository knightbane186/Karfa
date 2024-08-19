import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeMap } from '../(tabs)/home'; // Import the Map from Home.tsx

const Create = () => {
  return (
    <View style={styles.container}>
      <HomeMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Create;



// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Map from '@/components/Map';

// const Create = () => {
//   return (
//     <View style={styles.container}>
//       <Map />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Create;