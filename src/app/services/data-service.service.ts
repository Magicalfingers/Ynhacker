import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getNewsList(pageNo: number): Observable<any> {
    return this.http.get<any>('https://hn.algolia.com/api/v1/search?page=' + pageNo);
  }
}
