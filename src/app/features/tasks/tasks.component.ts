import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  tasks: any[] = [];
  newTask = '';
  loading: boolean = false;
  constructor(private taskService: TasksService){}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.loading = false;
      },
      error: () => {
        this.loading=false;
        alert("Failed to load tasks!");
      }
    });
  }
  addTask(){
    if(!this.newTask) return;

    this.taskService.createTask({title: this.newTask}).subscribe(() => {
      this.newTask = '';
      this.loadTasks();
    })
  }

  deleteTask(id: string){
    this.taskService.deleteTask(id).subscribe(() =>{
      this.loadTasks();
    })
  }

  markComplete(task: any){
    this.taskService.updateTask(task._id, {status: 'completed'}).subscribe(() =>{
      this.loadTasks();
    })
  }
}
