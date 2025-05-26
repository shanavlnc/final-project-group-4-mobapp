import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplication } from '../../context/ApplicationContext'; 
import { useAuth } from '../../context/AuthContext'; 
import { theme } from '../../constants/colors';
import { FormInput } from '../../components/FormInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserStackParamList } from '../../types/index';
import { Picker } from '@react-native-picker/picker';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  birthdate: Date;
  hasExperience: boolean;
  homeType: string;
  householdMembers: string;
  hoursAlone: string;
  petExperience: string;
  whyAdopt: string;
  agreement: boolean;
};

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required').min(2),
  email: yup.string().required('Email is required').email(),
  phone: yup.string().required('Phone is required').matches(/^[0-9]{10,15}$/),
  address: yup.string().required('Address is required').min(10),
  occupation: yup.string().required('Occupation is required'),
  birthdate: yup.date()
    .required('Birthdate is required')
    .max(new Date(), 'Must be in the past'),
  hasExperience: yup.boolean().required(),
  homeType: yup.string().required('Home type is required'),
  householdMembers: yup.string().required('Required').min(10),
  hoursAlone: yup.string().required('Required'),
  petExperience: yup.string().required('Required').min(20),
  whyAdopt: yup.string().required('Required').min(20),
  agreement: yup.boolean().oneOf([true], 'Must agree').required(),
});

const homeTypes = ['House', 'Apartment', 'Condo', 'Other'];
const hoursAloneOptions = [
  'Less than 2 hours',
  '2-4 hours', 
  '4-6 hours',
  '6-8 hours',
  '8+ hours'
];

export const AdoptionFormScreen = () => {
  const { user } = useAuth();
  const { submitApplication } = useApplication();
  const route = useRoute<RouteProp<UserStackParamList, 'AdoptionForm'>>();
  const navigation = useNavigation();
  const { pet } = route.params;
  
  const { control, handleSubmit, formState: { errors, isValid }, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email || '',
      hasExperience: false,
      agreement: false,
    },
    mode: 'onBlur',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await submitApplication({
        ...data,
        petId: pet.id,
        petName: pet.name,
        applicantName: data.fullName,
        applicantEmail: data.email,
        applicantPhone: data.phone
      });
      
      Alert.alert(
        'Application Submitted!',
        `Thank you for applying to adopt ${pet.name}! We'll contact you soon.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Adopt {pet.name}</Text>
          <Text style={styles.subtitle}>Please fill out this application</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Full Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Phone Number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                error={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                error={errors.address?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="occupation"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Occupation"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.occupation?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { value } }) => (
              <>
                <Text style={styles.label}>Birthdate</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={value ? styles.dateText : styles.placeholderText}>
                    {value ? value.toLocaleDateString() : 'Select Birthdate'}
                  </Text>
                  <Ionicons name="calendar" size={20} color={theme.text} />
                </TouchableOpacity>
                {errors.birthdate && (
                  <Text style={styles.errorText}>{errors.birthdate.message}</Text>
                )}
              </>
            )}
          />

          {showDatePicker && (
            <DateTimePicker
              value={control._formValues.birthdate || new Date(1990, 0, 1)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setValue('birthdate', date, { shouldValidate: true });
                }
              }}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* Living Situation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Living Situation</Text>
          
          <Controller
            control={control}
            name="homeType"
            render={({ field: { onChange, value } }) => (
              <>
                <Text style={styles.label}>Home Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <Picker.Item label="Select home type..." value="" />
                    {homeTypes.map(type => (
                      <Picker.Item key={type} label={type} value={type} />
                    ))}
                  </Picker>
                </View>
                {errors.homeType && (
                  <Text style={styles.errorText}>{errors.homeType.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="householdMembers"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Household Members"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                error={errors.householdMembers?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="hoursAlone"
            render={({ field: { onChange, value } }) => (
              <>
                <Text style={styles.label}>Hours Pet Would Be Alone</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                  >
                    <Picker.Item label="Select hours..." value="" />
                    {hoursAloneOptions.map(opt => (
                      <Picker.Item key={opt} label={opt} value={opt} />
                    ))}
                  </Picker>
                </View>
                {errors.hoursAlone && (
                  <Text style={styles.errorText}>{errors.hoursAlone.message}</Text>
                )}
              </>
            )}
          />
        </View>

        {/* Pet Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pet Experience</Text>
          
          <Controller
            control={control}
            name="hasExperience"
            render={({ field: { value, onChange } }) => (
              <>
                <Text style={styles.label}>Have you owned pets before?</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    style={[styles.radioOption, value && styles.radioSelected]}
                    onPress={() => onChange(true)}
                  >
                    <Text>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioOption, !value && styles.radioSelected]}
                    onPress={() => onChange(false)}
                  >
                    <Text>No</Text>
                  </TouchableOpacity>
                </View>
                {errors.hasExperience && (
                  <Text style={styles.errorText}>{errors.hasExperience.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="petExperience"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Describe your pet experience"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                error={errors.petExperience?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="whyAdopt"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Why do you want to adopt this pet?"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                error={errors.whyAdopt?.message}
              />
            )}
          />
        </View>

        {/* Agreement Section */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="agreement"
            render={({ field: { value, onChange } }) => (
              <View style={styles.agreementContainer}>
                <TouchableOpacity onPress={() => onChange(!value)}>
                  <Ionicons 
                    name={value ? 'checkbox' : 'square-outline'} 
                    size={24} 
                    color={value ? theme.primary : theme.text} 
                  />
                </TouchableOpacity>
                <Text style={styles.agreementText}>
                  I agree to provide a loving home and proper care
                </Text>
              </View>
            )}
          />
          {errors.agreement && (
            <Text style={styles.errorText}>{errors.agreement.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid || isSubmitting) && styles.disabledButton
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textLight,
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    color: theme.text,
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.cardBackground,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  dateText: {
    color: theme.text,
  },
  placeholderText: {
    color: theme.textLight,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.cardBackground,
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  radioOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: theme.cardBackground,
    borderColor: theme.primary,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  agreementText: {
    marginLeft: 10,
    color: theme.text,
    flex: 1,
  },
  errorText: {
    color: theme.danger,
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: theme.textLight,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});