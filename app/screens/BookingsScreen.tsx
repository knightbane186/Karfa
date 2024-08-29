import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { BookingState, calculateTotalPrice, getConfirmButtonText, isBookingValid } from '../search/bookingLogic';
import DateTimePicker from '@react-native-community/datetimepicker';
import dummyData from '../data/dummyData';
import { useBookmarks } from '@/hooks/useBookmarks';

const BookingsScreen = () => {
  const { id } = useLocalSearchParams();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({
    pricePerPerson: 10,
    selectedPeople: 0,
    selectedSlots: [],
    selectedDate: new Date(),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [courtData, setCourtData] = useState(null);

  const loadCourtData = useCallback(() => {
    const court = dummyData.find(item => item.id.toString() === id);
    if (court) {
      setCourtData(court);
      setBookingState(prev => ({ ...prev, pricePerPerson: court.price }));
    }
  }, [id]);

  useEffect(() => {
    loadCourtData();
  }, [loadCourtData]);

  useEffect(() => {
    setBookmarked(isBookmarked(Number(id)));
  }, [id, isBookmarked]);

  const handleBookmarkToggle = useCallback(async () => {
    await toggleBookmark(Number(id));
    setBookmarked(prev => !prev);
  }, [id, toggleBookmark]);

  const handleGoBack = () => {
    router.back();
  };

  const handlePeopleChange = useCallback((change: number) => {
    setBookingState(prev => ({
      ...prev,
      selectedPeople: Math.max(0, prev.selectedPeople + change)
    }));
  }, []);

  const handleSlotToggle = useCallback((slot: string) => {
    setBookingState(prev => {
      const newSlots = prev.selectedSlots.includes(slot)
        ? prev.selectedSlots.filter(s => s !== slot)
        : [...prev.selectedSlots, slot];
      return { ...prev, selectedSlots: newSlots };
    });
  }, []);

  const handleConfirmBooking = () => {
    setModalVisible(true);
  };

  const handleDateChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || bookingState.selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBookingState(prev => ({ ...prev, selectedDate: currentDate }));
  }, [bookingState.selectedDate]);

  const availableSlots = ['7 am', '9 am', '11 am', '12 pm', '3 pm', '5 pm', '9 pm', '10 pm'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{courtData ? courtData.title : 'Court'}</Text>
          <Text style={styles.subtitle}>{courtData ? `${courtData.distance} Km from you` : ''}</Text>
        </View>
        <TouchableOpacity onPress={handleBookmarkToggle} style={styles.bookmarkButton}>
          <Ionicons 
            name={bookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={bookmarked ? "#FF0000" : "white"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={24} color="#82EE16" />
            <Text style={styles.infoText}>${bookingState.pricePerPerson} per Person</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#82EE16" />
            <Text style={styles.infoText}>Southbank, VIC</Text>
          </View>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {bookingState.selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={bookingState.selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <Text style={styles.sectionTitle}>People</Text>
          <View style={styles.peopleSelector}>
            <TouchableOpacity onPress={() => handlePeopleChange(-1)}>
              <Ionicons name="remove-circle-outline" size={24} color="#82EE16" />
            </TouchableOpacity>
            <Text style={styles.peopleCount}>{bookingState.selectedPeople}</Text>
            <TouchableOpacity onPress={() => handlePeopleChange(1)}>
              <Ionicons name="add-circle-outline" size={24} color="#82EE16" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotsContainer}>
            {availableSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.slotButton,
                  bookingState.selectedSlots.includes(slot) && styles.selectedSlot,
                ]}
                onPress={() => handleSlotToggle(slot)}
              >
                <Text style={[
                  styles.slotText,
                  bookingState.selectedSlots.includes(slot) && styles.selectedSlotText,
                ]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={getConfirmButtonText(bookingState)}
          handlePress={handleConfirmBooking}
          containerStyles={styles.confirmButton}
          textStyles={styles.confirmButtonText}
          disabled={!isBookingValid(bookingState)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>
              Your booking to {courtData ? courtData.title : 'the court'} is confirmed. You can find all of your active / previous bookings in your profile.
            </Text>
            <CustomButton
              title="My Bookings"
              handlePress={() => {
                setModalVisible(false);
                // Navigate to My Bookings screen
                // router.push('/myBookings');
              }}
              containerStyles={styles.modalButton}
              textStyles={styles.modalButtonText}
            />
            <CustomButton
              title="Done"
              handlePress={() => {
                setModalVisible(false);
                router.back();
              }}
              containerStyles={[styles.modalButton, styles.doneButton]}
              textStyles={styles.modalButtonText}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'lightgrey',
  },
  bookmarkButton: {
    marginLeft: 15,
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
  peopleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  peopleCount: {
    color: 'white',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#82EE16',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    minWidth: 150,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#f0f0f0',
  },
});

export default BookingsScreen;