import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://task-tracker-e823.onrender.com/api/tasks'

  getTasks(){
    return this.http.get(this.baseUrl);
  }

  createTask(task: any){
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id:string, data: any){
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteTask(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
