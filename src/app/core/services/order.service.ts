import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  createOrder(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/order/create`, formData);
  }

  updateOrder(orderId: number, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/order/update/${orderId}`, formData);
  }

  getOrderList(params: {
    pageNumber?: number,
    pageSize?: number,
    sortDirection?: string,
    orderCode?: string
  }): Observable<any> {
    let query = '';
    for (const key in params) {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.httpClient.get(`${environment.apiUrl}/order/list?${query}`);
  }

  findOrder(itemId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/order/detail/${itemId}`);
  }

  deleteOrder(itemId: number): Observable<any> {
    let result = this.httpClient.delete(`${environment.apiUrl}/order/delete/${itemId}`)
    return result
  }
}
