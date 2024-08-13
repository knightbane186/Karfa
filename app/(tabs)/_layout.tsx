

import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Tabs, usePathname } from 'expo-router';
import { icons } from '@/constants';
import dummyData from '../data/dummyData';
import CourtCard from '@/components/CountCard';

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          focused ? styles.focusedText : styles.regularText,
          { color: color },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomHeader: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Image
            source={icons.search}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sideButton}>
        <Image
          source={icons.play}
          style={styles.sideButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = dummyData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const showHeader = ['/home', '/create'].includes(pathname);

  return (
    <View style={{ flex: 1 }}>
      {showHeader && <CustomHeader onSearch={handleSearch} />}
      
      {isSearching ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourtCard
              imageUrl={item.imageUrl}
              title={item.title}
              distance={item.distance}
              status={item.status}
              price={item.price}
            />
          )}
          contentContainerStyle={styles.listContainer}
          style={{ paddingBottom: 120 }} // Ensures no overlap with the tab bar
        />
      ) : (
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#ffa001',
            tabBarInactiveTintColor: '#cdcde0',
            tabBarStyle: styles.tabBarStyle,
          }}
        >
          {/* Tab Screens */}
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.search}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="inbox"
            options={{
              title: 'Inbox',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.play}
                  color={color}
                  name="Inbox"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="bookmark"
            options={{
              title: 'Bookmark',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Bookmark"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffa001',
  },
  sideButton: {
    backgroundColor: '#ffa001',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  focusedText: {
    fontFamily: 'psemibold',
    fontSize: 10,
  },
  regularText: {
    fontFamily: 'pregular',
    fontSize: 10,
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#161622',
    borderTopWidth: 1,
    borderTopColor: '#232533',
    height: 84,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 120,
  },
});

export default TabsLayout;
