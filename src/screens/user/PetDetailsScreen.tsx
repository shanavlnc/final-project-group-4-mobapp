import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../types';

export const PetDetailScreen = () => {
  const route = useRoute<RouteProp<UserStackParamList, 'PetDetail'>>();
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const { pet } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </TouchableOpacity>

      <Image source={{ uri: pet.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.details}>
            {pet.species} • {pet.age} • {pet.gender}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="paw" size={20} color={theme.textLight} />
            <Text style={styles.detailText}>Breed: {pet.breed || 'Mixed'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="resize" size={20} color={theme.textLight} />
            <Text style={styles.detailText}>Size: {pet.size || 'Medium'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="heart" size={20} color={theme.textLight} />
            <Text style={styles.detailText}>
              Temperament: {pet.temperament?.join(', ') || 'Friendly'}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.adoptButton}
          onPress={() => navigation.navigate('AdoptionForm', { pet })}
        >
          <Text style={styles.adoptButtonText}>Adopt {pet.name}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 350,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
  },
  details: {
    fontSize: 16,
    color: theme.textLight,
    marginTop: 5,
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 10,
  },
  adoptButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  adoptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});