import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string) {
    const data: any = await firstValueFrom(
      this.http.post(`${this.api}/auth/login`, { email, password })
    );
    // El backend devuelve: { access_token, refresh_token, user: { id, email, full_name, role } }
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  async register(nombre: string, email: string, password: string) {
    const data: any = await firstValueFrom(
      this.http.post(`${this.api}/auth/register`, { full_name: nombre, email, password })
    );
    return data;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  getToken(): string {
    return this.getUser()?.access_token || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUser()?.user?.role === 'admin';
  }

  getNombre(): string {
    return this.getUser()?.user?.full_name || this.getUser()?.user?.email || '';
  }
}