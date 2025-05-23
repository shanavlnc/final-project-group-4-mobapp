export type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  image: any; // In a real app, this would be a URL
  adopted: boolean;
  availableDate: string;
  careInstructions?: string;
  shelterLocation: string;
  shelterPhone: string;
};

export type Application = {
  id: string;
  petId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  basicInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    birthdate: string;
    occupation: string;
    company: string;
    socialMedia: string;
    status: string;
  };
  householdInfo: {
    alternateContact: {
      relationship: string;
      phone: string;
      email: string;
    };
    hasAdoptedBefore: boolean;
    householdMembers: number;
    children: boolean;
    childrenAges: string;
  };
  lifestyle: {
    activityLevel: string;
    hoursAway: number;
    sleepingArrangement: string;
  };
  petExperience: {
    hasPets: boolean;
    petsDescription: string;
    vetInfo: string;
  };
  preferences: {
    petType: string;
    carePlans: string;
  };
  agreement: boolean;
  dateApplied: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
};

export type ShelterInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  about: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};