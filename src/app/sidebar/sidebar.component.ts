import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive: boolean = false;
  routes: Array<{ path?: string }>;

  constructor(private router: Router) {
    this.routes = router.config;
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {}
}
