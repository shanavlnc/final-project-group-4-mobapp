import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, RadioButton, Checkbox, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../navigation/UserStack';
import { useApplications } from '../../context/ApplicationsContext';
import { Ionicons } from '@expo/vector-icons';

type FormData = {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
  occupation: string;
  company: string;
  socialMedia: string;
  status: string;
  alternateContactRelationship: string;
  alternateContactPhone: string;
  alternateContactEmail: string;
  hasAdoptedBefore: boolean;
  householdMembers: string;
  hasChildren: boolean;
  childrenAges: string;
  activityLevel: string;
  hoursAway: string;
  sleepingArrangement: string;
  hasPets: boolean;
  petsDescription: string;
  vetInfo: string;
  preferredPetType: string;
  carePlans: string;
  agreement: boolean;
};

type AdoptionFormScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  'AdoptionForm'
>;

const AdoptionFormScreen = () => {
  const navigation = useNavigation<AdoptionFormScreenNavigationProp>();
  const route = useRoute();
  const { petId } = route.params as { petId: string };
  const { submitApplication } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      hasAdoptedBefore: false,
      hasChildren: false,
      hasPets: false,
      agreement: false,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await submitApplication({
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
          householdMembers: parseInt(data.householdMembers) || 0,
          children: data.hasChildren,
          childrenAges: data.childrenAges,
        },
        lifestyle: {
          activityLevel: data.activityLevel,
          hoursAway: parseInt(data.hoursAway) || 0,
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
      });

      Alert.alert(
        'Application Submitted',
        'Thank you for your application! We will review it and get back to you soon.',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'There was a problem submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={30} color="#FF6B6B" />
        <Text style={styles.title}>Adoption Application</Text>
      </View>

      {renderSectionHeader('Basic Information')}
      <Controller
        control={control}
        rules={{ required: 'Full name is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Full Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            style={styles.input}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      {/* Address */}
      <Controller
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Address"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.address}
            style={styles.input}
          />
        )}
        name="address"
      />
      {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

      {/* Phone */}
      <Controller
        control={control}
        rules={{ 
          required: 'Phone number is required',
          pattern: {
            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            message: 'Invalid phone number'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Phone Number"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.phone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        )}
        name="phone"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      {/* Email */}
      <Controller
        control={control}
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            style={styles.input}
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {renderSectionHeader('Household Information')}
      
      {/* Alternate Contact */}
      <Text style={styles.subSectionHeader}>Alternate Contact</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Relationship"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="alternateContactRelationship"
      />

      {/* Previous Adoption Experience */}
      <Text style={styles.subSectionHeader}>Have you adopted a pet before?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.radioGroup}>
            <RadioButton.Item
              label="Yes"
              value="true"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(true)}
            />
            <RadioButton.Item
              label="No"
              value="false"
              status={!value ? 'checked' : 'unchecked'}
              onPress={() => onChange(false)}
            />
          </View>
        )}
        name="hasAdoptedBefore"
      />

      {renderSectionHeader('Lifestyle')}
      {/* Activity Level */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Describe your activity level"
            mode="outlined"
            onChangeText={onChange}
            value={value}
            style={styles.input}
            multiline
          />
        )}
        name="activityLevel"
      />

      {renderSectionHeader('Pet Experience')}
      {/* Current Pets */}
      <Text style={styles.subSectionHeader}>Do you currently have pets?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.radioGroup}>
            <RadioButton.Item
              label="Yes"
              value="true"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(true)}
            />
            <RadioButton.Item
              label="No"
              value="false"
              status={!value ? 'checked' : 'unchecked'}
              onPress={() => onChange(false)}
            />
          </View>
        )}
        name="hasPets"
      />

      {renderSectionHeader('Preferences')}
      {/* Pet Type Preference */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="What type of pet are you interested in adopting?"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="preferredPetType"
      />

      {/* Agreement */}
      <Controller
        control={control}
        rules={{ required: 'You must agree to the terms' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
              color="#FF6B6B"
            />
            <Text style={styles.checkboxText}>
              I agree to the terms and conditions of adoption
            </Text>
          </View>
        )}
        name="agreement"
      />
      {errors.agreement && <Text style={styles.errorText}>{errors.agreement.message}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.submitButton}
        labelStyle={styles.submitButtonText}
      >
        Submit Application
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FF6B6B',
  },
  subSectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
  },
  submitButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default AdoptionFormScreen;