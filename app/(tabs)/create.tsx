import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, Animated, Dimensions } from 'react-native';
import CountCard from '@/components/CountCard';
import dummyData from '../data/BdummyData';
import searchLogic from '../search/SearchLogic';
import ParameterCard from '@/components/ParameterCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PARAM_CARD_HEIGHT = 300; // Adjust this value as needed

const CreatePage = ({ showParameters, setShowParameters, searchQuery, onSearch }) => {
  const [allData, setAllData] = useState(dummyData);
  const [searchResults, setSearchResults] = useState([]);
  const flatListRef = useRef(null);
  const animatedTranslateY = useRef(new Animated.Value(-PARAM_CARD_HEIGHT)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: showParameters ? 0 : -PARAM_CARD_HEIGHT,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [showParameters]);

  const handleSearch = (maxPrice, selectedDate, availability, selectedTime) => {
    const results = searchLogic(searchQuery, maxPrice, selectedDate, availability, selectedTime);
    setSearchResults(results);

    const newData = [
      ...results,
      ...dummyData.filter(item => !results.some(searchItem => searchItem.id === item.id)),
    ];
    setAllData(newData);

    if (results.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }

    onSearch(searchQuery, maxPrice, selectedDate, availability, selectedTime);
    setShowParameters(false);
  };

  const renderItem = ({ item, index }) => (
    <CountCard
      title={item.title}
      distance={item.distance}
      status={item.status}
      price={item.price}
    />
  );

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[
        styles.paramCardContainer,
        { transform: [{ translateY: animatedTranslateY }] }
      ]}>
        <ParameterCard 
          onSearch={handleSearch} 
          onClose={() => setShowParameters(false)} 
          searchQuery={searchQuery}
        />
      </Animated.View> */}

      <Animated.View style={[
        styles.listContainer,
        { transform: [{ translateY: Animated.add(animatedTranslateY, PARAM_CARD_HEIGHT) }] }
      ]}>
        <FlatList
          ref={flatListRef}
          data={allData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  paramCardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PARAM_CARD_HEIGHT,
    zIndex: 1,
  },
  listContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 80, // Adjust for bottom navigation
    paddingHorizontal: 10,
  },
});

export default CreatePage;
