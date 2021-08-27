import React, { useState } from 'react';

import { IPageData } from '../../interfaces/page';
import { Button, Card, Switch } from 'antd';
import { setPageData } from '../../redux/page-data/actions';

const pageData: IPageData = {
  title: 'Switchers',
};

const SwitchersPage = () => {
  setPageData(pageData);

  const [disabled, setDisabled] = useState(false);
  const toggle = () => setDisabled(!disabled);

  return (
    <>
      <Card title='Basic switchers'>
        <div className='elem-list flex-column'>
          <Switch />
          <div className='field-with-label'>
            <Switch />
            <span className='label'>Switch label</span>
          </div>

          <div className='field-with-label'>
            <Switch defaultChecked />
            <span className='label'>Checked</span>
          </div>

          <div className='field-with-label'>
            <Switch disabled />
            <span className='label'>Disabled</span>
          </div>

          <div className='field-with-label'>
            <Switch defaultChecked disabled />
            <span className='label'>Checked </span>
          </div>
        </div>
      </Card>

      <Card title='Toggle disabled' className='mb-0'>
        <div className='elem-list flex-column'>
          <Switch disabled={disabled} defaultChecked />
          <br />
          <Button type='primary' onClick={toggle}>
            Toggle disabled
          </Button>
        </div>
      </Card>
    </>
  );
};

export default SwitchersPage;
