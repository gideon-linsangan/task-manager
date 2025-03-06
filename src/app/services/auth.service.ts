import { Injectable, inject } from '@angular/core';
import { onAuthStateChanged, 
         signOut,
         User, 
         Auth,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword 
       } from '@angular/fire/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private db = getFirestore();
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }
  
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(this.db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }

  getUser() {
    return this.userSubject.value;
  }
}
