export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

export interface Message {
  id: string;
  content: string;
  messageType: MessageType;
  createdAt: Date;
  updatedAt: Date;
  conversationId: string;
  userId: string;
}
