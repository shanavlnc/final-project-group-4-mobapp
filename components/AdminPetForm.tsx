import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { Pet } from '../types/types';

interface AdminPetFormProps {
  pet?: Pet;
  onSubmit: (pet: Omit<Pet, 'id'> | Pet) => void;
}

const AdminPetForm: React.FC<AdminPetFormProps> = ({ pet, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: pet || {
      name: '',
      type: '',
      breed: '',
      age: 0,
      gender: '',
      description: '',
      image: null,
      adopted: false,
    }
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Pet Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
        name="name"
        rules={{ required: 'Name is required' }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      {/* More fields for pet details */}
      {/* Type, Breed, Age, Gender, Description */}

      <Button 
        mode="contained" 
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        {pet ? 'Update Pet' : 'Add Pet'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AdminPetForm;