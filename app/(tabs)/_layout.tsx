import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Keyboard } from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { icons } from '@/constants';
import dummyData from '../data/dummyData';
import CountCard from '@/components/CountCard';
import searchLogic from '../search/searchLogic';
import GridButton from '@/components/gridButton';
import ParameterCard from '@/components/parameterCard';

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

const CustomHeader = ({ onSearch, showParameters, setShowParameters, isSearching }) => {
  const router = useRouter();

  const handleSearch = (searchQuery: string, distance: number, selectedDate: Date, availability: string) => {
    onSearch(searchQuery, distance, selectedDate, availability);
    setShowParameters(false); // Hide ParameterCard after search
    Keyboard.dismiss();
    router.push('/create');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Location, User, or Activity"
            style={styles.searchInput}
            onFocus={() => setShowParameters(true)} // Always show ParameterCard when search bar is focused
          />
          <TouchableOpacity onPress={() => setShowParameters(true)}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <GridButton onPress={() => setShowParameters(prev => !prev)} />
      </View>

      {/* Only show ParameterCard if not searching */}
      {!isSearching && showParameters && (
        <ParameterCard onSearch={handleSearch} onClose={() => setShowParameters(false)} />
      )}
    </View>
  );
};

const TabsLayout = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isSearching, setIsSearching] = useState(false);
  const [showParameters, setShowParameters] = useState(false); // Manage ParameterCard visibility
  const pathname = usePathname();

  const handleSearch = (query: string, distance: number, date: Date, availability: string) => {
    const filtered = searchLogic(query, distance, date, availability);
    setFilteredData(filtered);
    setIsSearching(true); // Trigger list view
    setShowParameters(false); // Hide ParameterCard when search results are shown
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
        />
      )}

      {/* Show search results */}
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
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#cdcde0',
          tabBarStyle: styles.tabBarStyle,
        }}
      >
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
    backgroundColor: '#f0f0f0',
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
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  icon: {
    width: 28,
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
    left: 22,
    right: 0,
    backgroundColor: '#161622',
    borderTopWidth: 1,
    borderTopColor: '#232533',
    height: 74,
    width: 350,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default TabsLayout;



// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList,Text, StyleSheet } from 'react-native';
// import { Tabs, usePathname, useRouter } from 'expo-router';
// import { icons } from '@/constants';
// import dummyData from '../data/dummyData';
// import CountCard from '@/components/CountCard';
// import searchLogic from '../search/searchLogic';
// import GridButton from '@/components/gridButton';
// import ParameterCard from '@/components/parameterCard';
// import { Image } from 'react-native';

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

// const CustomHeader = ({ onSearch }) => {
//   const [showParameters, setShowParameters] = useState<boolean>(false);
//   const router = useRouter(); // Use router to navigate

//   const handleSearch = (searchQuery: string, distance: number, selectedDate: Date, availability: string) => {
//     onSearch(searchQuery, distance, selectedDate, availability);
//     setShowParameters(false); // Hide parameters when search is triggered
//     Keyboard.dismiss(); // Hide the keyboard after search
//     router.push('/create'); // Navigate to the create page
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.searchRow}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             placeholder="Location, User, or Activity"
//             style={styles.searchInput}
//             onFocus={() => setShowParameters(true)}
//           />
//           <TouchableOpacity onPress={() => setShowParameters(true)}>
//             <Image source={icons.search} style={styles.searchIcon} />
//           </TouchableOpacity>
//         </View>
//         <GridButton onPress={() => console.log('Grid button pressed')} />
//       </View>

//       {showParameters && (
//         <ParameterCard onSearch={handleSearch} onClose={() => setShowParameters(false)} />
//       )}
//     </View>
//   );
// };

// const TabsLayout = () => {
//   const [filteredData, setFilteredData] = useState(dummyData);
//   const [isSearching, setIsSearching] = useState(false);
//   const pathname = usePathname();

//   const handleSearch = (query: string, distance: number, date: Date, availability: string) => {
//     const filtered = searchLogic(query, distance, date, availability);
//     setFilteredData(filtered);
//     setIsSearching(true); // Show the results list after search
//   };

//   const showHeader = ['/home', '/create'].includes(pathname);

//   return (
//     <View style={styles.container}>
//       {showHeader && <CustomHeader onSearch={handleSearch} />}

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
//     backgroundColor: '#f0f0f0',
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
// });

// export default TabsLayout;
