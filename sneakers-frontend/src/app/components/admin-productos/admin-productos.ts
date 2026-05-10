import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosService, Producto } from '../../services/productos';
import { AuthService } from '../../services/auth';
import { environment } from '../../environments/environment';

interface Categoria {
  id: string;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.html'
})
export class AdminProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  mostrarFormulario = false;
  editando: Producto | null = null;
  imagenFile: File | null = null;

  form = {
    name: '', brand: '', category_id: '', price: 0,
    stock: 0, sizes: '', description: ''
  };

  constructor(
    private productosService: ProductosService,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos() {
    this.productosService.getProductos({ limit: 100 }).subscribe(res => this.productos = res.data);
  }

  cargarCategorias() {
    this.http.get<Categoria[]>(`${environment.apiUrl}/categories`).subscribe(data => {
      this.categorias = data;
    });
  }

  onImagenSeleccionada(event: any) {
    this.imagenFile = event.target.files[0];
  }

  abrirFormulario(producto?: Producto) {
    this.editando = producto || null;
    this.mostrarFormulario = true;
    if (producto) {
      this.form = {
        name:        producto.name,
        brand:       producto.brand,
        category_id: (producto as any).category_id || '',
        price:       producto.price,
        stock:       producto.stock,
        sizes:       producto.sizes?.join(',') || '',
        description: producto.description
      };
    } else {
      this.form = { name: '', brand: '', category_id: '', price: 0, stock: 0, sizes: '', description: '' };
    }
  }

  guardar() {
    const fd = new FormData();
    fd.append('name',        this.form.name);
    fd.append('brand',       this.form.brand);
    fd.append('category_id', this.form.category_id);
    fd.append('price',       String(this.form.price));
    fd.append('stock',       String(this.form.stock));
    fd.append('description', this.form.description);
    // Sizes como JSON array
    fd.append('sizes', JSON.stringify(this.form.sizes.split(',').map(s => s.trim()).filter(Boolean)));
    if (this.imagenFile) fd.append('image', this.imagenFile);

    const peticion = this.editando
      ? this.productosService.editarProducto(this.editando.id, fd)
      : this.productosService.crearProducto(fd);

    peticion.subscribe(() => {
      this.mostrarFormulario = false;
      this.imagenFile = null;
      this.cargarProductos();
    });
  }

  eliminar(id: string) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(() => this.cargarProductos());
    }
  }
}