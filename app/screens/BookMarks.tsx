import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CountCard from '@/components/CountCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyData from '../data/BdummyData';

interface BusinessData {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  distance?: number;
  status: string;
  category: string;
  categoryType: string;
  bookingSlots: string;
  location: string;
  openTime: number;
  closeTime: number;
  rating?: number;
  review_count?: number;
}

const BookMarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BusinessData[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarkIds = await AsyncStorage.getItem('businessBookmarks');
      if (storedBookmarkIds) {
        const bookmarkIds = new Set(JSON.parse(storedBookmarkIds));
        const bookmarkedItems = dummyData.filter(item => bookmarkIds.has(item.id));
        setBookmarks(bookmarkedItems);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const handleDeleteBookmark = async (id: number) => {
    try {
      const storedBookmarkIds = await AsyncStorage.getItem('businessBookmarks');
      if (storedBookmarkIds) {
        const bookmarkIds = new Set(JSON.parse(storedBookmarkIds));
        bookmarkIds.delete(id);
        await AsyncStorage.setItem('businessBookmarks', JSON.stringify(Array.from(bookmarkIds)));
        loadBookmarks(); // Reload bookmarks after deletion
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const renderSwipeableCountCard = ({ item }: { item: BusinessData }) => {
    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    );

    const distanceText = item.distance !== undefined && item.distance !== null
      ? `${item.distance.toFixed(2)} km`
      : 'Distance N/A';

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
