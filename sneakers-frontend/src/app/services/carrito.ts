import { Injectable, signal } from '@angular/core';
import { Producto } from './productos';

export interface ItemCarrito {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price: number;
  talla: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: ItemCarrito[] = JSON.parse(localStorage.getItem('carrito') || '[]');
  contador = signal(this.items.reduce((acc, i) => acc + i.cantidad, 0));

  getItems() { return this.items; }

  añadir(producto: Producto, talla: string, cantidad: number) {
    const idx = this.items.findIndex(i => i.id === producto.id && i.talla === talla);
    if (idx >= 0) {
      this.items[idx].cantidad += cantidad;
    } else {
      this.items.push({
        id:        producto.id,
        name:      producto.name,
        slug:      producto.slug,
        image_url: producto.image_url,
        price:     producto.price,
        talla,
        cantidad
      });
    }
    this.guardar();
  }

  eliminar(index: number) {
    this.items.splice(index, 1);
    this.guardar();
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  total() {
    return this.items.reduce((acc, i) => acc + i.price * i.cantidad, 0);
  }

  private guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
    this.contador.set(this.items.reduce((acc, i) => acc + i.cantidad, 0));
  }
}