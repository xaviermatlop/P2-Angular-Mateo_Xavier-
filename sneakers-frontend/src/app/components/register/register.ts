import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  nombre = ''; email = ''; password = ''; confirmar = ''; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    if (this.password !== this.confirmar) { this.error = 'Las contraseñas no coinciden'; return; }
    try {
      await this.auth.register(this.nombre, this.email, this.password);
      this.router.navigate(['/login']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}