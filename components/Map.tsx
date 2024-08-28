import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyData from '../app/data/dummyData';
import MapMarker from './MapMarker';

const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
Mapbox.setAccessToken(accessToken);

export default function Map() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

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
        <Camera followUserLocation />
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
});

// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';
// import { useRouter } from 'expo-router';
// import dummyData from '../app/data/dummyData'; // Adjust the path according to your project structure
// import MapMarker from './MapMarker'; // Adjust the path as needed

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//   const router = useRouter();

//   const handleNavigateToBooking = (id: string) => {
//     console.log(`Attempting to navigate to booking screen for id: ${id}`);
//     try {
//       // Try using the navigate method instead of push
//       router.navigate(`/booking/${id}`);
//       console.log('Navigation function called successfully');
//     } catch (error) {
//       console.error('Navigation error:', error);
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
//         <Camera followUserLocation />
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
//           />
//         ))}
//       </MapView>
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
// });


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';
// import dummyData from '../app/data/dummyData'; // Adjust the path according to your project structure
// import MapMarker from './MapMarker'; // Adjust the path as needed

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
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
//         <Camera followUserLocation />
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
//           />
//         ))}
//       </MapView>
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
// });
// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck, MarkerView } from '@rnmapbox/maps';
// import dummyData from '../app/data/dummyData'; // Adjust the path according to your project structure

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//     return (
//         <View style={styles.container}>
//             <MapView 
//                 style={styles.map} 
//                 styleURL="mapbox://styles/mapbox/outdoors-v12"
//                 zoomEnabled={true}
//                 scrollEnabled={true}
//                 pitchEnabled={true}
//                 rotateEnabled={true}>
                
//                 <Camera followUserLocation />
                
//                 <LocationPuck 
//                     puckBearingEnabled 
//                     puckBearing="heading" 
//                     pulsing={{ isEnabled: true }} 
//                 />
                
//                 {/* Render Markers for each location in dummyData */}
//                 {dummyData.map((item) => {
//                     const [latitude, longitude] = item.location.split(',').map(coord => parseFloat(coord.trim()));

//                     // Validate that title and location are valid
//                     if (!item.title || isNaN(latitude) || isNaN(longitude)) {
//                         console.error(`Invalid data for item: ${item}`);
//                         return null; // Skip invalid data
//                     }

//                     return (
//                         <MarkerView
//                             key={item.id}
//                             coordinate={[longitude, latitude]}
//                             anchor={{ x: 0.5, y: 0.5 }}
//                         >
//                             <View style={styles.marker}>
//                                 {/* Ensure text is wrapped in a <Text> component */}
//                                 <Text>{item.title}</Text>
//                             </View>
//                         </MarkerView>
//                     );
//                 })}
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     marker: {
//         backgroundColor: 'gray',
//         padding: 5,
//         borderRadius: 5,
//     },
// });


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck, MarkerView } from '@rnmapbox/maps';
// import dummyData from '../app/data/dummyData'; // Adjust the path according to your project structure

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//     return (
//         <View style={styles.container}>
//             <MapView 
//                 style={styles.map} 
//                 styleURL="mapbox://styles/mapbox/outdoors-v12"
//                 zoomEnabled={true}
//                 scrollEnabled={true}
//                 pitchEnabled={true}
//                 rotateEnabled={true}>
                
//                 <Camera followUserLocation />
                
//                 <LocationPuck 
//                     puckBearingEnabled 
//                     puckBearing="heading" 
//                     pulsing={{ isEnabled: true }} 
//                 />
                
//                 {/* Render Markers for each location in dummyData */}
//                 {dummyData.map((item) => {
//                     const [latitude, longitude] = item.location.split(',').map(coord => parseFloat(coord.trim()));
//                     return (
//                         <MarkerView
//                             key={item.id}
//                             coordinate={[longitude, latitude]}
//                             anchor={{ x: 0.5, y: 0.5 }}
//                         >
//                             <View style={styles.marker}>
//                                 {/* Ensure text is wrapped in a <Text> component */}
//                                 <Text>{item.title}</Text>
//                             </View>
//                         </MarkerView>
//                     );
//                 })}
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     marker: {
//         backgroundColor: 'gray',
//         padding: 5,
//         borderRadius: 5,
//     },
// });




// import React from 'react';
// import { StyleSheet, View,Text } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck, MarkerView } from '@rnmapbox/maps';
// import dummyData from '../app/data/dummyData'; // Adjust the path according to your project structure

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//     return (
//         <View style={styles.container}>
//             <MapView 
//                 style={styles.map} 
//                 styleURL="mapbox://styles/mapbox/outdoors-v12"
//                 zoomEnabled={true}
//                 scrollEnabled={true}
//                 pitchEnabled={true}
//                 rotateEnabled={true}>
                
//                 <Camera followUserLocation />
                
//                 <LocationPuck 
//                     puckBearingEnabled 
//                     puckBearing="heading" 
//                     pulsing={{ isEnabled: true }} 
//                 />
                
//                 {/* Render Markers for each location in dummyData */}
//                 {dummyData.map((item) => {
//                     const [latitude, longitude] = item.location.split(',').map(coord => parseFloat(coord.trim()));
//                     return (
//                         <MarkerView
//                             key={item.id}
//                             coordinate={[longitude, latitude]}
//                             anchor={{ x: 0.5, y: 0.5 }}
//                         >
//                             <View style={styles.marker}>
//                                 {/* Customize your marker view here */}
//                                 <Text>{item.title}</Text>
//                             </View>
//                         </MarkerView>
//                     );
//                 })}
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     marker: {
//         backgroundColor: 'gray',
//         padding: 5,
//         borderRadius: 5,
//     },
// });






// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
// Mapbox.setAccessToken(accessToken);

// export default function Map() {
//     return (
//         <View style={styles.container}>
//             <MapView 
//                 style={styles.map} 
//                 styleURL="mapbox://styles/mapbox/outdoors-v12"
//                 zoomEnabled={true}
//                 scrollEnabled={true}
//                 pitchEnabled={true}
//                 rotateEnabled={true}>
//                 <Camera followUserLocation /> 
//                 <LocationPuck 
//                     puckBearingEnabled 
//                     puckBearing="heading" 
//                     pulsing={{ isEnabled: true }} 
//                 />
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
// });
