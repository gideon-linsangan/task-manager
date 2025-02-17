import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model'; // ✅ Import Task model
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Task List</h2>
    <ul>
      <li *ngFor="let task of tasks$ | async">
        <span [style.textDecoration]="task.completed ? 'line-through' : 'none'">
          {{ task.title }}
        </span>
        <button (click)="toggleComplete(task)">✔</button>
        <button (click)="deleteTask(task.id!)">❌</button>
      </li>
    </ul>
    <input [(ngModel)]="newTaskTitle" placeholder="New Task" />
    <button (click)="addTask()">Add Task</button>
  `
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.getTasks();
  newTaskTitle: string = '';

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = {
      title: this.newTaskTitle, description: '', completed: false,
      status: 'To-Do',
      createdAt: 0
    };
    this.taskService.addTask(newTask);
    this.newTaskTitle = '';
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}
