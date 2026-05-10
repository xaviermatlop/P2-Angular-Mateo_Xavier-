import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './catalogo.html'
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  busqueda = '';
  categoriaFiltro = '';
  // Las categorías del backend tienen slugs en minúsculas
  categorias = [
    { label: 'Todas',      slug: '' },
    { label: 'Running',    slug: 'running' },
    { label: 'Basketball', slug: 'basketball' },
    { label: 'Lifestyle',  slug: 'lifestyle' },
    { label: 'Training',   slug: 'training' },
  ];
  cargando = false;
  total = 0;

  constructor(private productosService: ProductosService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // El query param 'categoria' viene como nombre legible desde Home
      // Lo convertimos a slug minúscula para el API
      const cat = params['categoria'] || '';
      this.categoriaFiltro = cat.toLowerCase();
      this.cargar();
    });
  }

  cargar() {
    this.cargando = true;
    this.productosService.getProductos({
      category: this.categoriaFiltro || undefined,
      search:   this.busqueda || undefined,
      limit:    50
    }).subscribe(res => {
      this.productos = res.data;
      this.total = res.total;
      this.cargando = false;
    });
  }

  filtrar() {
    this.cargar();
  }
}