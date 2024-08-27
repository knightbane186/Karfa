import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { MarkerView } from '@rnmapbox/maps';

interface MapMarkerProps {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  onNavigateToBooking: (id: string) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ id, title, location, price, status, onNavigateToBooking }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error(`Invalid location data for item: ${id}`);
    return null;
  }

  const handlePopupPress = () => {
    console.log(`Pop-up pressed for id: ${id}`);
    setShowPopup(false);
    onNavigateToBooking(id);
  };

  return (
    <>
      <MarkerView
        key={id}
        coordinate={[longitude, latitude]}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <TouchableOpacity onPress={() => setShowPopup(true)} style={styles.marker}>
          <Text style={styles.markerText}>{title}</Text>
        </TouchableOpacity>
      </MarkerView>

      <Modal
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowPopup(false)}
        >
          <TouchableOpacity
            style={styles.popupContainer}
            activeOpacity={1}
            onPress={handlePopupPress}
          >
            <Text style={styles.popupTitle}>{title}</Text>
            <Text>Price: ${price}</Text>
            <Text>Status: {status}</Text>
            <Text style={styles.bookNowText}>Tap to book now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
    marker: {
      backgroundColor: 'gray',
      padding: 5,
      borderRadius: 5,
    },
    markerText: {
      color: 'white',
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    popupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bookNowText: {
      marginTop: 10,
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });

export default MapMarker;

// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
// import { MarkerView } from '@rnmapbox/maps';

// interface MapMarkerProps {
//   id: string;
//   title: string;
//   location: string;
//   price: number;
//   status: string;
// }

// const MapMarker: React.FC<MapMarkerProps> = ({ id, title, location, price, status }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

//   if (isNaN(latitude) || isNaN(longitude)) {
//     console.error(`Invalid location data for item: ${id}`);
//     return null;
//   }

//   return (
//     <>
//       <MarkerView
//         key={id}
//         coordinate={[longitude, latitude]}
//         anchor={{ x: 0.5, y: 0.5 }}
//       >
//         <TouchableOpacity onPress={() => setShowPopup(true)} style={styles.marker}>
//           <Text style={styles.markerText}>{title}</Text>
//         </TouchableOpacity>
//       </MarkerView>

//       <Modal
//         transparent={true}
//         visible={showPopup}
//         onRequestClose={() => setShowPopup(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setShowPopup(false)}
//         >
//           <View style={styles.popupContainer}>
//             <Text style={styles.popupTitle}>{title}</Text>
//             <Text>Price: ${price}</Text>
//             <Text>Status: {status}</Text>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   marker: {
//     backgroundColor: 'gray',
//     padding: 5,
//     borderRadius: 5,
//   },
//   markerText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   popupContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default MapMarker;