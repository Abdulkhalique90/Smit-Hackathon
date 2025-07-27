export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Appointment {
  id: string;
  userId: string;
  name: string;
  phone: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface HelpRequest {
  id: string;
  userId: string;
  name: string;
  phone: string;
  type: 'food' | 'health' | 'education' | 'other';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
} 