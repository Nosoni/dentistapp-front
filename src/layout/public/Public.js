import React from 'react';
import './Public.scss';
import Logo from '../components/logo/Logo';
import LogoSvg from '../../assets/img/dentistapp-logo.svg';
import { Spin } from 'antd';
import { usePromiseTracker } from "react-promise-tracker";

const PublicLayout = ({ children, bgImg, transparent = false }) => {
  const { promiseInProgress } = usePromiseTracker();
  return <div className='public-layout' style={{ backgroundImage: `url(${bgImg})` }}>
    <div className={`content-box ${transparent ? 'transparent' : null}`}>
      <div className='content-header'>
        <Logo src={LogoSvg} />
      </div>
      <div className='content-body'>
        <Spin spinning={promiseInProgress}>
          {children}
        </Spin>
      </div>
    </div>
  </div>
};

export default PublicLayout;
