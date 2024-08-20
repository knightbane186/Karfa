import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';


interface ParameterCardProps {
  onSearch: (searchQuery: string, distance: number, selectedDate: Date, availability: string, selectedTime: number) => void;
  onClose: () => void;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ onSearch, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [distance, setDistance] = useState<number>(25);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<string>('available');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number>(12); // Initial time set to 12 PM

  const handleSearch = () => {
    onSearch(searchQuery, distance, selectedDate, availability, selectedTime);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${period}`;
  };

  return (
    <View style={styles.card}>
      {/* Location Label and Input */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        placeholder="Enter location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.inputField}
      />

      <View style={styles.row}>
        {/* Date Picker Trigger */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.smallInputField}>
            <Text>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* Number of People Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>No. of People</Text>
          <TextInput placeholder="e.g. 4" style={styles.smallInputField} keyboardType="numeric" />
        </View>
      </View>

      {/* Time Slider */}
      <View style={styles.sliderContainer}>
        <Text>Time: {formatTime(selectedTime)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={7} // 7 AM
          maximumValue={23} // 11 PM
          step={1} // Step is one hour
          value={selectedTime}
          onValueChange={setSelectedTime}
          thumbTintColor="#f87171"
          minimumTrackTintColor="#f87171"
          maximumTrackTintColor="#f87171"
        />
      </View>

      {/* Price Slider */}
      <View style={styles.sliderContainer}>
        <Text>Price/per person: ${distance}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          value={distance}
          onValueChange={setDistance}
          thumbTintColor="#f87171"
          minimumTrackTintColor="#f87171"
          maximumTrackTintColor="#f87171"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
        <Text style={styles.submitButtonText}>Frogit</Text>
      </TouchableOpacity>

      {/* DateTimePicker Component */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
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
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
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