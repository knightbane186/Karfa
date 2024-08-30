
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

interface ParameterCardProps {
  onSearch: (maxPrice: number, selectedDate: Date, availability: string, selectedTime: number, suburb: string) => void;
  onClose: () => void;
  searchQuery: string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ onSearch, onClose, searchQuery }) => {
  const [maxPrice, setMaxPrice] = useState<number>(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<string>('Available');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number>(12); // Initial time set to 12 PM
  const [suburb, setSuburb] = useState<string>('');

  const handleSearch = () => {
    onSearch(maxPrice, selectedDate, availability, selectedTime, suburb);
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
      <Text style={styles.label}>{searchQuery}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Suburb</Text>
        <TextInput
          placeholder="Enter suburb"
          style={styles.inputField}
          value={suburb}
          onChangeText={setSuburb}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.smallInputField}>
            <Text>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>No. of People</Text>
          <TextInput placeholder="e.g. 4" style={styles.smallInputField} keyboardType="numeric" />
        </View>
      </View>

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

      <View style={styles.sliderContainer}>
        <Text>Max Price/per person: ${maxPrice}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={100}
          step={10}
          value={maxPrice}
          onValueChange={(value) => setMaxPrice(value)}
          thumbTintColor="#f87171"
          minimumTrackTintColor="#f87171"
          maximumTrackTintColor="#f87171"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
        <Text style={styles.submitButtonText}>Search</Text>
      </TouchableOpacity>

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
  inputGroup: {
    marginBottom: 10,
  },
});

export default ParameterCard;




// import React, { useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Slider from '@react-native-community/slider';

// interface ParameterCardProps {
//   onSearch: (maxPrice: number, selectedDate: Date, availability: string, selectedTime: number, location: string) => void;
//   onClose: () => void;
//   searchQuery: string;
// }

// const ParameterCard: React.FC<ParameterCardProps> = ({ onSearch, onClose, searchQuery }) => {
//   const [maxPrice, setMaxPrice] = useState<number>(10);
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [availability, setAvailability] = useState<string>('Available');
//   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
//   const [selectedTime, setSelectedTime] = useState<number>(12); // Initial time set to 12 PM
//   const [location, setLocation] = useState<string>(''); // New state for location

//   const handleSearch = () => {
//     onSearch(maxPrice, selectedDate, availability, selectedTime, location);
//   };

//   const handleDateChange = (event: any, date?: Date) => {
//     setShowDatePicker(false);
//     if (date) {
//       setSelectedDate(date);
//     }
//   };

//   const formatTime = (hour: number): string => {
//     const period = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//     return `${formattedHour} ${period}`;
//   };

//   return (
//     <View style={styles.card}>
//       <Text style={styles.label}> {searchQuery}</Text>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Location</Text>
//         <TextInput
//           placeholder="Enter location"
//           style={styles.inputField}
//           value={location}
//           onChangeText={setLocation}
//         />
//       </View>

//       <View style={styles.row}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.smallInputField}>
//             <Text>{selectedDate.toDateString()}</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>No. of People</Text>
//           <TextInput placeholder="e.g. 4" style={styles.smallInputField} keyboardType="numeric" />
//         </View>
//       </View>

//       <View style={styles.sliderContainer}>
//         <Text>Time: {formatTime(selectedTime)}</Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={7} // 7 AM
//           maximumValue={23} // 11 PM
//           step={1} // Step is one hour
//           value={selectedTime}
//           onValueChange={setSelectedTime}
//           thumbTintColor="#f87171"
//           minimumTrackTintColor="#f87171"
//           maximumTrackTintColor="#f87171"
//         />
//       </View>

//       <View style={styles.sliderContainer}>
//         <Text>Max Price/per person: ${maxPrice}</Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={10}
//           maximumValue={100}
//           step={10}
//           value={maxPrice}
//           onValueChange={(value) => setMaxPrice(value)}
//           thumbTintColor="#f87171"
//           minimumTrackTintColor="#f87171"
//           maximumTrackTintColor="#f87171"
//         />
//       </View>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSearch}>
//         <Text style={styles.submitButtonText}>Search</Text>
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={handleDateChange}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#E0E0E0',
//     borderRadius: 15,
//     padding: 20,
//     marginTop: 10,
//     width: Dimensions.get('window').width - 40,
//     alignSelf: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   inputField: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   smallInputField: {
//     flex: 0.48,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 8,
//     padding: 10,
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   sliderContainer: {
//     marginBottom: 10,
//   },
//   slider: {
//     width: '100%',
//   },
//   submitButton: {
//     backgroundColor: '#000',
//     borderRadius: 10,
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   inputGroup: {
//     marginBottom: 10,
//   },
// });

// export default ParameterCard;



