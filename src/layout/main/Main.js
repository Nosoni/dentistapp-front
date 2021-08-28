import React, { useEffect, useState } from 'react';
import BaseLayout from '../base/Base';
import Logo from '../components/logo/Logo';
import Menu from '../components/menu/MenuDA';
import Navbar from '../components/navbar/Navbar';
import LogoSvg from './../../assets/img/logo.svg';
import Actions from '../components/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/settings/actions';
import './Main.scss';
import { menues } from '../../constantes/menu';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const menuData = menues;
  const handleCloseMenu = () => dispatch(toggleSidebar());
  const settings = useSelector((state) => state.settings);
  const datosUsuario = useSelector((state) => state.usuarioData);
  console.log(datosUsuario)

  const nav = (
    <Navbar
      orientation={settings.layout}
      color={settings.topbarColor}
      background={settings.topbarBg}
      boxed={settings.boxed}
    >
      <button className='no-style navbar-toggle d-lg-none' onClick={handleCloseMenu}>
        <span />
        <span />
        <span />
      </button>
      <Logo src={LogoSvg} />
      <div style={{
        textAlign: 'center',
        fontStyle: 'oblique',
        color: 'rgba(31, 32, 34, 0.5)',
        fontSize: '15px',
      }}>Usuario activo: <a style={{ fontWeight: 'bold' }}>{datosUsuario?.usuario?.usuario}</a></div>
      <Actions />
    </Navbar>
  );

  const additionalNav = (
    <Navbar
      minHeight={40}
      boxed={settings.boxed}
      color={settings.sidebarColor}
      background={settings.sidebarBg}
      opened={settings.sidebarOpened}
      onClickOutside={handleCloseMenu}
      orientation='horizontal-vertical'
    >
      <div className='navbar-mobile-header'>
        <Logo src={LogoSvg} />
        <button
          onClick={handleCloseMenu}
          className='no-style navbar-close icofont-close-line d-lg-none ml-2'
        />
      </div>
      <Menu
        onCloseSidebar={handleCloseMenu}
        opened={settings.sidebarOpened}
        orientation={settings.layout}
        data={menuData}
      />
    </Navbar>
  );

  return (
    <>
      <BaseLayout orientation={settings.layout} nav={nav} topNav={additionalNav}>
        {children}
      </BaseLayout>
    </>
  );
};

export default MainLayout;
