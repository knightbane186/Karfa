import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AccountTypeSelectorProps {
  onSelect: (type: 'normal' | 'business') => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Account Type</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSelect('normal')}
      >
        <Text style={styles.buttonText}>Normal User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSelect('business')}
      >
        <Text style={styles.buttonText}>Business User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#82EE16',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
  },
});

export default AccountTypeSelector;