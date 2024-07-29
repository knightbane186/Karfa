import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '@/components/Map';

const Home = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;