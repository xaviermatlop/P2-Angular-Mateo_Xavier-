import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos';
import { CarritoService } from '../../services/carrito';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-detalle.html'
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | null = null;
  tallaSeleccionada = '';
  cantidad = 1;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private carrito: CarritoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // La ruta ahora usa :slug
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.productosService.getProducto(slug).subscribe({
        next: data => this.producto = data,
        error: () => this.router.navigate(['/catalogo'])
      });
    }
  }

  agregarAlCarrito() {
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/login']); return; }
    if (!this.tallaSeleccionada) { this.mensaje = 'Selecciona una talla'; return; }
    if (!this.producto) return;
    this.carrito.añadir(this.producto, this.tallaSeleccionada, this.cantidad);
    this.mensaje = 'Añadido al carrito';
  }
}