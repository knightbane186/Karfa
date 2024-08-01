
// this sinmore accurate but lets see
//srtill the basis doesnt change.

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';
// import * as Location from 'expo-location';

// const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHo2cXNsMXYwMTd2MmxxMHRoN2luaWVuIn0.5MQnpgOV6Nv4DfCeXppPnw';
// Mapbox.setAccessToken(accessToken);

// // Define the type for location
// type LocationType = Location.LocationObject | null;

// export default function Map() {
//     const [location, setLocation] = useState<LocationType>(null);
//     const [errorMsg, setErrorMsg] = useState<string | null>(null);

//     useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }

//             let currentLocation = await Location.getCurrentPositionAsync({});
//             console.log(currentLocation); // Debugging log
//             setLocation(currentLocation);
//         })();
//     }, []);

//     return (
//         <View style={styles.container}>
//             {errorMsg ? <Text>{errorMsg}</Text> : null}
//             <MapView
//                 style={styles.map}
//                 styleURL="mapbox://styles/mapbox/outdoors-v12"
//                 zoomEnabled={true}
//                 scrollEnabled={true}
//                 pitchEnabled={true}
//                 rotateEnabled={true}
//             >
//                 {location && (
//                     <Camera
//                         centerCoordinate={[location.coords.longitude, location.coords.latitude]}
//                         zoomLevel={14}
//                         animationMode={'flyTo'}
//                         animationDuration={0}
//                     />
//                 )}
//                 <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
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




import React from 'react';
import { StyleSheet, View, } from 'react-native';
import Mapbox, { Çamera, MapView, Camera, LocationPuck } from '@rnmapbox/maps';

const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHo2cXNsMXYwMTd2MmxxMHRoN2luaWVuIn0.5MQnpgOV6Nv4DfCeXppPnw';
Mapbox.setAccessToken(accessToken);

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} styleURL="mapbox://styles/mapbox/outdoors-v12"
            zoomEnabled={true}
            scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}>
               <Camera followUserLocation /> 
               <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{isEnabled:true}}/>
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