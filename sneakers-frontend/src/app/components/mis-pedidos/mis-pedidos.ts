import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-pedidos.html'
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.pedidosService.getMisPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }
}