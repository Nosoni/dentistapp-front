import React, { useEffect, useState } from 'react';

import PatientsTable from './PatientsTable';

import { IPageData } from '../../../interfaces/page';
import { setPageData } from '../../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
  title: 'Patients',
};

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getDatasource()
  }, [patients])

  const getDatasource = async () => {
    const respuesta = await (await axios.get("./data/doctors.json")).data;
    console.log(respuesta)
    setPatients(respuesta)
  }

  setPageData(pageData);

  return (
    <>
      <PatientsTable
        // onDeletePatient={deletePatient}
        // onEditPatient={editPatient}
        patients={patients}
      />
    </>
  );
};

export default PatientsPage;
