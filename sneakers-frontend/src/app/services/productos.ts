import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth';

export interface Producto {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  brand: string;
  sizes: string[];
  is_active: boolean;
  categories?: { name: string; slug: string };
}

export interface ProductosResponse {
  data: Producto[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
  }

  getProductos(params: { category?: string; search?: string; page?: number; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.search)   query.set('search', params.search);
    if (params.page)     query.set('page', String(params.page));
    if (params.limit)    query.set('limit', String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.http.get<ProductosResponse>(`${this.api}/products${qs}`);
  }

  getProducto(slug: string) {
    return this.http.get<Producto>(`${this.api}/products/${slug}`);
  }

  crearProducto(formData: FormData) {
    return this.http.post<Producto>(`${this.api}/products`, formData, { headers: this.headers() });
  }

  editarProducto(id: string, formData: FormData) {
    return this.http.put<Producto>(`${this.api}/products/${id}`, formData, { headers: this.headers() });
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${this.api}/products/${id}`, { headers: this.headers() });
  }
}