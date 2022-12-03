import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  path: string | any[];
  activeLinkOptions: { exact: boolean } | IsActiveMatchOptions;
  icon: string;
  label: string;
}

export const MENU: MenuItem[] = [
  {
    path: ['/news'],
    activeLinkOptions: { exact: true },
    icon: 'favorite',
    label: 'Board',
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
    label: 'Write',
  },
  {
    path: ['/my-profile'],
    activeLinkOptions: { exact: true },
    icon: 'person',
    label: 'Profile',
  },
];
