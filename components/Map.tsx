import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';

const accessToken = 'pk.eyJ1IjoiZGVudmVyMCIsImEiOiJjbHpxeXU1aHMwMTk2MmxvbjRqbzRmeWpyIn0.NZ-Xjxx7L5ARWfPkDm0a6A';
Mapbox.setAccessToken(accessToken);

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                styleURL="mapbox://styles/mapbox/outdoors-v12"
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}>
                <Camera followUserLocation /> 
                <LocationPuck 
                    puckBearingEnabled 
                    puckBearing="heading" 
                    pulsing={{ isEnabled: true }} 
                />
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
