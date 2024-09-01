import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActiveBooking = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <Image
        source={{ uri: 'https://via.placeholder.com/393x262' }}
        style={styles.image}
      />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>9:41</Text>
      </View>

      {/* Header Icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Booking Info */}
      <View style={styles.bookingInfo}>
        <Text style={styles.title}>Ashford Courts</Text>
        <Text style={styles.subtitle}>0.3 Km from you</Text>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/44x44' }}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={15} color="#a2a2a2" />
          <Text style={styles.detailText}>$10 per Person</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={15} color="#a2a2a2" />
          <Text style={styles.detailText}>Southbank, VIC</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cloud-outline" size={15} color="#a2a2a2" />
          <Text style={styles.detailText}>Outdoor</Text>
        </View>
      </View>

      {/* Date and People Selection */}
      <View style={styles.selectionContainer}>
        <View style={styles.selectionItem}>
          <Ionicons name="calendar-outline" size={17} color="#333" />
          <Text style={styles.selectionLabel}>Date</Text>
          <View style={styles.selectionBox}>
            <Text style={styles.selectionText}>14 / 08 / 2024</Text>
          </View>
        </View>
        <View style={styles.selectionItem}>
          <Ionicons name="people-outline" size={17} color="#333" />
          <Text style={styles.selectionLabel}>People</Text>
          <View style={styles.selectionBox}>
            <Text style={styles.selectionText}>3</Text>
          </View>
        </View>
      </View>

      {/* Booked Slots */}
      <View style={styles.slotsContainer}>
        <Text style={styles.slotsTitle}>Booked Slots</Text>
        <View style={styles.slotsRow}>
          <View style={styles.slotBox}>
            <Text style={styles.slotText}>9 am</Text>
          </View>
          <View style={styles.slotBox}>
            <Text style={styles.slotText}>11 am</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total: $50</Text>
        </View>
        <TouchableOpacity style={styles.cancelButton}>
          <Ionicons name="close-circle-outline" size={17} color="#e4626f" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: 262,
    borderRadius: 20,
  },
  statusBar: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusBarText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerIcons: {
    position: 'absolute',
    top: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    color: '#a2a2a2',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  detailsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 999,
  },
  detailText: {
    marginLeft: 5,
    color: '#a2a2a2',
    fontSize: 15,
  },
  selectionContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionItem: {
    flex: 1,
  },
  selectionLabel: {
    color: '#a2a2a2',
    fontSize: 15,
  },
  selectionBox: {
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  selectionText: {
    fontSize: 15,
    color: '#333',
  },
  slotsContainer: {
    marginTop: 20,
  },
  slotsTitle: {
    color: '#333',
    fontSize: 17,
  },
  slotsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  slotBox: {
    flex: 1,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  slotText: {
    color: '#fff',
    fontSize: 17,
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalBox: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 17,
    color: '#6b6b6b',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffe9eb',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  cancelText: {
    color: '#e4626f',
    fontSize: 17,
    marginLeft: 5,
  },
});

export default ActiveBooking;