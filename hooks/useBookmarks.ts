import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_STORAGE_KEY = 'businessBookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARK_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarks(new Set(JSON.parse(storedBookmarks)));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (id: number) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarks(newBookmarks);
    try {
      await AsyncStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(Array.from(newBookmarks)));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const isBookmarked = (id: number) => bookmarks.has(id);

  return { bookmarks, toggleBookmark, isBookmarked };
};