import { Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent} from './auth/register/register.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent },
  { path: 'file-upload' , component: FileUploadComponent }, // tbd
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'register', component: RegisterComponent }
];
