import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CountCard from '@/components/CountCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyData from '../data/dummyData';

interface BusinessData {
  id: number;  // Changed from string to number
  title: string;  // Changed from name to title
  imageUrl: string;  // Changed from image_url to imageUrl
  price: number;  // Changed from string to number
  distance?: number;  // Make distance optional
  status: string;  // Added this field
  category: string;  // Added this field
  categoryType: string;  // Added this field
  bookingSlots: string;  // Added this field
  location: string;
  openTime: number;  // Changed from string to number
  closeTime: number;  // Changed from string to number
  rating?: number;  // Made optional
  review_count?: number;  // Made optional
}

const BookMarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BusinessData[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('businessBookmarks');
      if (storedBookmarks) {
        const parsedBookmarks = JSON.parse(storedBookmarks);
        if (Array.isArray(parsedBookmarks) && parsedBookmarks.length > 0) {
          // Ensure all required fields are present
          const validBookmarks = parsedBookmarks.filter(bookmark => 
            bookmark.id !== undefined &&
            bookmark.title !== undefined &&
            bookmark.imageUrl !== undefined &&
            bookmark.price !== undefined
          );
          setBookmarks(validBookmarks);
        } else {
          // If stored bookmarks are empty or invalid, use first 5 items from dummyData
          setBookmarks(dummyData.slice(0, 5));
        }
      } else {
        // If no stored bookmarks, use first 5 items from dummyData
        setBookmarks(dummyData.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      // In case of error, still set some data from dummyData
      setBookmarks(dummyData.slice(0, 5));
    }
  };

  const saveBookmarks = async (updatedBookmarks: BusinessData[]) => {
    try {
      await AsyncStorage.setItem('businessBookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const handleDeleteBookmark = (id: number) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const renderSwipeableCountCard = ({ item }: { item: BusinessData }) => {
    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    );

    const distanceText = item.distance !== undefined ? `${item.distance.toFixed(2)} km` : 'N/A';

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => handleDeleteBookmark(item.id)}
      >
        <CountCard
          id={item.id.toString()}
          title={item.title || 'No Title'}
          imageUrl={item.imageUrl || ''}
          price={`$${item.price || 0}`}
          distance={distanceText}
          onPress={() => {/* Handle card press, e.g., navigate to business details */}}
        />
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with icons */}
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bookmarks</Text>
          <TouchableOpacity onPress={() => router.push('/screens/Profile')}>
            <Ionicons name="person-outline" size={24} color="green" style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {bookmarks.length > 0 ? (
            <FlatList
              data={bookmarks}
              renderItem={renderSwipeableCountCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <Text style={styles.emptyText}>No bookmarks yet</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookMarks;
