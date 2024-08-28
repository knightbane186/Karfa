
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface CountCardProps {
  title: string;
  distance?: number | string;
  status: 'Available' | 'Booked' | 'Available Later';
  price: number;
}

const CountCard: React.FC<CountCardProps> = ({ title, distance, status, price }) => {
  const statusColor = {
    Available: '#4CAF50',
    Booked: '#FF5252',
    'Available Later': '#FFC107',
  }[status];

  const handleCardPress = () => {
    router.push('/bookings');
  };

  const formatDistance = (distance: number | string | undefined) => {
    if (typeof distance === 'number') {
      return `${distance.toFixed(1)} Km from you`;
    } else if (typeof distance === 'string') {
      return distance;
    }
    return 'Distance unavailable';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      {/* Image at the top */}
      <Image source={require('@/assets/images/basketball1.png')} style={styles.image} />

      {/* Content inside the card */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.distance}>{formatDistance(distance)}</Text>

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
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={(e) => {
          e.stopPropagation(); // Prevent the card's onPress from firing
          // Add your share functionality here
        }}
      >
        <Image source={require('@/assets/icons/plus.png')} style={styles.shareIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
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

