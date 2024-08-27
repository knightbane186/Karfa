import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MarkerView } from '@rnmapbox/maps';

interface MapMarkerProps {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  onNavigateToBooking: (id: string) => void;
  imageUrl: string;
  distance: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  id,
  title,
  location,
  price,
  status,
  onNavigateToBooking,
  imageUrl,
  distance,
  isSelected,
  onSelect,
}) => {
  const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

  const handleMarkerPress = (e: any) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handlePopupPress = (e: any) => {
    e.stopPropagation();
    onNavigateToBooking(id);
  };

  return (
    <MarkerView
      key={`marker-${id}`}
      coordinate={[longitude, latitude]}
      anchor={{ x: 0.5, y: 1 }}
    >
      <TouchableOpacity onPress={handleMarkerPress} activeOpacity={1}>
        {!isSelected ? (
          <View style={styles.marker}>
            <Text style={styles.markerText}>${price}</Text>
          </View>
        ) : (
          <View style={styles.popupContainer}>
            <TouchableOpacity onPress={handlePopupPress} activeOpacity={1}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.distance}>{distance} from you</Text>
                <View style={styles.priceStatusContainer}>
                  <Text style={styles.status}>{status}</Text>
                  <Text style={styles.price}>${price}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.triangle} />
          </View>
        )}
      </TouchableOpacity>
    </MarkerView>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  priceStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
});

export default MapMarker;