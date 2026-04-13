import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export interface User {
  _id: string;
  name: string;
  role: 'parent' | 'child';
  points: number;
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  loading: boolean;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Lädt alle Helden aus der Datenbank
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        
        // Initialer Held: Stefan oder der erste verfügbare Nutzer
        if (!currentUser && data.length > 0) {
          const stefan = data.find((u: User) => u.name === 'Stefan') || data[0];
          setCurrentUser(stefan);
        } else if (currentUser) {
          // Punktestand des aktuellen Helden aktualisieren
          const updatedSelf = data.find((u: User) => u._id === currentUser._id);
          if (updatedSelf) setCurrentUser(updatedSelf);
        }
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Helden:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      users, 
      setCurrentUser, 
      loading, 
      refreshUsers: fetchUsers 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser muss innerhalb eines UserProviders verwendet werden');
  }
  return context;
};
