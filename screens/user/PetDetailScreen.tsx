import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Linking, Alert } from 'react-native';
import { Button, Text, Card, Divider, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../navigation/UserStack';
import { usePets } from '../../context/PetsContext';
import { useStorage } from '../../hooks/useStorage';
import { Ionicons } from '@expo/vector-icons';

type PetDetailScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  'PetDetail'
>;

const PetDetailScreen = () => {
  const navigation = useNavigation<PetDetailScreenNavigationProp>();
  const route = useRoute();
  const { petId } = route.params as { petId: string };
  const { pets } = usePets();
  const { getItem, setItem } = useStorage();
  const [isSaved, setIsSaved] = useState(false);

  // Load saved status on mount
  React.useEffect(() => {
    const checkSavedStatus = async () => {
      const savedPets = await getItem('savedPets');
      if (savedPets) {
        setIsSaved(JSON.parse(savedPets).includes(petId));
      }
    };
    checkSavedStatus();
  }, [petId]);

  const pet = pets.find(p => p.id === petId);

  if (!pet) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Pet not found</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Home
        </Button>
      </View>
    );
  }

  const handleSavePet = async () => {
    const savedPets = await getItem('savedPets');
    let updatedSavedPets = savedPets ? JSON.parse(savedPets) : [];
    
    if (isSaved) {
      updatedSavedPets = updatedSavedPets.filter((id: string) => id !== petId);
    } else {
      updatedSavedPets.push(petId);
    }

    await setItem('savedPets', JSON.stringify(updatedSavedPets));
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Removed from Saved' : 'Saved to Favorites',
      isSaved ? `${pet.name} has been removed from your saved pets` : `${pet.name} has been added to your saved pets`
    );
  };

  const handleAdoptPress = () => {
    navigation.navigate('AdoptionForm', { petId: pet.id });
  };

  const handleCallShelter = () => {
    Linking.openURL(`tel:${pet.shelterPhone}`).catch(err => 
      Alert.alert('Error', 'Could not make a call')
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={pet.image} style={styles.petImage} />
        <IconButton
          icon={isSaved ? 'heart' : 'heart-outline'}
          iconColor={isSaved ? '#FF6B6B' : '#fff'}
          size={30}
          onPress={handleSavePet}
          style={styles.heartButton}
        />
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Text variant="titleLarge" style={styles.petName}>{pet.name}</Text>
            <Text variant="bodyMedium" style={styles.petType}>{pet.type} • {pet.breed}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="paw" size={20} color="#FF6B6B" />
            <Text style={styles.detailText}>Age: {pet.age} years</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="transgender" size={20} color="#FF6B6B" />
            <Text style={styles.detailText}>Gender: {pet.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={20} color="#FF6B6B" />
            <Text style={styles.detailText}>Available since: {new Date(pet.availableDate).toLocaleDateString()}</Text>
          </View>

          <Divider style={styles.divider} />

          <Text variant="bodyLarge" style={styles.sectionTitle}>About {pet.name}</Text>
          <Text style={styles.descriptionText}>{pet.description}</Text>

          <Divider style={styles.divider} />

          <Text variant="bodyLarge" style={styles.sectionTitle}>Care Instructions</Text>
          <Text style={styles.descriptionText}>{pet.careInstructions || 'No special care instructions provided.'}</Text>

          <Divider style={styles.divider} />

          <Text variant="bodyLarge" style={styles.sectionTitle}>Shelter Information</Text>
          <View style={styles.shelterInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="location" size={20} color="#FF6B6B" />
              <Text style={styles.detailText}>{pet.shelterLocation}</Text>
            </View>
            <TouchableOpacity 
              style={styles.detailRow}
              onPress={handleCallShelter}
            >
              <Ionicons name="call" size={20} color="#FF6B6B" />
              <Text style={[styles.detailText, styles.linkText]}>{pet.shelterPhone}</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleAdoptPress}
        style={styles.adoptButton}
        labelStyle={styles.adoptButtonText}
        icon="heart"
      >
        Adopt {pet.name}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 20,
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
  },
  imageContainer: {
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    margin: 16,
    marginTop: -20,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
  },
  headerRow: {
    marginBottom: 16,
  },
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  petType: {
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF6B6B',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  shelterInfo: {
    marginTop: 8,
  },
  adoptButton: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
  },
  adoptButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PetDetailScreen;