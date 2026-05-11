import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = `https://dev-api.mentholatumarabia.com/`;

  // Reuse the same headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'en',
  });

  constructor(private HttpClient: HttpClient) {}

  contact(formBody: any): Observable<any> {
    return this.HttpClient.post(
      `${this.baseUrl}api/website/contact`,
      formBody,
      { headers: this.headers },
    );
  }
}
