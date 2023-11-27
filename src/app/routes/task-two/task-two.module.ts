import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTwoRoutingModule } from './task-two-routing.module';
import { TaskTwoComponent } from './task-two.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [TaskTwoComponent],
  imports: [
    CommonModule,
    TaskTwoRoutingModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
})
export class TaskTwoModule {}
