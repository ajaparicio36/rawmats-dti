export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
}
