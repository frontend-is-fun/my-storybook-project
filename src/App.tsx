import React, { useState, useEffect } from 'react';

import './index.css';
import NavigationMenuComponent from './components/navigation/NavigationMenu.tsx';

import { navigationMenu, navigationMenu2 } from './components/navigation/mock-data.tsx';

import type { NavigationMenu } from './components/navigation/types.ts';

const App = () => {
  const [menu, setMenu] = useState<NavigationMenu[]>([]);

  const handleSelect = (title: string) => {
    setMenu((prevMenu) => prevMenu.map((prev) => ({
      ...prev,
      isActive: prev.title === title,
    })));
  };

  useEffect(() => {
    setMenu(navigationMenu2);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-96">
      <div>
        <h1 className="text-xl mb-16">hover</h1>
        <NavigationMenuComponent
          menus={navigationMenu}
        />
      </div>
      <div>
        <h1 className="text-xl mb-16">click with state</h1>
        <NavigationMenuComponent
          menus={menu}
          handleSelect={handleSelect}
        />
      </div>

    </div>

  );
};

export default App;
