import React from 'react';

export interface NavigationCardItem {
  type: 'navigation';
  label: string;
  href: string;
  icon: string;
  description: string;
}

export interface CustomReactNodeItem {
  type: 'custom';
  render: () => React.ReactNode;
}

export interface NavigationMenu {
  title: string;
  href: string;
  style?: React.CSSProperties;
  items: Array<NavigationCardItem | CustomReactNodeItem>;
  isActive?: boolean;
}

export interface MenuItemProps {
  menu: NavigationMenu;
  isActive: boolean;
  // style?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onSelect: (title: string) => void;
}
