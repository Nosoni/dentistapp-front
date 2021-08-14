import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.scss';

type Props = {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: CSSProperties;
};

const Logo = ({ alt = '', height = 'auto', width = 'auto', src, style = {} }: Props) => {
  return (
    <div className='logo' style={style}>
      <NavLink
      to={`/inicio/dashboard`}>
        <img src={src} alt={alt} width={width} height={height} className='logo-img' />
      </NavLink>
    </div>
  );
};

export default Logo;
