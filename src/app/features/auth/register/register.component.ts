import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService){}

  register(){
    this.authService.register(this.user).subscribe( {
      next: () => alert("registered Successfully!"),
      error: (err) => alert(err.error.message)
    })
  }
}
