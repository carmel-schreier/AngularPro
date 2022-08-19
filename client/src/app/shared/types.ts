export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user_id: number;
}

export interface EditedCustomer {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
}

export interface RegisterUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}
