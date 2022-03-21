import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/FooterDA';
//import { fetchPatients } from '../../redux/patients/actions';
import className from '../../utils/class-names';
import './BaseLayout.scss';

const BaseLayout = ({ nav, topNav, sideNav, orientation, children }) => {
  const [scrolled, setScrolled] = useState(false);

  const sidebarOpened = useSelector((state) => state.settings.sidebarOpened);
  const settings = useSelector((state) => state.settings);
  const pageData = useSelector((state) => state.pageData);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  const mainContentClasses = className({
    'main-content': true,
    loaded: pageData.loaded,
    fulfilled: pageData.fulFilled
  });

  const mainContentWrapClasses = className({
    'main-content-wrap': true
  });

  const contentOverlay = (
    <div
      className={className({
        'content-overlay': true,
        show: sidebarOpened
      })}
    />
  );

  return (
    <div className={`layout ${orientation}`}>
      <div className={`app-container ${settings.boxed && 'boxed'} ${scrolled && 'scrolled'}`}>
        {nav}

        {topNav}

        {sideNav}

        <main onScroll={handleScroll} className={mainContentClasses}>
          <div className='app-loader'>
            <i className='icofont-spinner-alt-4 rotate' />
          </div>

          <div className={mainContentWrapClasses}>
            {pageData && !!pageData.title && (
              <header className='page-header'>
                <h1 className='page-title'>{pageData.title}</h1>
              </header>
            )}
            {children}
          </div>
        </main>

        <Footer
          breadcrumbs={pageData.breadcrumbs}
          layout={settings.layout}
          boxed={settings.boxed}
          loaded={true}
        />
        {contentOverlay}
      </div>
    </div>
  );
};

export default BaseLayout;
