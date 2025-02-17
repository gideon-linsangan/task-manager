import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'tasks'); // ✅ Use Firestore v7+

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    return addDoc(this.tasksCollection, task);
  }

  updateTask(taskId: string, updatedTask: Partial<Task>) {
    const taskRef = doc(this.firestore, 'tasks', taskId);
    return updateDoc(taskRef, updatedTask);
  }

  deleteTask(taskId: string) {
    const taskRef = doc(this.firestore, 'tasks', taskId);
    return deleteDoc(taskRef);
  }
}
