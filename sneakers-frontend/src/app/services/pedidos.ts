import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` });
  }

  getMisPedidos() {
    return this.http.get<any[]>(`${this.api}/orders/my-orders`, { headers: this.headers() });
  }

  getTodosPedidos() {
    return this.http.get<any[]>(`${this.api}/orders`, { headers: this.headers() });
  }

  crearPedido(pedido: any) {
    return this.http.post(`${this.api}/orders`, pedido, { headers: this.headers() });
  }

  // El backend usa PATCH /:id/status y espera { status }
  actualizarEstado(id: string, status: string) {
    return this.http.patch(`${this.api}/orders/${id}/status`, { status }, { headers: this.headers() });
  }
}