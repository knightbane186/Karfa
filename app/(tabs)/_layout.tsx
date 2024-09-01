
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Keyboard, Animated, TouchableWithoutFeedback } from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { icons } from '@/constants';
import dummyData from '../data/BdummyData';
import CountCard from '@/components/CountCard';
import searchLogic from '../search/SearchLogic';
import GridButton from '@/components/GridButton';
import ParameterCard from '@/components/ParameterCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, focused }) => (
  <View style={[styles.tabIconContainer, focused ? styles.focusedTabIcon : styles.unfocusedTabIcon]}>
    <Image
      source={icon}
      style={[styles.icon, { tintColor: focused ? 'white' : '#38c184' }]}
      resizeMode="contain"
    />
  </View>
);

const CustomHeader = ({ onSearch, showParameters, setShowParameters, isSearching, setIsSearching, searchQuery, setSearchQuery }) => {
  const router = useRouter();

  const handleSearch = (maxPrice: number, selectedDate: Date, availability: string, selectedTime: number, suburb: string) => {
    onSearch(searchQuery, maxPrice, selectedDate, availability, selectedTime, suburb);
    setShowParameters(false);
    setIsSearching(true);
    Keyboard.dismiss();
    router.push('/create');
  };

  const handleFocus = () => {
    setShowParameters(true);
    setIsSearching(false);
  };

 
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Location, User, or Activity"
            placeholderTextColor="#999"
            style={styles.searchInput}
            onFocus={handleFocus}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleFocus}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <GridButton onPress={() => {
          setShowParameters(prev => !prev);
          setIsSearching(false);
        }} />
      </View>

      {showParameters && !isSearching && (
        <ParameterCard 
          onSearch={handleSearch} 
          onClose={() => {
            setShowParameters(false);
            setIsSearching(true);
          }} 
          searchQuery={searchQuery}
        />
      )}
    </View>
  );
};

const TabsLayout = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isSearching, setIsSearching] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (query: string, maxPrice: number, date: Date, availability: string, selectedTime: number, suburb: string) => {
    const filtered = searchLogic(query, maxPrice, date, availability, selectedTime, suburb);
    setFilteredData(filtered);
    setIsSearching(true);
    setShowParameters(false);
  };

  const showHeader = ['/home', '/create'].includes(pathname);

  const handleMapPress = () => {
    if (showParameters) {
      setShowParameters(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleMapPress}>
      <View style={styles.container}>
        {showHeader && (
          <CustomHeader
            onSearch={handleSearch}
            showParameters={showParameters}
            setShowParameters={setShowParameters}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {isSearching && pathname === '/create' && (
          <View style={styles.listWrapper}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CountCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  distance={item.distance}
                  status={item.status}
                  price={item.price}
                />
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        )}

        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ focused }) => <TabIcon icon={icons.home} color={focused ? '#ffffff' : '#38c184'} name="Home" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ focused }) => <TabIcon icon={icons.search} color={focused ? '#ffffff' : '#38c184'} name="Search" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ focused }) => <TabIcon icon={icons.profile} color={focused ? '#ffffff' : '#38c184'} name="Profile" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="inbox"
            options={{
              title: 'Inbox',
              headerShown: false,
              tabBarIcon: ({ focused }) => <TabIcon icon={icons.play} color={focused ? '#ffffff' : '#38c184'} name="Inbox" focused={focused} />,
            }}
          />
        </Tabs>
      </View>
    </TouchableWithoutFeedback>
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
    zIndex: 750,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffa001',
  },
  listWrapper: {
    flex: 1,
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    bottom: 100,
    zIndex: 200,
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  tabBarStyle: {
    position: 'absolute',
    paddingBottom: 1,
    bottom: 40,
    left: 45,
    right: 45,
    backgroundColor: '#ffffff',
    height: 65,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedTabIcon: {
    backgroundColor: '#38c184',
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfocusedTabIcon: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TabsLayout;



// import React, { useState, useEffect, useRef } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Keyboard, Animated, TouchableWithoutFeedback } from 'react-native';
// import { Tabs, usePathname, useRouter } from 'expo-router';
// import { icons } from '@/constants';
// import dummyData from '../data/BdummyData';
// import CountCard from '@/components/CountCard';
// import searchLogic from '../search/SearchLogic';
// import GridButton from '@/components/GridButton';
// import ParameterCard from '@/components/ParameterCard';

// interface TabIconProps {
//   icon: any;
//   color: string;
//   name: string;
//   focused: boolean;
// }

// const TabIcon = ({ icon, focused }) => (
//   <View style={[styles.tabIconContainer, focused ? styles.focusedTabIcon : styles.unfocusedTabIcon]}>
//     <Image
//       source={icon}
//       style={[styles.icon, { tintColor: focused ? 'white' : '#38c184' }]}
//       resizeMode="contain"
//     />
//   </View>
// );

// const CustomHeader = ({ onSearch, showParameters, setShowParameters, isSearching, setIsSearching, searchQuery, setSearchQuery }) => {
//   const router = useRouter();

//   const handleSearch = (maxPrice: number, selectedDate: Date, availability: string, selectedTime: number) => {
//     onSearch(searchQuery, maxPrice, selectedDate, availability, selectedTime);
//     setShowParameters(false);
//     setIsSearching(true);
//     Keyboard.dismiss();
//     router.push('/create');
//   };

//   const handleFocus = () => {
//     setShowParameters(true);
//     setIsSearching(false);
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.searchRow}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             placeholder="Location, User, or Activity"
//             placeholderTextColor="#999"
//             style={styles.searchInput}
//             onFocus={handleFocus}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           <TouchableOpacity onPress={handleFocus}>
//             <Image source={icons.search} style={styles.searchIcon} />
//           </TouchableOpacity>
//         </View>
//         <GridButton onPress={() => {
//           setShowParameters(prev => !prev);
//           setIsSearching(false);
//         }} />
//       </View>

//       {showParameters && !isSearching && (
//         <ParameterCard 
//           onSearch={handleSearch} 
//           onClose={() => {
//             setShowParameters(false);
//             setIsSearching(true);
//           }} 
//           searchQuery={searchQuery}
//         />
//       )}
//     </View>
//   );
// };

// const TabsLayout = () => {
//   const [filteredData, setFilteredData] = useState(dummyData);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showParameters, setShowParameters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pathname = usePathname();

//   const handleSearch = (query: string, maxPrice: number, date: Date, availability: string, selectedTime: number) => {
//     const filtered = searchLogic(query, maxPrice, date, availability, selectedTime);
//     setFilteredData(filtered);
//     setIsSearching(true);
//     setShowParameters(false);
//   };

//   const showHeader = ['/home', '/create'].includes(pathname);

//   const handleMapPress = () => {
//     if (showParameters) {
//       setShowParameters(false);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={handleMapPress}>
//       <View style={styles.container}>
//         {showHeader && (
//           <CustomHeader
//             onSearch={handleSearch}
//             showParameters={showParameters}
//             setShowParameters={setShowParameters}
//             isSearching={isSearching}
//             setIsSearching={setIsSearching}
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         )}

