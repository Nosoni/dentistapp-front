import React from 'react';

import { Card, Checkbox } from 'antd';

import { IPageData } from '../../interfaces/page';
import { setPageData } from '../../redux/page-data/actions';

const pageData: IPageData = {
  title: 'Checkboxes',
};

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

const CheckboxesPage = () => {
  setPageData(pageData);

  return (
    <>
      {' '}
      <Card title='Checkbox group'>
        <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
        <br />
        <br />
        <Checkbox.Group options={options} defaultValue={['Pear']} />
        <br />
        <br />
        <Checkbox.Group options={optionsWithDisabled} disabled defaultValue={['Apple']} />
      </Card>
      <Card title='Disabled checkboxes' className='mb-0'>
        <Checkbox defaultChecked={false} disabled />
        <br />
        <Checkbox defaultChecked disabled />
      </Card>
    </>
  );
};

export default CheckboxesPage;
