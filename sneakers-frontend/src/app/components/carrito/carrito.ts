import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito';
import { PedidosService } from '../../services/pedidos';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrito.html'
})
export class CarritoComponent {
  mostrarFormulario = false;
  direccion = '';
  observaciones = '';
  mensaje = '';

  constructor(
    public carrito: CarritoService,
    private pedidos: PedidosService,
    private auth: AuthService,
    private router: Router
  ) {}

  finalizarPedido() {
    if (!this.direccion) { this.mensaje = 'Escribe una dirección'; return; }

    // Adaptamos los items al formato que espera el backend
    const items = this.carrito.getItems().map(item => ({
      product_id: item.id,
      quantity:   item.cantidad,
      size:       item.talla
    }));

    const pedido = {
      items,
      shipping_address: this.direccion,
      notes: this.observaciones
    };

    this.pedidos.crearPedido(pedido).subscribe({
      next: () => {
        this.carrito.vaciar();
        this.mensaje = 'Pedido realizado correctamente';
        setTimeout(() => this.router.navigate(['/mis-pedidos']), 2000);
      },
      error: (err) => {
        this.mensaje = err.error?.error || 'Error al crear el pedido';
      }
    });
  }
}