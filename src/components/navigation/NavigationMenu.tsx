/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useRef, useCallback } from 'react';
import type { NavigationMenu, MenuItemProps } from './types';
import SubMenuContainer from './SubMenuContainer.tsx';

const ArrowIcon: React.FC = () => (
  <svg
    className="ml-1 w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuItem: React.FC<MenuItemProps> = ({ menu, isActive, onSelect }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 100);
  }, []);

  const handleClick = () => {
    onSelect(menu.title);
  };

  const defaultStyle: React.CSSProperties = {
    backgroundColor: isActive ? 'gray' : '#1a202c',
    color: 'white',
    padding: '0.25rem 1.5rem',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  };

  const combinedStyle = { ...defaultStyle, ...menu.style };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={handleClick}
        style={combinedStyle}
        className="transition-colors duration-200 font-bold uppercase flex items-center"
        aria-expanded={isActive}
        aria-haspopup="true"
      >
        {menu.title}
        <ArrowIcon />
      </div>
      {(isHovered) && (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SubMenuContainer items={menu.items} />
        </div>
      )}
    </div>
  );
};

export interface NavigationMenuComponentProps {
  menus: NavigationMenu[];
  handleSelect?: (label: string) => void;
}

const NavigationMenuComponent: React.FC<NavigationMenuComponentProps> = ({ menus, handleSelect }) => (
  <div className="flex flex-row cursor-pointer">
    {menus.map((menu) => (
      <MenuItem
        key={menu.title}
        menu={menu}
        isActive={menu.isActive || false}
        onSelect={handleSelect as (label: string) => void}
      />
    ))}
  </div>
);
export default NavigationMenuComponent;
