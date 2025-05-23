import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { usePets } from '../../context/PetsContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../navigation/UserStack';
import PetCard from '../../components/PetCard';
import { Ionicons } from '@expo/vector-icons';
import { useStorage } from '../../hooks/useStorage';

type HomeScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  'Home'
>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { pets } = usePets();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [availablePets, setAvailablePets] = useState(pets.filter(pet => !pet.adopted));
  const { getItem, setItem } = useStorage();
  const [savedPets, setSavedPets] = useState<string[]>([]);

  // Load saved pets on mount
  useEffect(() => {
    const loadSavedPets = async () => {
      const saved = await getItem('savedPets');
      if (saved) setSavedPets(JSON.parse(saved));
    };
    loadSavedPets();
  }, []);

  // Update available pets when pets context changes
  useEffect(() => {
    setAvailablePets(pets.filter(pet => !pet.adopted));
  }, [pets]);

  const handleSavePet = async (petId: string) => {
    const newSavedPets = [...savedPets, petId];
    setSavedPets(newSavedPets);
    await setItem('savedPets', JSON.stringify(newSavedPets));
    const pet = availablePets.find(p => p.id === petId);
    Alert.alert('Saved!', `${pet?.name} has been added to your saved pets`);
  };

  const handlePressDetails = (pet: any) => {
    navigation.navigate('PetDetail', { petId: pet.id });
  };

  return (
    <View style={styles.container}>
      {availablePets.length > 0 ? (
        <SwiperFlatList
          data={availablePets}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <PetCard 
                pet={item} 
                onPressDetails={() => handlePressDetails(item)}
                isSaved={savedPets.includes(item.id)}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.passButton]}
                  onPress={() => console.log('Passed on', item.name)}
                >
                  <Ionicons name="close" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={() => handleSavePet(item.id)}
                >
                  <Ionicons name="heart" size={32} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          showPagination
          paginationDefaultColor="#e0e0e0"
          paginationActiveColor="#FF6B6B"
          paginationStyleItem={styles.paginationDot}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="paw" size={60} color="#FF6B6B" />
          <Text style={styles.emptyText}>No pets available right now</Text>
          <Text style={styles.emptySubtext}>Check back later for new furry friends!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  slide: {
    width: width - 40,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#FF5252',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;