import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../services/pedidos';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-pedidos.html'
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];
  // Estados válidos del backend
  estados = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.pedidosService.getTodosPedidos().subscribe(data => this.pedidos = data);
  }

  cambiarEstado(pedido: any) {
    this.pedidosService.actualizarEstado(pedido.id, pedido.status).subscribe();
  }
}