import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private baseUrl = `https://dev-api.mentholatumarabia.com/`;
  private PLATFORM_ID = inject(PLATFORM_ID);
  private lang = signal('en'); // default to 'en'

  constructor(private http: HttpClient) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const savedLang = localStorage.getItem('lang');
      this.lang.set(savedLang ?? 'en'); // set 'en' if null
    }
  }

  setLanguage(newLang: string): void {
    this.lang.set(newLang);
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      localStorage.setItem('lang', newLang);
    }
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': this.lang(),
    });
  }

  getHomeData(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/home`, {
      headers: this.getHeaders(),
    });
  }

  getBrands(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/brands`, {
      headers: this.getHeaders(),
    });
  }

  getSingleBrand(brandId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/brands/${brandId}`, {
      headers: this.getHeaders(),
    });
  }

  shopByBrand(brandId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/shop`, {
      headers: this.getHeaders(),
    });
  }

  getSingleProduct(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/products/${productId}`, {
      headers: this.getHeaders(),
    });
  }

  getBlogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/blogs`, {
      headers: this.getHeaders(),
    });
  }

  getSingleBlog(blogId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/website/blogs/${blogId}`, {
      headers: this.getHeaders(),
    });
  }

  contact(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}api/website/contact`,
      {
        name: 'Abdelrahman',
        email: 'a@email.com',
        type: 'type here',
        reason: 'reason here',
      },
      { headers: this.getHeaders() },
    );
  }
}
