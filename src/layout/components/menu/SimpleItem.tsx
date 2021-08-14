import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMenuItemIcon } from '../../../interfaces/main-menu';

type Props = {
  title: string;
  routing: string;
  layout: string;
  icon: IMenuItemIcon;
  urlBase: string;
};

const SimpleItem = ({ routing, title, urlBase, icon }: Props) => (
  <li className='menu-item'>
    <NavLink
      className='item-link'
      to={`/${urlBase}/${routing}`}
      activeClassName='active'
      replace
    >
      {icon && (
        <span
          className={`link-icon ${icon.class}`}
          style={{ backgroundColor: icon.bg, color: icon.color }}
        />
      )}
      <span className='link-text'>{title}</span>
    </NavLink>
  </li>
);

export default SimpleItem;
