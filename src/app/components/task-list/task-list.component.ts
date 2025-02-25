import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import {Task} from '../../models/task.model';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [FormsModule]
})
export class TaskListComponent implements OnInit {
  tasks$: any[] = [];
  newTaskTitle$: any;

  taskService = inject(TaskService);

  ngOnInit() {
    this.reloadTasks()
  }
  reloadTasks() {
    this.taskService.getUserTasks().then(tasks => {
      this.tasks$ = tasks;
    });
  }
  addTask() {
    if (!this.newTaskTitle$.trim()) return;
    const newTask: Task = {
      title: this.newTaskTitle$, description: '',
      completed: false,
      status: 'To-Do',
      createdAt: 0
    };
    this.taskService.addTask(newTask.title, newTask.completed);
    this.newTaskTitle$ = '';
    this.reloadTasks();
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id!, { status: !task.completed });
    this.reloadTasks()
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.reloadTasks()
  }
}
