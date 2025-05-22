
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  points: number;
  createdAt: string;
}

export interface Fight {
  event_date: string;
  fighter1_country: string;
  fighter1_name: string;
  fighter1_odds: string;
  fighter1_rank: string;
  fighter2_country: string;
  fighter2_name: string;
  fighter2_odds: string;
  fighter2_rank: string;
  weight_division: string;
  id?: string;
}

export interface Event {
  id: string;
  name: string;
  fights: Fight[];
}

export interface Bet {
  eventId: string;
  fightId: string;
  selectedFighter: 1 | 2;
  userId: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, avatar?: string) => Promise<void>;
  isLoading: boolean;
}
