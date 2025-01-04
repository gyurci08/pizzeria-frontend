import {MenuItem} from './menu-item';

export interface MenuItemsState {
  menuItems: MenuItem[] | null;
  isLoading: boolean;
  error: string | null;
}
