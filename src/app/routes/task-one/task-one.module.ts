import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskOneComponent } from './task-one.component';
import { TaskOneRoutingModule } from './task-one-routing.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [TaskOneComponent],
  imports: [CommonModule, TaskOneRoutingModule, ButtonModule, CardModule],
})
export class TaskOneModule {}
