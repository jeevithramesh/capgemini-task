import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'task-one',
    loadChildren: () =>
      import('./routes/task-one/task-one.module').then((m) => m.TaskOneModule),
  },
  {
    path: 'task-two',
    loadChildren: () =>
      import('./routes/task-two/task-two.module').then((m) => m.TaskTwoModule),
  },
  {
    path: 'task-three',
    loadChildren: () =>
      import('./routes/task-three/task-three.module').then(
        (m) => m.TaskThreeModule
      ),
  },
  { path: '', redirectTo: '/task-one', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/task-one',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
