import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet, Application } from '../types';
import { placeholderPets } from '../constants/pets';

interface ApplicationState {
  pets: Pet[];
  applications: Application[];
  savedPetIds: string[];
}

interface ApplicationContextType {
  pets: Pet[];
  applications: Application[];
  savedPets: Pet[];
  isLoading: boolean;
  error: string | null;
  // Pet Operations
  addPet: (pet: Omit<Pet, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updatePet: (id: string, updates: Partial<Pet>) => Promise<void>;
  deletePet: (id: string) => Promise<void>;
  // Application Operations
  submitApplication: (application: Omit<Application, 'id' | 'status' | 'applicationDate'>) => Promise<void>;
  updateApplicationStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  // Saved Pets
  toggleSavedPet: (petId: string) => Promise<void>;
  // Data Management
  refreshData: () => Promise<void>;
  clearAllData: () => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType>(null!);

export const ApplicationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<ApplicationState>({
    pets: [],
    applications: [],
    savedPetIds: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data from storage
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [petsData, appsData, savedData] = await Promise.all([
        AsyncStorage.getItem('pets'),
        AsyncStorage.getItem('applications'),
        AsyncStorage.getItem('savedPets')
      ]);

      setState({
        pets: petsData ? JSON.parse(petsData) : placeholderPets,
        applications: appsData ? JSON.parse(appsData) : [],
        savedPetIds: savedData ? JSON.parse(savedData) : []
      });
    } catch (err) {
      setError('Failed to load data');
      console.error('Data load error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get saved pets by resolving IDs
  const savedPets = state.pets.filter(pet => 
    state.savedPetIds.includes(pet.id)
  );

  // Pet Operations
  const addPet = async (pet: Omit<Pet, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newPet: Pet = {
        ...pet,
        id: Date.now().toString(),
        createdAt: new Date(),
        status: 'available'
      };
      
      const updatedPets = [...state.pets, newPet];
      
      await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
      setState(prev => ({ ...prev, pets: updatedPets }));
    } catch (err) {
      setError('Failed to add pet');
      throw err;
    }
  };

  const updatePet = async (id: string, updates: Partial<Pet>) => {
    try {
      const updatedPets = state.pets.map(pet => 
        pet.id === id ? { ...pet, ...updates, updatedAt: new Date() } : pet
      );
      
      await AsyncStorage.setItem('pets', JSON.stringify(updatedPets));
      setState(prev => ({ ...prev, pets: updatedPets }));
    } catch (err) {
      setError('Failed to update pet');
      throw err;
    }
  };

  const deletePet = async (id: string) => {
    try {
      const updatedPets = state.pets.filter(pet => pet.id !== id);
      const updatedSavedIds = state.savedPetIds.filter(petId => petId !== id);
      
      await Promise.all([
        AsyncStorage.setItem('pets', JSON.stringify(updatedPets)),
        AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedIds))
      ]);
      
      setState({
        pets: updatedPets,
        applications: state.applications,
        savedPetIds: updatedSavedIds
      });
    } catch (err) {
      setError('Failed to delete pet');
      throw err;
    }
  };

  // Application Operations
  const submitApplication = async (application: Omit<Application, 'id' | 'status' | 'applicationDate'>) => {
    try {
      const newApplication: Application = {
        ...application,
        id: Date.now().toString(),
        status: 'pending',
        applicationDate: new Date()
      };
      
      const updatedApplications = [...state.applications, newApplication];
      
      await AsyncStorage.setItem('applications', JSON.stringify(updatedApplications));
      setState(prev => ({ ...prev, applications: updatedApplications }));
    } catch (err) {
      setError('Failed to submit application');
      throw err;
    }
  };

  const updateApplicationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const updatedApplications = state.applications.map(app => 
        app.id === id ? { ...app, status, reviewedDate: new Date() } : app
      );
      
      await AsyncStorage.setItem('applications', JSON.stringify(updatedApplications));
      setState(prev => ({ ...prev, applications: updatedApplications }));
    } catch (err) {
      setError('Failed to update application');
      throw err;
    }
  };

  // Saved Pets
  const toggleSavedPet = async (petId: string) => {
    try {
      const isSaved = state.savedPetIds.includes(petId);
      const updatedSavedIds = isSaved
        ? state.savedPetIds.filter(id => id !== petId)
        : [...state.savedPetIds, petId];
      
      await AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedIds));
      setState(prev => ({ ...prev, savedPetIds: updatedSavedIds }));
    } catch (err) {
      setError('Failed to update saved pets');
      throw err;
    }
  };

  // Data Management
  const clearAllData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('pets'),
        AsyncStorage.removeItem('applications'),
        AsyncStorage.removeItem('savedPets')
      ]);
      loadData(); // Reset to initial state
    } catch (err) {
      setError('Failed to clear data');
      throw err;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        pets: state.pets,
        applications: state.applications,
        savedPets,
        isLoading,
        error,
        addPet,
        updatePet,
        deletePet,
        submitApplication,
        updateApplicationStatus,
        toggleSavedPet,
        refreshData: loadData,
        clearAllData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};