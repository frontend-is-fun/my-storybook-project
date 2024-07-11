/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ReactNode } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import NavigationMenuComponent, { NavigationMenuComponentProps } from './NavigationMenu.tsx';
import { navigationMenu, navigationMenu2 } from './mock-data.tsx';
import { NavigationMenu } from './types.ts';

interface CenteredComponentProps {
  children: ReactNode;
}

const CenteredComponent: React.FC<CenteredComponentProps> = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  }}
  >
    {children}
  </div>
);

export default {
  title: 'Navigation/NavigationMenuComponent',
  component: NavigationMenuComponent,
} as Meta;

const Template: StoryFn <NavigationMenuComponentProps> = (args: any) => {
  const [menu, setMenu] = useState<NavigationMenu[]>([]);

  const handleSelect = (title: string) => {
    setMenu((prevMenu) => prevMenu.map((prev) => ({
      ...prev,
      isActive: prev.title === title,
    })));
  };

  useEffect(() => {
    setMenu(args.menus);
  }, [args.menus]);

  return (
    <CenteredComponent>
      <div>
        <h1 className="text-xl mb-16">hover</h1>
        <NavigationMenuComponent
          menus={navigationMenu}
        />
      </div>
      <div style={{ marginTop: '6rem' }}>
        <h1 className="text-xl mb-16">click with state</h1>
        <NavigationMenuComponent
          menus={menu}
          handleSelect={handleSelect}
        />
      </div>
    </CenteredComponent>
  );
};

export const Default = Template.bind({});
Default.args = {
  menus: navigationMenu2,
};

export const WithActiveMenu = Template.bind({});
WithActiveMenu.args = {
  menus: navigationMenu2.map((item, index) => ({ ...item, isActive: index === 0 })),
};
