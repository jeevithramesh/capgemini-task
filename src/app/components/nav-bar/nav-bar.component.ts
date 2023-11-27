import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Task One',
        routerLink: 'task-one',
      },
      {
        label: 'Task Two',
        routerLink: 'task-two',
      },
      {
        label: 'Task Three',
        routerLink: 'task-three',
      },
    ];
  }
}
