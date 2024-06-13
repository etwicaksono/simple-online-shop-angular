import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }


  createItem(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/item/create`, data);
  }

  updateItem(itemId: number, data: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/item/update/${itemId}`, data);
  }

  getItemList(params: {
    pageNumber?: number,
    pageSize?: number,
    sortDirection?: string,
    itemName?: string,
    itemCode?: string,
    isAvailable?: boolean
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
    return this.httpClient.get(`${environment.apiUrl}/item/list?${query}`);
  }

  findItem(itemId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/item/detail/${itemId}`);
  }

  deleteItem(itemId: number): Observable<any> {
    let result = this.httpClient.delete(`${environment.apiUrl}/item/delete/${itemId}`)
    return result
  }


  getItemForSelect(searchTerm: string = ""): Observable<any> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('pageNumber', 0);
      params = params.set('pageSize', 0);
      params = params.set('sortDirection', "ASC");
      params = params.set('itemName', searchTerm);
    }
    return this.httpClient.get<any[]>(`${environment.apiUrl}/item/list}`, { params });
  }
}
