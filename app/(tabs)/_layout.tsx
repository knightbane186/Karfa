import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Keyboard } from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { icons } from '@/constants';
import dummyData from '../data/BdummyData';
import CountCard from '@/components/CountCard';
import searchLogic from '../search/SearchLogic';
import GridButton from '@/components/GridButton';
import ParameterCard from '@/components/ParameterCard';

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

  const handleSearch = (maxPrice: number, selectedDate: Date, availability: string, selectedTime: number) => {
    onSearch(searchQuery, maxPrice, selectedDate, availability, selectedTime);
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

  const handleSearch = (query: string, maxPrice: number, date: Date, availability: string, selectedTime: number) => {
    const filtered = searchLogic(query, maxPrice, date, availability, selectedTime);
    setFilteredData(filtered);
    setIsSearching(true);
    setShowParameters(false);
  };

  const showHeader = ['/home', '/create'].includes(pathname);

  return (
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
    backgroundColor: 'gray',
    borderRadius: 15,
    padding: 10,
    flex: 1,
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
    paddingBottom:1,
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
    // paddingHorizontal: 0, // Remove horizontal padding
  },
  tabIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedTabIcon: {
    backgroundColor: '#38c184',
    width: 56, // Match the container size
    height: 56, // Match the container size
    borderRadius: 30,
     // Half of the width/height for a perfect circle
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

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Keyboard } from 'react-native';
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

// const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
//   return (
//     <View style={styles.tabIconContainer}>
//       <Image source={icon} resizeMode="contain" style={[styles.icon, { tintColor: color }]} />
//       <Text style={[focused ? styles.focusedText : styles.regularText, { color }]}>{name}</Text>
//     </View>
//   );
// };

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

//   return (
//     <View style={styles.container}>
//       {showHeader && (
//         <CustomHeader
//           onSearch={handleSearch}
//           showParameters={showParameters}
//           setShowParameters={setShowParameters}
//           isSearching={isSearching}
//           setIsSearching={setIsSearching}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />
//       )}

//       {isSearching && pathname === '/create' && (
//         <View style={styles.listWrapper}>
//           <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <CountCard
//                 imageUrl={item.imageUrl}
//                 title={item.title}
//                 distance={item.distance}
//                 status={item.status}
//                 price={item.price}
//               />
//             )}
//             contentContainerStyle={styles.listContainer}
//           />
//         </View>
//       )}

//       <Tabs
//         screenOptions={{
//           tabBarShowLabel: false,
//           tabBarActiveTintColor: '#ffa001',
//           tabBarInactiveTintColor: '#cdcde0',
//           tabBarStyle: styles.tabBarStyle,
//         }}
//       >
//         <Tabs.Screen
//           name="home"
//           options={{
//             title: 'Home',
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />,
//           }}
//         />
//         <Tabs.Screen
//           name="create"
//           options={{
//             title: 'Create',
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.search} color={color} name="Search" focused={focused} />,
//           }}
//         />
//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: 'Profile',
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />,
//           }}
//         />
//         <Tabs.Screen
//           name="inbox"
//           options={{
//             title: 'Inbox',
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => <TabIcon icon={icons.play} color={color} name="Inbox" focused={focused} />,
//           }}
//         />
//       </Tabs>
//     </View>
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
//     backgroundColor: 'gray',
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
//   tabIconContainer: {
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flex: 1,
//   },
//   icon: {
//     width: 28,
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
//     bottom: 30,
//     left: 22,
//     right: 0,
//     backgroundColor: '#161622',
//     borderTopWidth: 1,
//     borderTopColor: '#232533',
//     height: 74,
//     width: 350,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 20,
//     zIndex: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   // mapContainer: {
//   //   flex: 1,
//   //   position: 'absolute',
//   //   top: 90,
//   //   left: 0,
//   //   right: 0,
//   //   bottom: 104, // Adjusted to account for the tab bar
//   //   zIndex: 100,
//   // },
//   mapPlaceholder: {
//     // flex: 1,
//     backgroundColor: 'transparent', // Replace this with your actual map component
//   },
// });

// export default TabsLayout;


