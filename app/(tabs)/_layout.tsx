import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Tabs, usePathname } from 'expo-router';
import { icons } from '@/constants';
import dummyData from '../data/dummyData';
import CourtCard from '@/components/CountCard';
import searchLogic from '../search/searchLogic'; // Import the search logic component

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          focused ? styles.focusedText : styles.regularText,
          { color: color },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomHeader: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [distance, setDistance] = useState<number>(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [availability, setAvailability] = useState<string>('available');
  const [showParameters, setShowParameters] = useState<boolean>(false); // State to control visibility of parameters

  const handleSearch = () => {
    setShowParameters(false); // Hide parameters when search is performed
    onSearch(searchQuery, distance, selectedDate, availability);
    Keyboard.dismiss(); // Hide the keyboard after the search is done
  };

  const handleFocus = () => {
    setShowParameters(true); // Show parameters when search bar is focused
  };

  const handleOutsideClick = () => {
    setShowParameters(false); // Hide parameters when clicking outside
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a court..."
            style={styles.searchInput}
            onFocus={handleFocus} // Show parameters on focus
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {showParameters && (
          <>
            {/* Distance Slider */}
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

            {/* Date Picker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Text>Select Date: {selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setSelectedDate(date);
                }}
              />
            )}

            {/* Availability Toggle */}
            <View style={styles.availabilityContainer}>
              <Text>Availability:</Text>
              <TouchableOpacity
                onPress={() => setAvailability(availability === 'available' ? 'unavailable' : 'available')}
                style={[styles.availabilityButton, availability === 'available' ? styles.available : styles.unavailable]}
              >
                <Text style={styles.availabilityText}>{availability === 'available' ? 'Available' : 'Unavailable'}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const TabsLayout: React.FC = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  const handleSearch = (query: string, distance: number, date: Date, availability: string) => {
    const filtered = searchLogic(query, distance, date, availability); // Use the searchLogic function
    setFilteredData(filtered);
    setIsSearching(true);
  };

  const showHeader = ['/home', '/create'].includes(pathname);

  return (
    <View style={{ flex: 1 }}>
      {showHeader && <CustomHeader onSearch={handleSearch} />}
      
      {isSearching ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourtCard
              imageUrl={item.imageUrl}
              title={item.title}
              distance={item.distance}
              status={item.status}
              price={item.price}
            />
          )}
          contentContainerStyle={styles.listContainer}
          style={{ paddingBottom: 120 }} // Ensures no overlap with the tab bar
        />
      ) : (
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
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.search}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="inbox"
            options={{
              title: 'Inbox',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.play}
                  color={color}
                  name="Inbox"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="bookmark"
            options={{
              title: 'Bookmark',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Bookmark"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    flex: 1,
    marginRight: 10,
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
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    gap: 2,
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
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#161622',
    borderTopWidth: 1,
    borderTopColor: '#232533',
    height: 84,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 120,
  },
});

export default TabsLayout;




// this baby works
// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { Tabs, usePathname } from 'expo-router';
// import { icons } from '@/constants';
// import dummyData from '../data/dummyData';
// import CourtCard from '@/components/CountCard';
// import searchLogic from '../search/searchLogic'; // Import the new search logic component

// interface TabIconProps {
//   icon: any;
//   color: string;
//   name: string;
//   focused: boolean;
// }

// const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
//   return (
//     <View style={styles.tabIconContainer}>
//       <Image
//         source={icon}
//         resizeMode="contain"
//         style={[styles.icon, { tintColor: color }]}
//       />
//       <Text
//         style={[
//           focused ? styles.focusedText : styles.regularText,
//           { color: color },
//         ]}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

// const CustomHeader: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//     onSearch(text);
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           value={searchQuery}
//           onChangeText={handleSearch}
//           placeholder="Search"
//           style={styles.searchInput}
//         />
//         <TouchableOpacity>
//           <Image
//             source={icons.search}
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.sideButton}>
//         <Image
//           source={icons.play}
//           style={styles.sideButtonIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TabsLayout: React.FC = () => {
//   const [filteredData, setFilteredData] = useState(dummyData);
//   const [isSearching, setIsSearching] = useState(false);
//   const pathname = usePathname();

//   const handleSearch = (query: string) => {
//     const filtered = searchLogic(query); // Use the searchLogic function
//     setFilteredData(filtered);
//     setIsSearching(query.length > 0);
//   };

//   const showHeader = ['/home', '/create'].includes(pathname);

//   return (
//     <View style={{ flex: 1 }}>
//       {showHeader && <CustomHeader onSearch={handleSearch} />}
      
//       {isSearching ? (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <CourtCard
//               imageUrl={item.imageUrl}
//               title={item.title}
//               distance={item.distance}
//               status={item.status}
//               price={item.price}
//             />
//           )}
//           contentContainerStyle={styles.listContainer}
//           style={{ paddingBottom: 120 }} // Ensures no overlap with the tab bar
//         />
//       ) : (
//         <Tabs
//           screenOptions={{
//             tabBarShowLabel: false,
//             tabBarActiveTintColor: '#ffa001',
//             tabBarInactiveTintColor: '#cdcde0',
//             tabBarStyle: styles.tabBarStyle,
//           }}
//         >
//           {/* Tab Screens */}
//           <Tabs.Screen
//             name="home"
//             options={{
//               title: 'Home',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.home}
//                   color={color}
//                   name="Home"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="create"
//             options={{
//               title: 'Create',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.search}
//                   color={color}
//                   name="Search"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="profile"
//             options={{
//               title: 'Profile',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.profile}
//                   color={color}
//                   name="Profile"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="inbox"
//             options={{
//               title: 'Inbox',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.play}
//                   color={color}
//                   name="Inbox"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="bookmark"
//             options={{
//               title: 'Bookmark',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.bookmark}
//                   color={color}
//                   name="Bookmark"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//         </Tabs>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     position: 'absolute',
//     top: 45,
//     left: 20,
//     right: 20,
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//     zIndex: 1000,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 25,
//     padding: 10,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     padding: 5,
//     fontSize: 16,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#ffa001',
//   },
//   sideButton: {
//     backgroundColor: '#ffa001',
//     borderRadius: 50,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sideButtonIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#fff',
//   },
//   tabIconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 2,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   focusedText: {
//     fontFamily: 'psemibold',
//     fontSize: 10,
//   },
//   regularText: {
//     fontFamily: 'pregular',
//     fontSize: 10,
//   },
//   tabBarStyle: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#161622',
//     borderTopWidth: 1,
//     borderTopColor: '#232533',
//     height: 84,
//     borderRadius: 35,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     paddingTop: 120,
//   },
// });

// export default TabsLayout;





// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { Tabs, usePathname } from 'expo-router';
// import { icons } from '@/constants';
// import dummyData from '../data/dummyData';
// import CourtCard from '@/components/CountCard';

// interface TabIconProps {
//   icon: any;
//   color: string;
//   name: string;
//   focused: boolean;
// }

// const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
//   return (
//     <View style={styles.tabIconContainer}>
//       <Image
//         source={icon}
//         resizeMode="contain"
//         style={[styles.icon, { tintColor: color }]}
//       />
//       <Text
//         style={[
//           focused ? styles.focusedText : styles.regularText,
//           { color: color },
//         ]}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

// const CustomHeader: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//     onSearch(text);
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           value={searchQuery}
//           onChangeText={handleSearch}
//           placeholder="Search"
//           style={styles.searchInput}
//         />
//         <TouchableOpacity>
//           <Image
//             source={icons.search}
//             style={styles.searchIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.sideButton}>
//         <Image
//           source={icons.play}
//           style={styles.sideButtonIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TabsLayout: React.FC = () => {
//   const [filteredData, setFilteredData] = useState(dummyData);
//   const [isSearching, setIsSearching] = useState(false);
//   const pathname = usePathname();

//   const handleSearch = (query: string) => {
//     if (query) {
//       const filtered = dummyData.filter((item) =>
//         item.title.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredData(filtered);
//       setIsSearching(true);
//     } else {
//       setIsSearching(false);
//     }
//   };

//   const showHeader = ['/home', '/create'].includes(pathname);

//   return (
//     <View style={{ flex: 1 }}>
//       {showHeader && <CustomHeader onSearch={handleSearch} />}
      
//       {isSearching ? (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <CourtCard
//               imageUrl={item.imageUrl}
//               title={item.title}
//               distance={item.distance}
//               status={item.status}
//               price={item.price}
//             />
//           )}
//           contentContainerStyle={styles.listContainer}
//           style={{ paddingBottom: 120 }} // Ensures no overlap with the tab bar
//         />
//       ) : (
//         <Tabs
//           screenOptions={{
//             tabBarShowLabel: false,
//             tabBarActiveTintColor: '#ffa001',
//             tabBarInactiveTintColor: '#cdcde0',
//             tabBarStyle: styles.tabBarStyle,
//           }}
//         >
//           {/* Tab Screens */}
//           <Tabs.Screen
//             name="home"
//             options={{
//               title: 'Home',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.home}
//                   color={color}
//                   name="Home"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="create"
//             options={{
//               title: 'Create',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.search}
//                   color={color}
//                   name="Search"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="profile"
//             options={{
//               title: 'Profile',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.profile}
//                   color={color}
//                   name="Profile"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="inbox"
//             options={{
//               title: 'Inbox',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.play}
//                   color={color}
//                   name="Inbox"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="bookmark"
//             options={{
//               title: 'Bookmark',
//               headerShown: false,
//               tabBarIcon: ({ color, focused }) => (
//                 <TabIcon
//                   icon={icons.bookmark}
//                   color={color}
//                   name="Bookmark"
//                   focused={focused}
//                 />
//               ),
//             }}
//           />
//         </Tabs>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     position: 'absolute',
//     top: 45,
//     left: 20,
//     right: 20,
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//     zIndex: 1000,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 25,
//     padding: 10,
//     flex: 1,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     padding: 5,
//     fontSize: 16,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#ffa001',
//   },
//   sideButton: {
//     backgroundColor: '#ffa001',
//     borderRadius: 50,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sideButtonIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#fff',
//   },
//   tabIconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 2,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   focusedText: {
//     fontFamily: 'psemibold',
//     fontSize: 10,
//   },
//   regularText: {
//     fontFamily: 'pregular',
//     fontSize: 10,
//   },
//   tabBarStyle: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#161622',
//     borderTopWidth: 1,
//     borderTopColor: '#232533',
//     height: 84,
//     borderRadius: 35,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     paddingTop: 120,
//   },
// });

// export default TabsLayout;