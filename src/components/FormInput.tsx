import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap; 
  showCharCounter?: boolean;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  icon,
  showCharCounter = false,
  value = '',
  maxLength,
  required = false, 
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>} 
      </Text>
      
      <View style={styles.inputContainer}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={theme.textLight} 
            style={styles.icon} 
          />
        )}
        <TextInput
          style={[
            styles.input,
            error && styles.errorInput,
            props.multiline && styles.multilineInput,
            !props.editable && styles.disabledInput,
            icon && { paddingLeft: 35 }
          ]}
          placeholderTextColor="#999"
          value={value}
          {...props}
        />
      </View>

      <View style={styles.footer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {showCharCounter && maxLength && (
          <Text style={styles.charCounter}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.text,
    fontWeight: '500',
  },
  required: {
    color: theme.danger,
  },
  inputContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 15,
    zIndex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorInput: {
    borderColor: theme.danger,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: theme.danger,
    fontSize: 14,
    marginTop: 4,
  },
  charCounter: {
    color: theme.textLight,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});