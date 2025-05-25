import { ReactNode } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Core Data Types
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age: string;
  gender: string;
  size?: 'small' | 'medium' | 'large';
  temperament?: string[];
  description: string;
  imageUrl: any; // Can be require(local) or {uri: remote}
  status: 'available' | 'adopted';
  createdAt: Date;
  updatedAt?: Date;
}

export interface Application {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  address: string;
  occupation: string;
  hasExperience: boolean;
  homeType: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: Date;
  reviewedDate?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  UserStack: undefined;
  AdminStack: undefined;
};

export type UserStackParamList = {
  Home: undefined;
  PetDetail: { pet: Pet };
  AdoptionForm: { pet: Pet };
  SavedPets: undefined;
  About: undefined;
};

export type UserTabParamList = {
  Browse: undefined;
  Saved: undefined;
  About: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  PetManagement: undefined;
  AddPet: { pet?: Pet };
  ApplicationReview: undefined;
  Settings: undefined;
};

// Context Types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

export interface ApplicationContextType {
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
}

// Utility Types
export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: T, params?: RootStackParamList[T]) => void;
  goBack: () => void;
};

export type RouteProp<T extends keyof RootStackParamList> = {
  params: RootStackParamList[T];
};