import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import classNames from '../../../utils/class-names';
import { IBreadcrumb } from '../../../interfaces/page';
import FooterLoader from './FooterLoader';

import './Footer.scss';

const FooterDA = ({
  boxed,
  loaded = false,
  layout,
  breadcrumbs
}) => {
  let footerClasses = classNames({
    loaded,
    boxed
  });

  return (
    <div className={`footer ${footerClasses}`}>
      <div className='footer-wrap'>
        <div className='row align-items-center' style={{ height: '100%' }}>
          <div className='col-12 col-md-6 d-none d-md-block'>
            <Breadcrumbs layout={layout} breadcrumbs={breadcrumbs} />
          </div>
        </div>
        <FooterLoader />
      </div>
    </div>
  );
};

export default FooterDA;
