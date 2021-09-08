import React from 'react';
import { NavLink } from 'react-router-dom';
import posed from 'react-pose';
import { useSelector } from 'react-redux';
import className from '../../../utils/class-names';
import { useHistory } from 'react-router';

const isHorizontal = (layout) => window.innerWidth >= 992 && layout === 'horizontal';

const Sub = posed.div({
  closed: { height: 0, overflow: 'hidden' },
  open: { height: 'auto', overflow: 'auto' },
  transition: { ease: 'ease-in-out', duration: 200 }
});

const ItemWithSub = ({ location, title, layout, sub, opened, onClick, urlBase }) => {
  const permisosUsuario = useSelector((state) => state.usuarioData.usuario?.permisos);
  const history = useHistory()

  const subItemClass = (routing) =>
    className({
      'menu-item': true,
      active: routing === location.pathname.split('/')[2]
    });

  const itemSub = sub.map((item, i) => {
    const tienePermiso = permisosUsuario.find((permiso) => permiso.nombre === item.permiso)
    //if (!!tienePermiso) {
    return (
      <li className={subItemClass(item.routing)} key={i}>
        <NavLink
          to={`/${urlBase}/${item.routing}`}
          className='item-link'
          activeClassName='active'
          replace
          onClick={() => history.push(`/${urlBase}/${item.routing}`)}
        >
          <span className='link-text'>{item.title}</span>
        </NavLink>
      </li>
    )
    //} else {
    // return null
    //}
  });

  const handleOnClick = () => {
    onClick(title);
  };

  return (
    <li className={`menu-item has-sub ${opened ? 'active' : ''}`} onClick={handleOnClick}>
      <span className='item-link'>
        <span className='link-text'>{title}</span>

        <span className='link-caret icofont icofont-thin-right' />
      </span>

      {isHorizontal(layout) ? (
        <ul className='sub' onClick={(e) => e.stopPropagation()}>
          {itemSub}
        </ul>
      ) : (
        <Sub onClick={(e) => e.stopPropagation()} pose={opened ? 'open' : 'closed'}>
          <ul className='sub'>{itemSub}</ul>
        </Sub>
      )}
    </li>
  );
};

export default ItemWithSub;
