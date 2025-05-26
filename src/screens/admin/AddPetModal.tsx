import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Image,
  Text, 
  TouchableOpacity
} from 'react-native';
import { useApplication } from '../../context/ApplicationContext';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton'; // Import PrimaryButton
import { theme } from '../../constants/colors';
import { 
  speciesOptions, 
  petSizeOptions, 
  temperamentOptions,
  genderOptions
} from '../../constants/pets';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type PetSize = 'small' | 'medium' | 'large';

interface PetFormData {
  id?: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  size?: PetSize;
  temperament: string[];
  description: string;
  imageUrl: string | null;
}

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  petToEdit?: PetFormData;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({ visible, onClose, petToEdit }) => {
  const { addPet, updatePet } = useApplication();
  const [formData, setFormData] = useState<PetFormData>(petToEdit || {
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: undefined,
    temperament: [],
    description: '',
    imageUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({...formData, imageUrl: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!formData.imageUrl || !formData.name || !formData.species) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      if (petToEdit?.id) {
        await updatePet(petToEdit.id, formData);
      } else {
        await addPet(formData);
      }
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save pet');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTemperament = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      temperament: prev.temperament.includes(trait)
        ? prev.temperament.filter(t => t !== trait)
        : [...prev.temperament, trait]
    }));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {petToEdit ? 'Edit Pet' : 'Add New Pet'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.formContainer}>
            {/* Form fields remain the same */}
            <FormInput
              label="Pet Name"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text })}
              required
            />

            {/* Other form fields... */}

            <View style={styles.imagePicker}>
              {formData.imageUrl ? (
                <Image 
                  source={{ uri: formData.imageUrl }} 
                  style={styles.image} 
                />
              ) : (
                <Ionicons name="image" size={40} color={theme.textLight} />
              )}
              <PrimaryButton 
                title="Select Image" 
                onPress={handleImagePick}
                style={styles.imageButton}
              />
            </View>

            <PrimaryButton
              title={petToEdit ? 'Update Pet' : 'Add Pet'}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
  },
  formContainer: {
    padding: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageButton: {
    width: '60%',
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
  },
  closeButton: {
    padding: 4,
  },
});