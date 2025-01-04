import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MenuItem} from '../entity/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = `${environment.apiUrl}/menu-items`;

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}`);
  }


}
