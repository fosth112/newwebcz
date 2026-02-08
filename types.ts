export type UserRole = 'USER' | 'VIP' | 'AGENT' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  points: number;
  balance: number;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  // New fields
  agentPrice?: number;
  discountPercent?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isVisible: boolean;
  
  isPromo?: boolean;
  promoPrice?: number;
  isGacha?: boolean;
  stock: number;
  type: 'general' | 'code' | 'id_pass';
}

export interface Order {
  id: string;
  userId: string;
  productName: string;
  amount: number;
  timestamp: string;
  status: 'completed' | 'pending';
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
}

export interface Shortcut {
  id: string;
  label: string;
  icon: string; 
  link: string;
  color: string;
}

export interface AppConfig {
  siteName: string;
  primaryColor: string;
  navbarColor: string;
  fontFamily: string;
}

export interface Log {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'AUTH' | 'PURCHASE' | 'SYSTEM' | 'GAME';
}