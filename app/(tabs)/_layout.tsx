
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Image, Keyboard, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Tabs, usePathname } from 'expo-router';
import Slider from '@react-native-community/slider';
import { icons } from '@/constants';
import dummyData from '../data/dummyData';
import CountCard from '@/components/CountCard';
import searchLogic from '../search/searchLogic';

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image source={icon} resizeMode="contain" style={[styles.icon, { tintColor: color }]} />
      <Text style={[focused ? styles.focusedText : styles.regularText, { color }]}>{name}</Text>
    </View>
  );
};

const CustomHeader = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [distance, setDistance] = useState<number>(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<string>('available');
  const [showParameters, setShowParameters] = useState<boolean>(false);

  const handleSearch = () => {
    onSearch(searchQuery, distance, selectedDate, availability);
    Keyboard.dismiss(); // Hide the keyboard after search
  };

  const handleCloseParameters = () => {
    setShowParameters(false);
    Keyboard.dismiss(); // Hide the keyboard when closing parameters
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for a court..."
          style={styles.searchInput}
          onFocus={() => setShowParameters(true)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image source={icons.search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {showParameters && (
        <>
          <View style={styles.sliderContainer}>
            <Text>Distance: {distance} km</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={50}
              value={distance}
              onValueChange={(value) => setDistance(value)}
            />
          </View>

          <TouchableOpacity onPress={() => setShowParameters(true)} style={styles.datePickerButton}>
            <Text>Select Date: {selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          <DateTimePicker value={selectedDate} mode="date" display="default" onChange={(event, date) => date && setSelectedDate(date)} />

          <View style={styles.availabilityContainer}>
            <Text>Availability:</Text>
            <TouchableOpacity
              onPress={() => setAvailability(availability === 'available' ? 'unavailable' : 'available')}
              style={[styles.availabilityButton, availability === 'available' ? styles.available : styles.unavailable]}
            >
              <Text style={styles.availabilityText}>{availability === 'available' ? 'Available' : 'Unavailable'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseParameters}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const TabsLayout = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  const handleSearch = (query: string, distance: number, date: Date, availability: string) => {
    const filtered = searchLogic(query, distance, date, availability);
    setFilteredData(filtered);
    setIsSearching(true);
  };

  const showHeader = ['/home', '/create'].includes(pathname);

  return (
    <View style={styles.container}>
      {/* Mapbox Map should be rendered in the background */}
      <View style={StyleSheet.absoluteFillObject}>
        {/* Your existing Mapbox Map code */}
      </View>

      {showHeader && <CustomHeader onSearch={handleSearch} />}

      {isSearching && (
        <View style={styles.listWrapper}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CountCard imageUrl={item.imageUrl} title={item.title} distance={item.distance} status={item.status} price={item.price} />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        {/* Tab Screens */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.search} color={color} name="Search" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: 'Inbox',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.play} color={color} name="Inbox" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />,
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 750, // Reduced zIndex for the search bar
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffa001',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
  },
  datePickerButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  availabilityButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  available: {
    backgroundColor: '#a5d6a7',
  },
  unavailable: {
    backgroundColor: '#ef9a9a',
  },
  availabilityText: {
    color: '#fff',
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: '#ffa001',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
  },
  listWrapper: {
    flex: 1,
    position: 'absolute',
    top: 90, // Ensure the list floats over the map
    left: 0,
    marginBottom:10,
    right: 0,
    bottom: 100, // Cover the full screen height
    zIndex: 200, // Ensure it's above the map but below the taskbar
    backgroundColor: 'transparent', // Ensure transparency over the map
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 160, // Allow the list to scroll behind the taskbar
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  focusedText: {
    fontFamily: 'psemibold',
    fontSize: 10,
  },
  regularText: {
    fontFamily: 'pregular',
    fontSize: 10,
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 10,
    backgroundColor: '#161622',
    borderTopWidth: 1,
    borderTopColor: '#232533',
    height: 84,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 0, // Ensure the taskbar stays on top of everything
  },
});

export default TabsLayout;
