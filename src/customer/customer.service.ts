import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './model/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CustomerService {
    protected readonly http = inject(HttpClient);
  
    private baseUrl = 'http://localhost:8080/customer';
  
    getCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(this.baseUrl);
    }
  
    saveCustomer(customer: Customer): Observable<Customer> {
      return this.http.put<Customer>(this.baseUrl, customer);
    }
  
    deleteCustomer(idCustomer : number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${idCustomer}`);
    }  
}
