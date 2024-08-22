
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const BookingsScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');

  const availableSlots = ['7 am', '10 am', '11 am', '12 pm', '3 pm', '5 pm', '9 pm', '10 pm'];

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Ashford Courts</Text>
          <Text style={styles.subtitle}>0.3 Km from you</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={24} color="#82EE16" />
            <Text style={styles.infoText}>$10 per Person</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#82EE16" />
            <Text style={styles.infoText}>Southbank, VIC</Text>
          </View>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>DD / MM / YYYY</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>People</Text>
          <TouchableOpacity style={styles.input}>
            <Text style={styles.inputText}>{selectedPeople}</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotsContainer}>
            {availableSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotButton,
                  selectedSlot === slot && styles.selectedSlot,
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[
                  styles.slotText,
                  selectedSlot === slot && styles.selectedSlotText,
                ]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Confirm Booking"
          handlePress={() => {/* Implement booking confirmation logic */}}
          containerStyles={styles.confirmButton}
          textStyles={styles.confirmButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    marginLeft: 10,
  },
  bookingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputText: {
    color: 'white',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotButton: {
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    width: '23%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedSlot: {
    backgroundColor: '#82EE16',
  },
  slotText: {
    color: 'white',
  },
  selectedSlotText: {
    color: 'black',
  },
  footer: {
    padding: 20,
  },
  confirmButton: {
    backgroundColor: '#82EE16',
    borderRadius: 8,
    padding: 15,
  },
  confirmButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookingsScreen;


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import CustomButton from '@/components/CustomButton';

// const BookingsScreen = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedPeople, setSelectedPeople] = useState(0);
//   const [selectedSlot, setSelectedSlot] = useState('');

//   const availableSlots = ['7 am', '10 am', '11 am', '12 pm', '3 pm', '5 pm', '9 pm', '10 pm'];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>

//           <Text style={styles.title}>Ashford Courts</Text>
//           <Text style={styles.subtitle}>0.3 Km from you</Text>
//         </View>

//         <View style={styles.infoContainer}>
//           <View style={styles.infoItem}>
//             <Ionicons name="cash-outline" size={24} color="#82EE16" />
//             <Text style={styles.infoText}>$10 per Person</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Ionicons name="location-outline" size={24} color="#82EE16" />
//             <Text style={styles.infoText}>Southbank, VIC</Text>
//           </View>
//         </View>

//         <View style={styles.bookingSection}>
//           <Text style={styles.sectionTitle}>Date</Text>
//           {/* Implement date picker here */}
//           <TouchableOpacity style={styles.input}>
//             <Text>DD / MM / YYYY</Text>
//           </TouchableOpacity>

//           <Text style={styles.sectionTitle}>People</Text>
//           {/* Implement number picker here */}
//           <TouchableOpacity style={styles.input}>
//             <Text>{selectedPeople}</Text>
//           </TouchableOpacity>

//           <Text style={styles.sectionTitle}>Available Slots</Text>
//           <View style={styles.slotsContainer}>
//             {availableSlots.map((slot) => (
//               <TouchableOpacity
//                 key={slot}
//                 style={[
//                   styles.slotButton,
//                   selectedSlot === slot && styles.selectedSlot,
//                 ]}
//                 onPress={() => setSelectedSlot(slot)}
//               >
//                 <Text style={[
//                   styles.slotText,
//                   selectedSlot === slot && styles.selectedSlotText,
//                 ]}>{slot}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <CustomButton
//           title="Confirm Booking"
//           handlePress={() => {/* Implement booking confirmation logic */}}
//           containerStyles={styles.confirmButton}
//           textStyles={styles.confirmButtonText}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'gray',
//   },
//   header: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   infoText: {
//     color: 'white',
//     marginLeft: 10,
//   },
//   bookingSection: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#1E1E1E',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   slotsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   slotButton: {
//     backgroundColor: '#1E1E1E',
//     padding: 10,
//     borderRadius: 8,
//     width: '23%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   selectedSlot: {
//     backgroundColor: '#82EE16',
//   },
//   slotText: {
//     color: 'white',
//   },
//   selectedSlotText: {
//     color: 'black',
//   },
//   footer: {
//     padding: 20,
//   },
//   confirmButton: {
//     backgroundColor: '#82EE16',
//     borderRadius: 8,
//     padding: 15,
//   },
//   confirmButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default BookingsScreen;