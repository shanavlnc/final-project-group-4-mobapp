import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { Application } from '../types/types';

interface AdoptionFormProps {
  petId: string;
  onSubmit: (data: Omit<Application, 'id' | 'status' | 'dateApplied'>) => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ petId, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data: any) => {
    const applicationData = {
      petId,
      basicInfo: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        birthdate: data.birthdate,
        occupation: data.occupation,
        company: data.company,
        socialMedia: data.socialMedia,
        status: data.status,
      },
      householdInfo: {
        alternateContact: {
          relationship: data.alternateContactRelationship,
          phone: data.alternateContactPhone,
          email: data.alternateContactEmail,
        },
        hasAdoptedBefore: data.hasAdoptedBefore,
        householdMembers: parseInt(data.householdMembers),
        children: data.hasChildren,
        childrenAges: data.childrenAges,
      },
      lifestyle: {
        activityLevel: data.activityLevel,
        hoursAway: parseInt(data.hoursAway),
        sleepingArrangement: data.sleepingArrangement,
      },
      petExperience: {
        hasPets: data.hasPets,
        petsDescription: data.petsDescription,
        vetInfo: data.vetInfo,
      },
      preferences: {
        petType: data.preferredPetType,
        carePlans: data.carePlans,
      },
      agreement: data.agreement,
    };
    
    onSubmit(applicationData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Full Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
        name="name"
        rules={{ required: 'Name is required' }}
        defaultValue=""
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      {/* More form fields for all the required information */}
      {/* Address, Phone, Email, Birthdate, etc. */}

      <Text style={styles.sectionTitle}>Household Information</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text>Have you adopted a pet before?</Text>
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.radioOption}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </RadioButton.Group>
          </View>
        )}
        name="hasAdoptedBefore"
        defaultValue="no"
      />

      {/* More household information fields */}

      <Text style={styles.sectionTitle}>Lifestyle</Text>
      {/* Lifestyle fields */}

      <Text style={styles.sectionTitle}>Pet Experience</Text>
      {/* Pet experience fields */}

      <Text style={styles.sectionTitle}>Preferences</Text>
      {/* Preferences fields */}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            <Text style={styles.checkboxLabel}>
              I agree to the terms and conditions of adoption
            </Text>
          </View>
        )}
        name="agreement"
        rules={{ required: 'You must agree to the terms' }}
        defaultValue={false}
      />
      {errors.agreement && <Text style={styles.errorText}>{errors.agreement.message}</Text>}

      <Button 
        mode="contained" 
        onPress={handleSubmit(submitForm)}
        style={styles.submitButton}
      >
        Submit Application
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
  },
});

export default AdoptionForm;