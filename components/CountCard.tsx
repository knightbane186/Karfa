
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CountCardProps {
  title: string;
  distance: number;
  status: 'Available' | 'Booked' | 'Available Later';
  price: number;
}

const CountCard: React.FC<CountCardProps> = ({ title, distance, status, price }) => {
  const statusColor = {
    Available: '#4CAF50',
    Booked: '#FF5252',
    'Available Later': '#FFC107',
  }[status];

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image source={require('@/assets/images/basketball1.png')} style={styles.image} />

      {/* Content inside the card */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.distance}>{distance.toFixed(1)} Km from you</Text>

        {/* Bottom row: status and price */}
        <View style={styles.bottomRow}>
          <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton}>
        <Image source={require('@/assets/icons/plus.png')} style={styles.shareIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distance: {
    color: '#777',
    marginBottom: 10,
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 50,
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#000',
  },
  shareButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  shareIcon: {
    width: 16,
    height: 16,
    tintColor: '#777',
  },
});

export default CountCard;

// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// interface CountCardProps {
//   title: string;
//   distance: string;
//   status: 'Available' | 'Booked' | 'Available Later';
//   price: string;
// }

// const CountCard: React.FC<CountCardProps> = ({ title, distance, status, price }) => {
//   const statusColor = {
//     Available: '#4CAF50',
//     Booked: '#FF5252',
//     'Available Later': '#FFC107',
//   }[status];

//   return (
//     <View style={styles.container}>
//       {/* Image at the top */}
//       <Image source={require('@/assets/images/basketball1.png')} style={styles.image} />

//       {/* Content inside the card */}
//       <View style={styles.contentContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.distance}>{distance} Km from you</Text>

//         {/* Bottom row: status and price */}
//         <View style={styles.bottomRow}>
//           <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
//             <Text style={styles.statusText}>{status}</Text>
//           </View>
//           <View style={styles.priceContainer}>
//             {/* <Text style={styles.priceSymbol}>$</Text> */}
//             <Text style={styles.price}>{price}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Share Button */}
//       <TouchableOpacity style={styles.shareButton}>
//         <Image source={require('@/assets/icons/plus.png')} style={styles.shareIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     overflow: 'hidden', // Ensures the rounded corners are respected for the image
//     position: 'relative', // Allows absolute positioning of the share button
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   contentContainer: {
//     padding: 15,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   distance: {
//     color: '#777',
//     marginBottom: 10,
//     fontSize: 12,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingRight: 50, // Added padding to avoid overlap with share button
//   },
//   statusContainer: {
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'medium',
//     color: '#000',
//   },
//   shareButton: {
//     position: 'absolute',
//     right: 15,
//     bottom: 15,
//     backgroundColor: '#f0f0f0',
//     padding: 8,
//     borderRadius: 20,
//     zIndex: 10, // Ensure it appears above other elements
//   },
//   shareIcon: {
//     width: 16,
//     height: 16,
//     tintColor: '#777',
//   },
// });

// export default CountCard;



// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// interface CountCardProps {
//   title: string;
//   distance: string;
//   status: 'Available' | 'Booked' | 'Available Later';
//   price: string;
// }

// const CountCard: React.FC<CountCardProps> = ({ title, distance, status, price }) => {
//   const statusColor = {
//     Available: '#4CAF50',
//     Booked: '#FF5252',
//     'Available Later': '#FFC107',
//   }[status];

//   return (
//     <View style={styles.container}>
//       {/* Image at the top */}
//       <Image source={require('@/assets/images/basketball1.png')} style={styles.image} />

//       {/* Content inside the card */}
//       <View style={styles.contentContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.distance}>{distance}</Text>

//         {/* Bottom row: status and price */}
//         <View style={styles.bottomRow}>
//           <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
//             <Text style={styles.statusText}>{status}</Text>
//           </View>
//           <Text style={styles.price}>${price}</Text>
//         </View>
//       </View>

//       {/* Share Button */}
//       <TouchableOpacity style={styles.shareButton}>
//         <Image source={require('@/assets/icons/plus.png')} style={styles.shareIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     overflow: 'hidden', // Ensures the rounded corners are respected for the image
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   contentContainer: {
//     padding: 15,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   distance: {
//     color: '#777',
//     marginBottom: 10,
//     fontSize: 12,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   statusContainer: {
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   shareButton: {
//     position: 'absolute',
//     right: 10,
//     bottom: 10,
//     backgroundColor: '#f0f0f0',
//     padding: 8,
//     borderRadius: 20,
//   },
//   shareIcon: {
//     width: 16,
//     height: 16,
//     tintColor: '#777',
//   },
// });

// export default CountCard;




//Updated CountCard.tsx

// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// interface CountCardProps {
//   title: string;
//   distance: string;
//   status: 'Available' | 'Booked' | 'Available Later';
//   price: string;
// }

// const CountCard: React.FC<CountCardProps> = ({ title, distance, status, price }) => {
//   const statusColor = {
//     Available: '#4CAF50',
//     Booked: '#FF5252',
//     'Available Later': '#FFC107',
//   }[status];

//   return (
//     <View style={styles.container}>
//       <Image source={require('@/assets/images/basketball1.png')} style={styles.image} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.distance}>{distance}</Text>
//         <View style={styles.bottomRow}>
//           <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
//             <Text style={styles.statusText}>{status}</Text>
//           </View>
//           <View style={styles.priceContainer}>
//             <Text style={styles.priceSymbol}>$</Text>
//             <Text style={styles.price}>{price.replace('$', '')}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
//           <Text style={styles.iconText}>S</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
//           <Text style={styles.iconText}>B</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     zIndex: 1
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   infoContainer: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   distance: {
//     color: '#777',
//     marginBottom: 5,
//     fontSize: 12,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   statusContainer: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//   },
//   priceSymbol: {
//     fontSize: 12,
//     color: '#777',
//     marginRight: 2,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   buttonContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   iconButton: {
//     padding: 5,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 2,
//   },
//   iconText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default CountCard;

// // components/CourtCard.tsx

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// interface CourtCardProps {
//   imageUrl: string;
//   title: string;
//   distance: string;
//   status: 'Available' | 'Booked' | 'Available Later';
//   price: string;
// }

// const CourtCard: React.FC<CourtCardProps> = ({ imageUrl, title, distance, status, price }) => {
//   const statusColor = {
//     Available: '#4CAF50',
//     Booked: '#FF5252',
//     'Available Later': '#FFC107',
//   }[status];

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: imageUrl }} style={styles.image} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.distance}>{distance}</Text>
//         <View style={styles.statusContainer}>
//           <Text style={[styles.status, { backgroundColor: statusColor }]}>
//             {status}
//           </Text>
//           <Text style={styles.price}>{price}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5, 
//     zIndex: 1// For Android
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   infoContainer: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   distance: {
//     color: '#777',
//     marginBottom: 5,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   status: {
//     color: '#fff',
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   price: {
//     fontSize: 14,
//     color: '#777',
//   },
// });

// export default CourtCard;