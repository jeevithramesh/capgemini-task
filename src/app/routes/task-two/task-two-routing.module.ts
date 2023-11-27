import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTwoComponent } from './task-two.component';

const routes: Routes = [
  {
    path: '',
    component: TaskTwoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskTwoRoutingModule {}
