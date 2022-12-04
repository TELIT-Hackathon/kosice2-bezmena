import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  path: string | any[];
  activeLinkOptions: { exact: boolean } | IsActiveMatchOptions;
  icon: string;
  label: string;
}

export const MENU: MenuItem[] = [
  {
    path: ['/offers'],
    activeLinkOptions: { exact: true },
    icon: 'dashboard',
    label: 'Offers',
  },
  {
    path: ['/search'],
    activeLinkOptions: { exact: true },
    icon: 'search',
    label: 'Find',
  },
  {
    path: ['/create'],
    activeLinkOptions: { exact: true },
    icon: 'edit',
    label: 'Create',
  },
  {
    path: ['/profile'],
    activeLinkOptions: { exact: true },
    icon: 'person',
    label: 'Profile',
  },
];
