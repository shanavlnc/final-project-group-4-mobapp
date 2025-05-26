import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '.././constants/colors';
import { Pet } from '.././types/index';

interface PetCardProps {
  pet: Pet;
  onPress?: () => void;
  onDelete?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  adminMode?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ 
  pet, 
  onPress, 
  onDelete, 
  onFavorite,
  isFavorite = false,
  adminMode = false 
}) => {
  const statusColor = pet.status === 'available' ? theme.success : theme.danger;

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={pet.imageUrl} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{pet.name}</Text>
            {onFavorite && (
              <TouchableOpacity onPress={onFavorite}>
                <Ionicons 
                  name={isFavorite ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={isFavorite ? theme.danger : theme.textLight} 
                />
              </TouchableOpacity>
            )}
          </View>
          
          <Text style={styles.details}>
            {pet.species} • {pet.age} • {pet.gender}
          </Text>
          
          {pet.size && (
            <Text style={styles.size}>Size: {pet.size}</Text>
          )}

          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{pet.status.toUpperCase()}</Text>
          </View>
        </View>

        {adminMode && onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => 
              Alert.alert(
                'Confirm Delete',
                `Remove ${pet.name} from the system?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: onDelete, style: 'destructive' }
                ]
              )
            }
          >
            <Ionicons name="trash" size={20} color={theme.danger} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: theme.textLight,
  },
  size: {
    fontSize: 14,
    color: theme.textLight,
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    marginLeft: 16,
    padding: 8,
  },
});