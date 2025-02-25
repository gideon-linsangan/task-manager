import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc, getFirestore } from 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private db = getFirestore();

  constructor(private authService: AuthService) {}

  async addTask(title: string, completed: boolean) {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not logged in');

    return addDoc(collection(this.db, 'tasks'), {
      userId: user.uid,
      title,
      completed,
      createdAt: new Date(),
    });
  }

  async getUserTasks() {
    const user = await this.authService.getCurrentUser();
    if (!user) return [];

    const q = query(collection(this.db, 'tasks'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateTask(taskId: string, updates: Partial<{ title: string; status: boolean }>) {
    return updateDoc(doc(this.db, 'tasks', taskId), updates);
  }

  async deleteTask(taskId: string) {
    return deleteDoc(doc(this.db, 'tasks', taskId));
  }
}
