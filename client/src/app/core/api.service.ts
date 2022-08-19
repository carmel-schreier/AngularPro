import { EditedCustomer, Login, RegisterUser, User } from './../shared/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../shared/types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  deleteCustomer(id: number) {
    const headers = { 'x-auth-token': this.token };
    this.http
      .delete(`${environment.serverUrl}/customers/` + id, { headers })
      .subscribe(() => {
        console.log('deleted');
      });
  }

  getCustomersDetails(user: User): Observable<Array<Customer>> {
    let user_id = user.id;
    return this.http.get<Array<Customer>>(
      `${environment.serverUrl}/customers?user_id=${user_id}`,
      { headers: { 'x-auth-token': this.token } }
    );
  }

  editCustomerDetails(
    customer: EditedCustomer,
    id: number
  ): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.serverUrl}/customers/${id}`,
      customer,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token,
        },
      }
    );
  }

  register(user: RegisterUser): Observable<User> {
    return this.http.post<User>(`${environment.serverUrl}/register`, user, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  login(details: Login): Observable<User> {
    return this.http.post<User>(`${environment.serverUrl}/login`, details, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  getUser(): Observable<User> {
    console.log("I'm in refresh");
    console.log('and' + this.token);
    return this.http.get<User>(`${environment.serverUrl}/refresh`, {
      headers: {
        'x-auth-token': this.token,
      },
    });
  }
}