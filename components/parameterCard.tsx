import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

interface ParameterCardProps {
  onSearch: (searchQuery: string, distance: number, selectedDate: Date, availability: string) => void;
  onClose: () => void;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ onSearch, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [distance, setDistance] = useState<number>(25);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<string>('available');

  const handleSearch = () => {
    onSearch(searchQuery, distance, selectedDate, availability);
  };

  return (
    <View style={styles.card}>
      <TextInput
        placeholder="Location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.inputField}
      />

      <View style={styles.row}>
        <TextInput placeholder="Date" style={styles.smallInputField} />
        <TextInput placeholder="No. of people" style={styles.smallInputField} />
      </View>

      <Text style={styles.label}>Time: 12pm-6pm</Text>

      {/* Price Slider */}
      <View style={styles.sliderContainer}>
        <Text>Price/per person: ${distance}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          value={distance}
          onValueChange={(value) => setDistance(value)}
          thumbTintColor="#f87171"
          minimumTrackTintColor="#f87171"
          maximumTrackTintColor="#f87171"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
        <Text style={styles.submitButtonText}>Frogit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  inputField: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallInputField: {
    flex: 0.48,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParameterCard;