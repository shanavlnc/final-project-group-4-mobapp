import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { useApplication } from '../../context/ApplicationContext';
import { PetCard } from '../../components/PetCard';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../types/index';

interface SavedPetsScreenProps {
  navigation: StackNavigationProp<UserStackParamList, 'SavedPets'>;
}

export const SavedPetsScreen = ({ navigation }: SavedPetsScreenProps) => {
  const { savedPets, toggleSavedPet } = useApplication(); // Using toggleSavedPet instead of removeSavedPet
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // You can add refresh logic here if needed
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            onPress={() => navigation.navigate('PetDetail', { pet: item })}
            onFavorite={() => toggleSavedPet(item.id)} // Using toggleSavedPet
            isFavorite={true}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike" size={50} color={theme.textLight} />
            <Text style={styles.emptyText}>No saved pets yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart icon on pets to save them
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: theme.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: theme.textLight,
    textAlign: 'center',
  },
});