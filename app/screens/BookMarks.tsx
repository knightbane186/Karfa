import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import CountCard from '@/components/CountCard'; // Import the existing CountCard component
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Bookmark {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  distance: string;
  // Add any other properties that CountCard expects
}

const BookMarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const saveBookmarks = async (updatedBookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const handleDeleteBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const renderSwipeableCountCard = ({ item }: { item: Bookmark }) => {
    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => handleDeleteBookmark(item.id)}
      >
        <CountCard
          {...item}
          // Add any additional props that CountCard expects
          onPress={() => {/* Handle card press */}}
        />
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          renderItem={renderSwipeableCountCard}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No bookmarks yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
