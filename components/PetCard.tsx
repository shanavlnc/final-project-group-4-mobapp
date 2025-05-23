import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Pet } from '../types/types';
import { Ionicons } from '@expo/vector-icons';

interface PetCardProps {
  pet: Pet;
  onPressDetails: () => void;
  isSaved?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onPressDetails, isSaved }) => {
  return (
    <View style={styles.card}>
      <Image source={pet.image} style={styles.image} />
      {isSaved && (
        <View style={styles.savedBadge}>
          <Ionicons name="heart" size={24} color="white" />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.details}>
          {pet.type} • {pet.breed} • {pet.age} years
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {pet.description}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPressDetails}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  savedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
});

export default PetCard;