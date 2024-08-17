import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import dummyData from '@/app/data/dummyData';
import CourtCard from '@/components/CountCard';

const CreatePage = () => {
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState(10);
  const [price, setPrice] = useState(50);
  const [date, setDate] = useState(new Date());
  const [showResults, setShowResults] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    const results = dummyData.filter(item => {
      const itemDistance = parseFloat(item.distance);
      const itemPrice = parseFloat(item.price.replace('$', ''));
      const keywordMatch = item.title.toLowerCase().includes(keyword.toLowerCase());
      return itemDistance <= distance && itemPrice <= price && keywordMatch;
    });
    setFilteredData(results);
    setShowResults(true);
  };

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <TextInput
          placeholder="Enter keyword"
          value={keyword}
          onChangeText={setKeyword}
          style={styles.textInput}
        />

        <Text style={styles.label}>Set distance: {distance} km</Text>
        <Slider
          minimumValue={0}
          maximumValue={50}
          step={1}
          value={distance}
          onValueChange={value => setDistance(value)}
          style={styles.slider}
        />
        
        <Text style={styles.label}>Set price: ${price}</Text>
        <Slider
          minimumValue={0}
          maximumValue={200}
          step={1}
          value={price}
          onValueChange={value => setPrice(value)}
          style={styles.slider}
        />
        
        <Text style={styles.label}>Select date:</Text>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
        
        <Button title="Search" onPress={handleSearch} />
      </View>

      {showResults && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <CourtCard
              imageUrl={item.imageUrl}
              title={item.title}
              distance={item.distance}
              status={item.status}
              price={item.price}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreatePage;

// import { View, Text } from 'react-native'
// import React from 'react'

// const create = () => {
//   return (
//     <View>
//       <Text>create</Text>
//     </View>
//   )
// }

// export default create