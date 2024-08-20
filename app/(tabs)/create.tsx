
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '@/components/Map'; // Adjust the path if necessary

const CreatePage = () => {
  return (
    <View style={styles.container}>
      {/* Full-screen Map */}
      <Map style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatePage;



// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';
// import Map from '@/components/Map'; // Adjust the path if necessary
// import ParameterCard from '@/components/parameterCard';
// import dummyData from '@/app/data/dummyData'; // Assuming you have dummyData for testing
// import { icons } from '@/constants';

// const CreatePage = () => {
//   const [showParameters, setShowParameters] = useState(false); // Control ParameterCard visibility
//   const [isSearching, setIsSearching] = useState(false); // Manage whether search results are shown
//   const [filteredData, setFilteredData] = useState(dummyData); // Dummy data as search results

//   // Handle the search from the ParameterCard
//   const handleSearch = (searchQuery, distance, selectedDate, availability, selectedTime) => {
//     const results = dummyData.filter(item =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(results);
//     setShowParameters(false); // Hide the ParameterCard after search
//     setIsSearching(true); // Show search results
//   };

//   // Handle search bar click to show ParameterCard and hide results
//   const handleSearchBarClick = () => {
//     setShowParameters(true); // Show the ParameterCard
//     setIsSearching(false); // Hide the results while searching
//   };

//   return (
//     <View style={styles.container}>
//       {/* Full-screen Map */}
//       <Map style={styles.container} />

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           placeholder="Location, User, or Activity"
//           style={styles.searchInput}
//           onFocus={handleSearchBarClick} // Open ParameterCard when clicking on the search bar
//         />
//         <TouchableOpacity onPress={handleSearchBarClick}>
//           <Image source={icons.search} style={styles.searchIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Floating Parameter Card */}
//       {showParameters && (
//         <View style={styles.parameterCardContainer}>
//           <ParameterCard onSearch={handleSearch} onClose={() => setShowParameters(false)} />
//         </View>
//       )}

//       {/* Search Results */}
//       {!showParameters && isSearching && (
//         <View style={styles.resultsContainer}>
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.resultItem}>
//                 <Text>{item.title}</Text>
//               </View>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 15,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     padding: 5,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#ffa001',
//   },
//   parameterCardContainer: {
//     position: 'absolute',
//     top: 120, // Adjust based on your UI needs
//     left: 20,
//     right: 20,
//     zIndex: 20, // Ensure it's above other elements
//   },
//   resultsContainer: {
//     flex: 1,
//     marginTop: 0, // Adjust dynamically when `ParameterCard` is visible
//   },
//   resultItem: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     marginVertical: 5,
//     borderRadius: 8,
//   },
// });

// export default CreatePage;


// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import Map from '@/components/Map'; // Adjust the path if necessary
// import GridButton from '@/components/gridButton';
// import ParameterCard from '@/components/parameterCard';
// import dummyData from '@/app/data/dummyData'; // Assuming you have dummyData for testing

// const CreatePage = () => {
//   const [showParameters, setShowParameters] = useState(true); // Initially show ParameterCard
//   const [filteredData, setFilteredData] = useState(dummyData); // Dummy data as search results

//   // Handle the search from the ParameterCard
//   const handleSearch = (searchQuery, distance, selectedDate, availability, selectedTime) => {
//     const results = dummyData.filter(item =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(results);
//     setShowParameters(false); // Hide the ParameterCard and show results
//   };

//   // Handle Grid Button click to show ParameterCard and clear results
//   const handleGridButtonClick = () => {
//     setShowParameters(true); // Show the ParameterCard
//     setFilteredData([]); // Clear the search results
//   };

//   return (
//     <View style={styles.container}>
//       {/* Full-screen Map */}
//       <Map style={styles.container} />

//       {/* Search Bar */}
//       {/* <View style={styles.searchBar}>
//         <Text style={styles.searchBarText}>Location, User, or Activity</Text>
//       </View> */}

//       {/* Floating Parameter Card */}
//       {showParameters && (
//         <View style={styles.parameterCardContainer}>
//           <ParameterCard onSearch={handleSearch} onClose={() => setShowParameters(false)} />
//         </View>
//       )}

//       {/* Bottom Navigation Bar */}
//       {/* <View style={styles.bottomNavigationBar}>
//         <GridButton onPress={handleGridButtonClick} />
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   //I dont want this search bar 
//   // searchBar: {
//   //   position: 'absolute',
//   //   top: 50, // Adjust based on the height of the search bar
//   //   left: 20,
//   //   right: 20,
//   //   backgroundColor: 'red',
//   //   borderRadius: 10,
//   //   padding: 10,
//   //   zIndex: 10, // Ensure it's above the map
//   // },
//   searchBarText: {
//     color: 'gray',
//   },
//   parameterCardContainer: {
//     position: 'absolute',
//     top: 120, // Position this just below the search bar
//     left: 20,
//     right: 20,
//     zIndex: 10,
//      // Ensure it's above the map
//   },
//   bottomNavigationBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//     backgroundColor: 'transparent', // Ensure this is transparent if you don’t want any color
//     padding: 0, // Ensure no padding
//     margin: 0, // Ensure no margin
//   },
// });

// export default CreatePage;



// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import GridButton from '@/components/gridButton';
// import ParameterCard from '@/components/parameterCard';
// import dummyData from '@/app/data/dummyData'; // Assuming you have dummyData for testing

// const CreatePage = () => {
//   const [showParameters, setShowParameters] = useState(true); // Initially show ParameterCard
//   const [filteredData, setFilteredData] = useState(dummyData); // Dummy data as search results

//   // Handle the search from the ParameterCard
//   const handleSearch = (searchQuery, distance, selectedDate, availability, selectedTime) => {
//     // Perform search logic and update filteredData with the results
//     // For demonstration purposes, we'll filter the dummyData based on the search query
//     const results = dummyData.filter(item =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(results);
//     setShowParameters(false); // Hide the ParameterCard and show results
//   };

//   // Handle Grid Button click to show ParameterCard and clear results
//   const handleGridButtonClick = () => {
//     setShowParameters(true); // Show the ParameterCard
//     setFilteredData([]); // Clear the search results
//   };

//   return (
//     <View style={styles.container}>
//       {showParameters ? (
//         <ParameterCard onSearch={handleSearch} onClose={() => setShowParameters(false)} />
//       ) : (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.resultItem}>
//               <Text>{item.title}</Text>
//             </View>
//           )}
//         />
//       )}

//       <GridButton onPress={handleGridButtonClick} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop:100,
//   },
//   resultItem: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     marginVertical: 5,
//     borderRadius: 8,
//   },
// });

// export default CreatePage;


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { HomeMap } from '../(tabs)/home'; // Import the Map from Home.tsx

// const Create = () => {
//   return (
//     <View style={styles.container}>
//       <HomeMap />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Create;



// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Map from '@/components/Map';

// const Create = () => {
//   return (
//     <View style={styles.container}>
//       <Map />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Create;