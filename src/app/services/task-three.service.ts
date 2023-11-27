import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ITask {
  task_name: string;
  progress: number;
  due_date: string;
  id: string;
}
@Injectable({
  providedIn: 'root',
})
export class TaskThreeService {
  private tasks: ITask[] = [
    {
      id: '111',
      task_name: 'E-commerce website',
      progress: 50,
      due_date: '2023-12-01',
    },
    {
      id: '222',
      task_name: 'Android App',
      progress: 30,
      due_date: '2023-12-05',
    },
    {
      id: '333',
      task_name: 'Logo Design',
      progress: 80,
      due_date: '2023-12-10',
    },
  ];

  getTasks(): Observable<ITask[]> {
    return of(this.tasks);
  }

  updateTask(updatedTask: ITask, id: string): Observable<ITask> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
    }
    return of(updatedTask);
  }

  deleteTask(taskId: string): Observable<string> {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return of('Deleted Successfully');
  }
}
