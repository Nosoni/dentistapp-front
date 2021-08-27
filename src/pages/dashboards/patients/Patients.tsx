import React from 'react';

import { usePatients } from '../../../hooks/usePatients';

import PatientsTable from './PatientsTable';

import { IPageData } from '../../../interfaces/page';
import { setPageData } from '../../../redux/page-data/actions';

const pageData: IPageData = {
  title: 'Patients',
};

const PatientsPage = () => {
  const { patients, editPatient, deletePatient } = usePatients();
  setPageData(pageData);

  return (
    <>
      <PatientsTable
        onDeletePatient={deletePatient}
        onEditPatient={editPatient}
        patients={patients}
      />
    </>
  );
};

export default PatientsPage;
