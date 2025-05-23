import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pet } from '../types/types';
import { samplePets } from '../constants/pet';

type PetsContextType = {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, updatedPet: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  adoptPet: (id: string) => void;
};

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export const PetsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(samplePets);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    const newPet = { ...pet, id: Date.now().toString() };
    setPets([...pets, newPet]);
  };

  const updatePet = (id: string, updatedPet: Partial<Pet>) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, ...updatedPet } : pet));
  };

  const deletePet = (id: string) => {
    setPets(pets.filter(pet => pet.id !== id));
  };

  const adoptPet = (id: string) => {
    setPets(pets.map(pet => 
      pet.id === id ? { ...pet, adopted: true } : pet
    ));
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet, deletePet, adoptPet }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetsProvider');
  }
  return context;
};