import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IUser {
  name: string;
  age: string;
  gender: string;
  hobbies: string[];
  verification: [];
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskTwoService {
  private userList: IUser[] = [];

  getUsers(): Observable<IUser[]> {
    return of(this.userList);
  }
  addTask(task: IUser): Observable<IUser[]> {
    this.userList.push(task);
    return of(this.userList);
  }

  deleteUser(id: string): Observable<string> {
    this.userList = this.userList.filter((user) => user.id !== id);
    return of('Deleted Successfully');
  }
}
