import React from 'react';

import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons/lib';

import BaseErrorPage from './BaseErrorPage';
import { useHistory } from 'react-router';

const NotFound = () => {
  const history = useHistory()

  return (<BaseErrorPage
    subTitle={
      <h6 className='text-md text-center'>¡Lo sentimos! La página a la cuál quiere ingresar no existe.</h6>
    }
    bg={`${window.origin}/content/404-page.jpg`}
    action={
      <Button
        type='primary'
        onClick={() => history.push("/inicio/dashboard")}
        style={{ width: 'auto' }}
        icon={<HomeFilled className='ml-0 mr-2' style={{ fontSize: '1em' }} />}
      >
        Volver al inicio
      </Button>
    }
    title={
      <h1 style={{ fontSize: '6rem' }} className='text-color-300 text-center mb-2'>
        <i className='icofont-radio-active color-error mr-2' style={{ opacity: 0.5 }} />
        404
      </h1>
    }
  />
  )
};

export default NotFound;
