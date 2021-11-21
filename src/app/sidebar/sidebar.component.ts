import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive: boolean = false;

  constructor() {}

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {}
}
