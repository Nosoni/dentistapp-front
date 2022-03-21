import React from 'react';

import { Card, Rate } from 'antd';
import { BulbOutlined, CheckOutlined, LikeOutlined } from '@ant-design/icons';


import { IPageData } from '../../interfaces/page';
import { setPageData } from '../../redux/page-data/actions';

const pageData: IPageData = {
  title: 'Ratings',
};

const RatingPage = () => {
  setPageData(pageData);

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <Card title='Default'>
          <Rate />
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='With current value'>
          <Rate defaultValue={3} />
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Disabled'>
          <Rate defaultValue={2} disabled />
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Half star'>
          <Rate allowHalf defaultValue={3} />
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Custom items count' className='mb-md-0'>
          <div className='elem-list d-flex flex-column'>
            <Rate count={3} defaultValue={2} />
            <Rate count={6} defaultValue={4} />
            <Rate count={9} defaultValue={6} />
          </div>
        </Card>
      </div>

      <div className='col-md-6 col-sm-12'>
        <Card title='Custom items icons' className='mb-0'>
          <div className='elem-list d-flex flex-column'>
            <Rate character={<LikeOutlined />} defaultValue={3} />
            <Rate character={<CheckOutlined />} count={6} defaultValue={4} />
            <Rate character={<BulbOutlined />} count={9} defaultValue={6} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RatingPage;
