import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthResponse } from '../models/auth-response';
import { StorageService } from '../services/storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null;

  constructor(private http: HttpClient, private storage: StorageService) {}

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    const url = `${environment.authApi}${environment.endpoints.login}`;
    const body = { username: credentials.username, password: credentials.password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(response => {
        this.setToken(response.accessToken);
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            this.storage.set('refreshToken', response.refreshToken);
          }
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const url = `${environment.authApi}${environment.endpoints.refresh}`;
    const refreshToken = typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? this.storage.get('refreshToken')
      : null;


    // Si tu API espera un string plano:
    return this.http.post<AuthResponse>(url, JSON.stringify(refreshToken), {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => this.setToken(response.accessToken))
    );

    // Si tu API espera un objeto:
    // return this.http.post<AuthResponse>(url, { refreshToken }, { headers: { 'Content-Type': 'application/json' } })
  }

  private setToken(token: string) {
    this.accessToken = token;
    this.storage.set('accessToken', token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return this.storage.get('token');
    }
    return null;
  }

}