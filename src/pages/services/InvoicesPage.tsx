import React, { useEffect, useState } from 'react';

import { Card } from 'antd';

import InvoicesTable from './InvoicesTable';


import { IPageData } from '../../interfaces/page';
import axios from 'axios';

const pageData: IPageData = {
  title: 'Invoices',
};

const InfoSection = () => (
  <p className='text-base mb-4' style={{ color: 'rgb(165, 165, 165)' }}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dolorem excepturi facilis magni
    necessitatibus perspiciatis repellendus sunt veniam? A ad architecto aspernatur cupiditate
    dignissimos distinctio earum, eligendi eum iusto laboriosam maxime minima necessitatibus nemo
    nesciunt odio perferendis, quaerat qui quo repellendus sapiente.
  </p>
);

const SummaryCard = () => (
  <Card style={{ background: 'rgb(31, 32, 34)', marginBottom: '40px' }} className='custom-bg'>
    <div className='row text-center'>
      <div className='col-6'>
        <span className='color-white m-0 text-base'>Amount received</span>
        <h5 style={{ lineHeight: 1.4 }} className='text-bold color-green m-0'>
          $35,570
        </h5>
      </div>

      <div className='col-6'>
        <span className='color-white m-0 text-base'>Amount pending</span>
        <h5 style={{ lineHeight: 1.4 }} className='text-bold color-red m-0'>
          $2,540
        </h5>
      </div>
    </div>
  </Card>
);

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<any>([])

  useEffect(() => {
    getDatasource()
  }, [invoices])

  const getDatasource = async () => {
    const respuesta = await (await axios.get("./data/invoicea.json")).data;
    setInvoices(respuesta)
  }

  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <InfoSection />
        </div>

        <div className='col-md-6 col-sm-12'>
          <SummaryCard />
        </div>
      </div>

      <InvoicesTable invoices={invoices} />
    </>
  );
};

export default InvoicesPage;
