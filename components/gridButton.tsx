// gridButton.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons } from '@/constants';

const GridButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.gridButton} onPress={onPress}>
      <Image source={icons.grid} style={styles.gridButtonIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  gridButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default GridButton;