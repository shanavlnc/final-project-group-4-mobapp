import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Application } from '../types/types';

type ApplicationsContextType = {
  applications: Application[];
  submitApplication: (application: Omit<Application, 'id' | 'status' | 'dateApplied'>) => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  getApplicationsByPet: (petId: string) => Application[];
  getApprovedApplications: () => Application[];
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const ApplicationsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  const submitApplication = (application: Omit<Application, 'id' | 'status' | 'dateApplied'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      status: 'pending',
      dateApplied: new Date().toISOString(),
    };
    setApplications([...applications, newApplication]);
  };

  const approveApplication = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' } : app
    ));
  };

  const rejectApplication = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
  };

  const getApplicationsByPet = (petId: string) => {
    return applications.filter(app => app.petId === petId);
  };

  const getApprovedApplications = () => {
    return applications.filter(app => app.status === 'approved');
  };

  return (
    <ApplicationsContext.Provider 
      value={{ 
        applications,
        submitApplication,
        approveApplication,
        rejectApplication,
        getApplicationsByPet,
        getApprovedApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};