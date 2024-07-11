/* eslint-disable max-len */
import React from 'react';
import type { NavigationCardItem, CustomReactNodeItem } from './types';

const SubMenuItem: React.FC<{ item: NavigationCardItem }> = ({ item }) => (
  <a
    href={item.href}
    className="block p-4 hover:bg-gray-100 transition-colors duration-200 no-underline rounded-lg"
  >
    <div className="flex items-center mb-2 border-b pb-4">
      <img
        src={item.icon}
        alt={`${item.label} icon`}
        className="w-4 h-4 mr-3"
      />
      <h3 className="text-[18px] text-[#1f1f1f] font-sans">{item.label}</h3>
    </div>
    <p className="text-sm text-[#4a4a4a] font-sans">{item.description}</p>
  </a>
);

const SubMenuContainer: React.FC<{ items: (NavigationCardItem | CustomReactNodeItem)[] }> = ({ items }) => (
  <div className="absolute top-full right-0 mt-1 bg-white  p-6 animate-zoom-in origin-top-right shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
    <div className="grid grid-cols-3 gap-4 w-[800px]">
      {items.map((item, index) => {
        if ('type' in item && item.type === 'custom') {
          return <React.Fragment key={item.type + index.toString()}>{item.render()}</React.Fragment>;
        } if ('type' in item && item.type === 'navigation') {
          return <SubMenuItem key={item.label} item={item} />;
        }
        return null;
      })}
    </div>
  </div>
);

export default SubMenuContainer;
