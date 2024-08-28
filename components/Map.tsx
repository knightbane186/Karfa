import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Mapbox, { Camera, MapView, LocationPuck, UserLocation } from '@rnmapbox/maps';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyData from '../app/data/dummyData';
import MapMarker from './MapMarker';
import { Ionicons } from '@expo/vector-icons';

const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
Mapbox.setAccessToken(accessToken);

export default function Map() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('businessBookmarks');
      if (storedBookmarks) {
        setBookmarks(new Set(JSON.parse(storedBookmarks)));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const saveBookmarks = async (updatedBookmarks: Set<number>) => {
    try {
      await AsyncStorage.setItem('businessBookmarks', JSON.stringify(Array.from(updatedBookmarks)));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const handleNavigateToBooking = (id: string) => {
    console.log(`Navigating to BookingsScreen for id: ${id}`);
    try {
      router.push(`/screens/BookingsScreen?id=${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleBookmark = (id: number, isBookmarked: boolean) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (isBookmarked) {
        newBookmarks.add(id);
      } else {
        newBookmarks.delete(id);
      }
      saveBookmarks(newBookmarks);
      return newBookmarks;
    });
  };

  const handleUserLocationUpdate = (location: Mapbox.Location) => {
    setUserLocation([location.coords.longitude, location.coords.latitude]);
  };

  const handleReturnToLocation = () => {
    if (userLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 500,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/outdoors-v12"
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Camera
          ref={cameraRef}
          zoomLevel={12}
          centerCoordinate={userLocation || [0, 0]}
          animationDuration={0}
        />
        <UserLocation
          onUpdate={handleUserLocationUpdate}
          minDisplacement={10}
        />
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />

        {dummyData.map((item) => (
          <MapMarker
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.location}
            price={item.price}
            status={item.status}
            onNavigateToBooking={handleNavigateToBooking}
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.has(item.id)}
            imageUrl={item.imageUrl}
            distance={item.distance}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={handleReturnToLocation}>
        <Ionicons name="locate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck, UserLocation } from '@rnmapbox/maps';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// import dummyData from '../app/data/dummyData';
// import MapMarker from './MapMarker';

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//   const router = useRouter();
//   const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
//   const [userLocation, setUserLocation] = useState(null);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     loadBookmarks();
//   }, []);

//   const loadBookmarks = async () => {
//     try {
//       const storedBookmarks = await AsyncStorage.getItem('businessBookmarks');
//       if (storedBookmarks) {
//         setBookmarks(new Set(JSON.parse(storedBookmarks)));
//       }
//     } catch (error) {
//       console.error('Error loading bookmarks:', error);
//     }
//   };

//   const saveBookmarks = async (updatedBookmarks: Set<number>) => {
//     try {
//       await AsyncStorage.setItem('businessBookmarks', JSON.stringify(Array.from(updatedBookmarks)));
//     } catch (error) {
//       console.error('Error saving bookmarks:', error);
//     }
//   };

//   const handleNavigateToBooking = (id: string) => {
//     console.log(`Navigating to BookingsScreen for id: ${id}`);
//     try {
//       router.push(`/screens/BookingsScreen?id=${id}`);
//     } catch (error) {
//       console.error('Navigation error:', error);
//     }
//   };

//   const handleBookmark = (id: number, isBookmarked: boolean) => {
//     setBookmarks(prev => {
//       const newBookmarks = new Set(prev);
//       if (isBookmarked) {
//         newBookmarks.add(id);
//       } else {
//         newBookmarks.delete(id);
//       }
//       saveBookmarks(newBookmarks);
//       return newBookmarks;
//     });
//   };

//   const handleUserLocationUpdate = (location) => {
//     setUserLocation([location.coords.longitude, location.coords.latitude]);
//   };

//   const handleReturnToLocation = () => {
//     if (userLocation && cameraRef.current) {
//       cameraRef.current.setCamera({
//         centerCoordinate: userLocation,
//         zoomLevel: 14,
//         animationDuration: 2000,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         styleURL="mapbox://styles/mapbox/outdoors-v12"
//         zoomEnabled={true}
//         scrollEnabled={true}
//         pitchEnabled={true}
//         rotateEnabled={true}
//       >
//         <Camera 
//           ref={cameraRef}
//           followUserLocation={false}
//           followUserMode="normal"
//         />
//         <UserLocation
//           onUpdate={handleUserLocationUpdate}
//           minDisplacement={10}
//         />
//         <LocationPuck
//           puckBearingEnabled
//           puckBearing="heading"
//           pulsing={{ isEnabled: true }}
//         />

//         {dummyData.map((item) => (
//           <MapMarker
//             key={item.id}
//             id={item.id}
//             title={item.title}
//             location={item.location}
//             price={item.price}
//             status={item.status}
//             onNavigateToBooking={handleNavigateToBooking}
//             onBookmark={handleBookmark}
//             isBookmarked={bookmarks.has(item.id)}
//             imageUrl={item.imageUrl}
//             distance={item.distance}
//           />
//         ))}
//       </MapView>

//       <TouchableOpacity style={styles.locationButton} onPress={handleReturnToLocation}>
//         <Ionicons name="locate" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   locationButton: {
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     backgroundColor: '#007AFF',
//     borderRadius: 30,
//     padding: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
// });
