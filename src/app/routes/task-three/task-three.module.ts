import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskThreeRoutingModule } from './task-three-routing.module';
import { TaskThreeComponent } from './task-three.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [TaskThreeComponent],
  imports: [
    CommonModule,
    TaskThreeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ProgressBarModule,
    DialogModule,
    InputTextModule,
    DynamicDialogModule,
    CardModule,
    ToastModule,
    SliderModule
  ],
})
export class TaskThreeModule {}
