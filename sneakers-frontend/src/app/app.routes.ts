import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle';
import { CarritoComponent } from './components/carrito/carrito';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos';
import { AdminProductosComponent } from './components/admin-productos/admin-productos';
import { AdminPedidosComponent } from './components/admin-pedidos/admin-pedidos';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:slug', component: ProductoDetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'mis-pedidos', component: MisPedidosComponent, canActivate: [authGuard] },
  { path: 'admin/productos', component: AdminProductosComponent, canActivate: [adminGuard] },
  { path: 'admin/pedidos', component: AdminPedidosComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];