//         {isSearching && pathname === '/create' && (
//           <View style={styles.listWrapper}>
//             <FlatList
//               data={filteredData}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <CountCard
//                   imageUrl={item.imageUrl}
//                   title={item.title}
//                   distance={item.distance}
//                   status={item.status}
//                   price={item.price}
//                 />
//               )}
//               contentContainerStyle={styles.listContainer}
//             />
//           </View>
//         )}

//         <Tabs
//           screenOptions={{
//             tabBarShowLabel: false,
//             tabBarStyle: styles.tabBarStyle,
//           }}
//         >
//           <Tabs.Screen
//             name="home"
//             options={{
//               title: 'Home',
//               headerShown: false,
//               tabBarIcon: ({ focused }) => <TabIcon icon={icons.home} color={focused ? '#ffffff' : '#38c184'} name="Home" focused={focused} />,
//             }}
//           />
//           <Tabs.Screen
//             name="create"
//             options={{
//               title: 'Create',
//               headerShown: false,
//               tabBarIcon: ({ focused }) => <TabIcon icon={icons.search} color={focused ? '#ffffff' : '#38c184'} name="Search" focused={focused} />,
//             }}
//           />
//           <Tabs.Screen
//             name="profile"
//             options={{
//               title: 'Profile',
//               headerShown: false,
//               tabBarIcon: ({ focused }) => <TabIcon icon={icons.profile} color={focused ? '#ffffff' : '#38c184'} name="Profile" focused={focused} />,
//             }}
//           />
//           <Tabs.Screen
//             name="inbox"
//             options={{
//               title: 'Inbox',
//               headerShown: false,
//               tabBarIcon: ({ focused }) => <TabIcon icon={icons.play} color={focused ? '#ffffff' : '#38c184'} name="Inbox" focused={focused} />,
//             }}
//           />
//         </Tabs>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: 45,
//     left: 20,
//     right: 20,
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     zIndex: 750,
//   },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 10,
//     flex: 1,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 5,
//     fontSize: 16,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     right:2,
//     tintColor: '#ffa001',
//   },
//   listWrapper: {
//     flex: 1,
//     position: 'absolute',
//     top: 90,
//     left: 0,
//     right: 0,
//     bottom: 100,
//     zIndex: 200,
//     backgroundColor: 'transparent',
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 160,
//   },
//   tabBarStyle: {
//     position: 'absolute',
//     paddingBottom: 1,
//     bottom: 40,
//     left: 45,
//     right: 45,
//     backgroundColor: '#ffffff',
//     height: 65,
//     borderRadius: 35,
//     borderWidth: 1,
//     borderColor: '#ececec',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   tabIconContainer: {
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   focusedTabIcon: {
//     backgroundColor: '#38c184',
//     width: 56,
//     height: 56,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   unfocusedTabIcon: {
//     width: 24,
//     height: 24,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
// });

// export default TabsLayout;
