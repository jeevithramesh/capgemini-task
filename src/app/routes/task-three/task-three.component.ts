import { Component, OnInit } from '@angular/core';
import { ITask, TaskThreeService } from '../../services/task-three.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-three',
  templateUrl: './task-three.component.html',
  styleUrls: ['./task-three.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TaskThreeComponent implements OnInit {
  tasks: ITask[] = [];
  displayDialog: boolean = false;
  selectedTask!: ITask;
  taskForm!: FormGroup;

  constructor(
    private t3Service: TaskThreeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      task_name: new FormControl<string>('', Validators.required),
      progress: new FormControl<number>(0, Validators.required),
      due_date: new FormControl<string>('', Validators.required),
    });
    this.loadTasks();
  }

  loadTasks() {
    this.t3Service.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  showEditDialog(task: any) {
    this.selectedTask = { ...task };
    this.displayDialog = true;
    this.taskForm.patchValue(this.selectedTask);
  }

  updateTask() {
    if (!this.taskForm.invalid) {
      const updatedTask = this.taskForm.value;
      this.t3Service
        .updateTask(updatedTask, this.selectedTask.id)
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task updated successfully',
          });
          this.displayDialog = false;
          this.loadTasks();
        });
    }
  }
  closeEditDialog() {
    this.displayDialog = false;
  }

  showDeleteDialog(task: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      accept: () => {
        this.deleteTask(task.id);
      },
    });
  }

  deleteTask(taskId: string) {
    this.t3Service.deleteTask(taskId).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Task deleted successfully',
      });
      this.loadTasks();
    });
  }

  getColorForProgress(progress: number): string {
    if (progress < 30) {
      return 'danger'; // Red
    } else if (progress < 70) {
      return 'warning'; // Orange
    } else if (progress === 100) {
      return 'success'; // Orange
    } else {
      return 'info'; // Green
    }
  }
}
