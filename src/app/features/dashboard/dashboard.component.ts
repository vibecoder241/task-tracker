import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalTasks = 0;
completed= 0;
pending= 0;

constructor(private taskService: TasksService){}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res: any) => {
      this.totalTasks = res.length;
      this.completed = res.filter((t: any) => t.status === 'completed').length;
      this.pending = this.totalTasks - this.completed;
    })
  }
}
