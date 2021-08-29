import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';

import className from '../../../utils/class-names';

import Contact from '../../../layout/components/doctor/Contact';
import PageAction from '../../../layout/components/page-action/PageAction';
import DoctorForm from './DoctorForm';

import { IUser } from '../../../interfaces/user';
import { IPageData } from '../../../interfaces/page';
import { setPageData } from '../../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
  title: 'Doctors',
};

const DoctorsPage = () => {
  setPageData(pageData);
  const [doctors, setDoctors] = useState<any>([])
  const [addingDoctor, setAddingDoctor] = useState(false);

  useEffect(() => {
    getDatasource()
  }, [doctors])

  const getDatasource = async () => {
    const respuesta = await (await axios.get("./data/doctors.json")).data;
    console.log(respuesta)
    setDoctors(respuesta)
  }

  const openModal = () => setAddingDoctor(true);
  const closeModal = () => setAddingDoctor(false);

  const addDoctor = (doctor: IUser) => setDoctors([doctor, ...doctors]);

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });

  return (
    <div className='row'>
      {doctors.map((doctor, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, doctors.length)} {...doctor} />
        </div>
      ))}

      <PageAction onClick={openModal} icon='icofont-contact-add' />

      <Modal
        visible={addingDoctor}
        onCancel={closeModal}
        title={<h3 className='title'>Add doctor</h3>}
        destroyOnClose
        footer={null}
      >
        <DoctorForm onSubmit={addDoctor} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default DoctorsPage;
