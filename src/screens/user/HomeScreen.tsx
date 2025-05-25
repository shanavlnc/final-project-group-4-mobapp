import React, { useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useApplication } from '../../context/ApplicationContext';
import { PetCard } from '../../components/PetCard';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
  const { pets, savedPets, toggleSavedPet } = useApplication(); // Using toggleSavedPet from context
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: async (_, gesture) => {
      if (Math.abs(gesture.dx) > 120) {
        const pet = pets[currentIndex];
        if (gesture.dx > 0) { // Right swipe (like)
          await toggleSavedPet(pet.id); // Use toggleSavedPet instead
        }
        goToNext();
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      }
    }
  });

  const goToNext = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true
    }).start(() => {
      setCurrentIndex(prev => (prev + 1) % pets.length);
    });
  };

  if (pets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No pets available</Text>
      </View>
    );
  }

  const currentPet = pets[currentIndex];
  const isSaved = savedPets.some(p => p.id === currentPet.id);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [
              { translateX: position.x },
              { 
                rotate: position.x.interpolate({
                  inputRange: [-200, 0, 200],
                  outputRange: ['-15deg', '0deg', '15deg']
                })
              }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <PetCard 
          pet={currentPet} 
          onFavorite={() => toggleSavedPet(currentPet.id)} // Use toggleSavedPet here
          isFavorite={isSaved}
        />
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={() => {
            goToNext();
          }}
        >
          <Ionicons name="close" size={32} color={theme.danger} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.saveButton]}
          onPress={async () => {
            await toggleSavedPet(currentPet.id); // Use toggleSavedPet here
          }}
        >
          <Ionicons 
            name={isSaved ? 'heart' : 'heart-outline'} 
            size={32} 
            color={isSaved ? theme.danger : theme.primary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  cardContainer: {
    width: '90%',
    height: '70%',
    position: 'absolute',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.textLight,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    position: 'absolute',
    bottom: 50,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  passButton: {
    borderColor: theme.danger,
    borderWidth: 2,
  },
  saveButton: {
    borderColor: theme.primary,
    borderWidth: 2,
  },
});