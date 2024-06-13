import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
// import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }


  createCustomer(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/customer/create`, formData);
  }

  updateCustomer(customerId: number, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/customer/update/${customerId}`, formData);
  }

  getCustomerList(params: { pageNumber?: number, pageSize?: number, sortDirection?: string, customerName?: string, customerAddress?: string, customerCode?: string, customerPhone?: string, isActive?: boolean }): Observable<any> {
    let query = '';
    for (const key in params) {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.httpClient.get(`${environment.apiUrl}/customer/list?${query}`);
  }

  findCustomer(customerId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/customer/detail/${customerId}`);
  }

  deleteCustomer(customerId: number): Observable<any> {
    let result = this.httpClient.delete(`${environment.apiUrl}/customer/delete/${customerId}`)
    return result
  }

  getCustomerForSelect(searchTerm: string = ""): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', 0)
      .set('pageSize', 10)
      .set('sortDirection', "ASC");
    if (searchTerm) {
      params = params.set('customerName', searchTerm);
    }
    return this.httpClient.get<any[]>(`${environment.apiUrl}/customer/list`, { params });
  }
}
