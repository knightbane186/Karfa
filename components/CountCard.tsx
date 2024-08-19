// components/CourtCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CourtCardProps {
  imageUrl: string;
  title: string;
  distance: string;
  status: 'Available' | 'Booked' | 'Available Later';
  price: string;
}

const CourtCard: React.FC<CourtCardProps> = ({ imageUrl, title, distance, status, price }) => {
  const statusColor = {
    Available: '#4CAF50',
    Booked: '#FF5252',
    'Available Later': '#FFC107',
  }[status];

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.distance}>{distance}</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { backgroundColor: statusColor }]}>
            {status}
          </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, 
    zIndex: 1// For Android
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distance: {
    color: '#777',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  price: {
    fontSize: 14,
    color: '#777',
  },
});

export default CourtCard;