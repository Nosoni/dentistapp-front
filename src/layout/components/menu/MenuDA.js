import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from '../../../utils/class-names';

import MenuGroupTitle from './GroupTitle';
import ItemWithSub from './ItemWithSubDA';
import SimpleItem from './SimpleItem';

import './Menu.scss';

const haveActive = (sub, route) =>
  !!sub.find(item => item.routing === route);

const Menu = ({
  data,
  orientation,
  location,
  children,
  className,
  onCloseSidebar,
  opened
}) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu(data);
  }, [data]);

  useEffect(() => {
    const currentRoute = location.pathname.split('/')[2];

    const updatedMenu = data
      ? data.map(item => {
        if (item.sub) {
          return { ...item, active: haveActive(item.sub, currentRoute) };
        }

        return { ...item, active: item.routing === currentRoute };
      })
      : [];

    setMenu(updatedMenu);
  }, [location, data]);

  useEffect(() => {
    onCloseSidebar && opened && onCloseSidebar();
  }, [location]);

  const handleItemClick = (itemTitle) => {
    const updateMenu = [...menu];

    for (let item of updateMenu) {
      if (item.title !== itemTitle) {
        continue;
      }

      item.active = !item.active;
      break;
    }

    setMenu(updateMenu);
  };

  const menuClasses = classNames({
    'main-menu': true,
    horizontal: orientation === 'horizontal'
  });

  const menuItems = menu.map((item, i) => {
    if (item.groupTitle) {
      return <MenuGroupTitle key={i} title={item.title} />;
    }

    if (item.sub) {
      return (
        <ItemWithSub
          key={i}
          layout={orientation}
          sub={item.sub}
          urlBase={item.layout}
          title={item.title}
          location={location}
          opened={item.active}
          onClick={handleItemClick}
        />
      );
    }

    return (
      <SimpleItem
        key={i}
        icon={item.icon}
        layout={orientation}
        title={item.title}
        routing={item.routing}
        urlBase={item.layout}
      />
    );
  });

  return (
    <div className={`${menuClasses} ${!!className && className}`}>
      {children}
      {!!menuItems.length && (
        <nav className='main-menu-wrap'>
          <ul className='menu-ul'>{menuItems}</ul>
        </nav>
      )}
    </div>
  );
};

export default withRouter(Menu);
