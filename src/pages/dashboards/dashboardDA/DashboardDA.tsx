import React, { useEffect } from 'react';
import { Card } from 'antd';
import AppointmentsTable from '../../../layout/components/appointmentsTable/AppointmentsTable';
import { IPageData } from '../../../interfaces/page';
import { setPageData } from '../../../redux/page-data/actions';
import { useDispatch } from 'react-redux';

const pageData: IPageData = {
  title: "Dashboard"
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageData(pageData));
  }, [])

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-first-aid-alt'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Appointments</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-wheelchair'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>New patients</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  213
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-blood'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Operations</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  23
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='col-12 col-md-6 col-xl-3'>
          <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
            <div className='row'>
              <div className='col-5'>
                <span
                  className='icofont icofont-dollar-true'
                  style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                />
              </div>

              <div className='col-7'>
                <h6 className='mt-0 mb-1'>Earnings</h6>
                <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                  $5238
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <Card>
            <h4 className='mt-0 mb-1'>$25038</h4>
            <p className='mb-0' style={{ color: '#9d9d9d' }}>
              Income in current month
            </p>

          </Card>
        </div>

        <div className='col-sm-12 col-md-6'>
          <Card>
            <h4 className='mt-0 mb-1'>$2195</h4>
            <p className='mb-0' style={{ color: '#9d9d9d' }}>
              Income in current week
            </p>

          </Card>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <Card title={'patients age'}>
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'patients gender'}>
          </Card>
        </div>

        <div className='col-12 col-md-4'>
          <Card title={'Departments'}>
          </Card>
        </div>
      </div>

      <Card title='Last appointments' className='mb-0'>
        <AppointmentsTable data={[]} />
      </Card>
    </>
  );
};

export default DashboardPage;
