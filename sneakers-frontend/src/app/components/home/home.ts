import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../../services/productos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  destacados: Producto[] = [];
  categorias = ['Running', 'Basketball', 'Lifestyle', 'Training'];

  // URL de Cloudinary para el hero. Cámbiala por la tuya después de subir la imagen.
  // Formato: https://res.cloudinary.com/dvmzvvjpx/image/upload/v.../tu-imagen.jpg
  heroUrl = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80';

  // Placeholder mientras un producto no tenga imagen
  placeholderUrl = 'https://res.cloudinary.com/dvmzvvjpx/image/upload/e_grayscale/e_auto_brightness/bo_1px_solid_rgb:cccccc/sneaker-placeholder';

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    // El API devuelve { data: [...], total, page, limit }
    this.productosService.getProductos({ limit: 4 }).subscribe((res) => {
      this.destacados = res.data;
    });
  }
}