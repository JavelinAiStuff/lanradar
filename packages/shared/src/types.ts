export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: Date;
  maxPlayers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
}
