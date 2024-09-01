import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountCard from '@/components/CountCard';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const BookingSaved = () => {
  const router = useRouter();
  const [savedBookings, setSavedBookings] = useState([]);

  useEffect(() => {
    loadSavedBookings();
  }, []);

  const loadSavedBookings = async () => {
    try {
      const bookingsJson = await AsyncStorage.getItem('savedBookings');
      if (bookingsJson) {
        setSavedBookings(JSON.parse(bookingsJson));
      }
    } catch (error) {
      console.error('Error loading saved bookings:', error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const updatedBookings = savedBookings.filter(booking => booking.id !== id);
      setSavedBookings(updatedBookings);
      await AsyncStorage.setItem('savedBookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const renderSwipeableCountCard = ({ item }) => {
    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => handleDeleteBooking(item.id)}
      >
        <CountCard
          id={item.id.toString()}
          title={item.title}
          imageUrl={item.imageUrl}
          price={item.price}
          distance={item.distance}
          status="Booked"
          inBookingSaved={true} // Add this prop
          onPress={() => router.push('/ActiveBooking')} // This will only be used when not inBookingSaved
        />
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Bookings</Text>
        </View>

        <View style={styles.listContainer}>
          {savedBookings.length > 0 ? (
            <FlatList
              data={savedBookings}
              renderItem={renderSwipeableCountCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <Text style={styles.emptyText}>No saved bookings yet.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingSaved;
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CountCard from '@/components/CountCard';
// import { Ionicons } from '@expo/vector-icons';
// import { Swipeable } from 'react-native-gesture-handler';

// const BookingSaved = () => {
//   const router = useRouter();
//   const [savedBookings, setSavedBookings] = useState([]);

//   useEffect(() => {
//     loadSavedBookings();
//   }, []);

//   const loadSavedBookings = async () => {
//     try {
//       const bookingsJson = await AsyncStorage.getItem('savedBookings');
//       if (bookingsJson) {
//         setSavedBookings(JSON.parse(bookingsJson));
//       }
//     } catch (error) {
//       console.error('Error loading saved bookings:', error);
//     }
//   };

//   const handleDeleteBooking = async (id) => {
//     try {
//       const updatedBookings = savedBookings.filter(booking => booking.id !== id);
//       setSavedBookings(updatedBookings);
//       await AsyncStorage.setItem('savedBookings', JSON.stringify(updatedBookings));
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   };

//   const renderSwipeableCountCard = ({ item }) => {
//     const renderRightActions = () => (
//       <View style={styles.deleteButton}>
//         <Text style={styles.deleteText}>Delete</Text>
//       </View>
//     );

//     return (
//       <Swipeable
//         renderRightActions={renderRightActions}
//         onSwipeableRightOpen={() => handleDeleteBooking(item.id)}
//       >
//         <CountCard
//           id={item.id.toString()}
//           title={item.title}
//           imageUrl={item.imageUrl}
//           price={item.price}
//           distance={item.distance}
//           status="Booked"
//           onPress={() => router.push('/ActiveBooking')} // Navigate to ActiveBooking page
//         />
//       </Swipeable>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Saved Bookings</Text>
//         </View>

//         <View style={styles.listContainer}>
//           {savedBookings.length > 0 ? (
//             <FlatList
//               data={savedBookings}
//               renderItem={renderSwipeableCountCard}
//               keyExtractor={(item) => item.id.toString()}
//               contentContainerStyle={styles.listContentContainer}
//             />
//           ) : (
//             <Text style={styles.emptyText}>No saved bookings yet.</Text>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 15,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   listContentContainer: {
//     paddingTop: 20,
//     paddingBottom: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 50,
//     color: 'gray',
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80,
//     height: '100%',
//   },
//   deleteText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default BookingSaved;
