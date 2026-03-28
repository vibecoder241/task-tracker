import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TasksService } from './core/services/tasks.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-tracker';

  constructor(private authService: AuthService, private router: Router){

  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
