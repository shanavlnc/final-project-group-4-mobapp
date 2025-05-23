import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../navigation/UserStack';
import { usePets } from '../../context/PetsContext';
import { useStorage } from '../../hooks/useStorage';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../../types/types';

type SavedPetsScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  'SavedPets'
>;

const SavedPetsScreen = () => {
  const navigation = useNavigation<SavedPetsScreenNavigationProp>();
  const { pets } = usePets();
  const { getItem, setItem } = useStorage();
  const [savedPets, setSavedPets] = useState<Pet[]>([]);

  // Load saved pets on mount
  useEffect(() => {
    const loadSavedPets = async () => {
      const savedPetIds = await getItem('savedPets');
      if (savedPetIds) {
        const ids = JSON.parse(savedPetIds) as string[];
        const saved = pets.filter(pet => ids.includes(pet.id));
        setSavedPets(saved);
      }
    };
    loadSavedPets();
  }, [pets]);

  const handleRemovePet = async (petId: string) => {
    const updatedSavedPets = savedPets.filter(pet => pet.id !== petId);
    setSavedPets(updatedSavedPets);
    await setItem('savedPets', JSON.stringify(updatedSavedPets.map(pet => pet.id)));
  };

  const handlePressPet = (petId: string) => {
    navigation.navigate('PetDetail', { petId });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={60} color="#FF6B6B" />
      <Text style={styles.emptyTitle}>No Saved Pets</Text>
      <Text style={styles.emptyText}>Save pets you're interested in by swiping right or tapping the heart icon</Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseButtonText}>Browse Pets</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPetCard = ({ item }: { item: Pet }) => (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => handlePressPet(item.id)}
    >
      <Image source={item.image} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petDetails}>{item.breed} • {item.age} yrs</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemovePet(item.id)}
      >
        <Ionicons name="heart" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Saved Pets</Text>
      
      {savedPets.length > 0 ? (
        <FlatList
          data={savedPets}
          renderItem={renderPetCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  petCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  petInfo: {
    padding: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  petDetails: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SavedPetsScreen;