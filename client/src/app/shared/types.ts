export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user_id?: number;
}

export interface AddCustomer {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  country_id?: number | null;
  user_id?: number;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string | null;
  id?: number;
  name?: string | null;
  email?: string | null;
}

export interface RegisterUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}
