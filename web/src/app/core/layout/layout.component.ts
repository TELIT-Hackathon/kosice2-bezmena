import { Component, HostListener, OnInit } from '@angular/core';
import { MENU, MenuItem } from './menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public isOpened = true;
  public menuItems: MenuItem[] = MENU;

  constructor() {}

  ngOnInit(): void {
    this.updateSideViewState();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSideViewState();
  }

  updateSideViewState(): void {
    if (window.innerWidth < 1024) {
      this.isOpened = false;
    } else {
      this.isOpened = true;
    }
  }

  isBiggerScreen(): boolean {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 1024) {
      return true;
    } else {
      return false;
    }
  }
}
