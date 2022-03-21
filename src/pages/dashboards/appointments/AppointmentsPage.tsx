import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

import EditAppointment from './EditAppointment';
import AddAppointment from './AddAppointment';
import AppointmentsTable from '../../../layout/components/appointmentsTable/AppointmentsTable';

import PageAction from '../../../layout/components/page-action/PageAction';

import { IAppointment } from '../../../interfaces/patient';
import { IPageData } from '../../../interfaces/page';
import { setPageData } from '../../../redux/page-data/actions';

const pageData: IPageData = {
  title: 'Appointments',
};

const AppointmentsPage = () => {
  setPageData(pageData);
  const [appointments, setAppointments] = useState<any>(appointmentsJSON)

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addingModalVisibility, setAddingModalVisibility] = useState(false);

  const handleDelete = (appointment: IAppointment) => {
    const newAppointments = appointments.filter((el) => el !== appointment);
    setAppointments(newAppointments);
  };

  const handleEdit = (appointment: IAppointment) => {
    const editedAppointments = appointments.map((el) =>
      el !== selectedAppointment ? el : appointment
    );
    setAppointments(editedAppointments);
    setSelectedAppointment(null);
  };

  const openAddingModal = () => setAddingModalVisibility(true);

  const addAppointment = (appointment: IAppointment) => {
    setAppointments([appointment, ...appointments]);
    setAddingModalVisibility(false);
  };

  const closeAddingModal = () => setAddingModalVisibility(false);

  const openEditModal = (appointment: IAppointment) => setSelectedAppointment(appointment);

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const appointmentsActions = (appointment: IAppointment) => (
    <div className='buttons-list nowrap'>
      <Button onClick={openEditModal.bind({}, appointment)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDelete.bind({}, appointment)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  return (
    <>
      <AppointmentsTable data={appointments} actions={appointmentsActions} />

      <PageAction onClick={openAddingModal} icon='icofont-stethoscope-alt' type={'primary'} />

      <AddAppointment
        onClose={closeAddingModal}
        visible={addingModalVisibility}
        onSubmit={addAppointment}
      />

      <EditAppointment
        appointment={selectedAppointment}
        visible={!!selectedAppointment}
        onClose={closeModal}
        onEdited={handleEdit}
      />
    </>
  );
};

export default AppointmentsPage;


const appointmentsJSON = [
  {
    "img": "/content/user-40-1.jpg",
    "name": "Liam",
    "email": "liam@gmail.com",
    "number": "0126596578",
    "date": "18 Dec 2018",
    "fromTo": "10:15 - 10:30",
    "doctor": "Dr. Sophie",
    "injury": "allergy"
  },
  {
    "img": "/content/user-40-2.jpg",
    "name": "Emma",
    "email": "emma@gmail.com",
    "number": "0126596452",
    "date": "5 Dec 2018",
    "fromTo": "9:00 - 9:30",
    "doctor": "Dr. Liam",
    "injury": "arthritis"
  },
  {
    "img": "/content/user-40-3.jpg",
    "name": "Olivia",
    "email": "olivia@gmail.com",
    "number": "0126598853",
    "date": "13 Oct 2018",
    "fromTo": "12:00 - 12:45",
    "doctor": "Dr. Noah",
    "injury": "depression"
  },
  {
    "img": "/content/user-40-4.jpg",
    "name": "Ava",
    "email": "ava@gmail.com",
    "number": "0126590443",
    "date": "26 Dec 2018",
    "fromTo": "14:15 - 14:30",
    "doctor": "Dr. Emma",
    "injury": "diarrhoea"
  },
  {
    "img": "/content/user-40-5.jpg",
    "name": "Noah",
    "email": "noah@gmail.com",
    "number": "0126598525",
    "date": "15 Jun 2018",
    "fromTo": "17:30 - 18:00",
    "doctor": "Dr. James",
    "injury": "dyslexia"
  },
  {
    "img": "/content/user-40-6.jpg",
    "name": "Isabella",
    "email": "isabella@gmail.com",
    "number": "0126599411",
    "date": "2 Jul 2018",
    "fromTo": "10:00 - 10:15",
    "doctor": "Dr. Noah",
    "injury": "flu"
  },
  {
    "img": "/content/user-40-7.jpg",
    "name": "Sophia",
    "email": "sophia@gmail.com",
    "number": "0126596284",
    "date": "9 Oct 2018",
    "fromTo": "8:30 - 8:45",
    "doctor": "Dr. Olivia",
    "injury": "fracture"
  },
  {
    "img": "/content/user-40-8.jpg",
    "name": "Mia",
    "email": "mia000@gmail.com",
    "number": "0126595200",
    "date": "17 Mar 2018",
    "fromTo": "11:30 - 11:40",
    "doctor": "Dr. Emma",
    "injury": "hypothermia"
  },
  {
    "img": "/content/user-40-9.jpg",
    "name": "William",
    "email": "william@gmail.com",
    "number": "0126590043",
    "date": "18 Apl 2018",
    "fromTo": "12:15 - 12:45",
    "doctor": "Dr. Olivia",
    "injury": "sunburn"
  },
  {
    "img": "/content/user-40-10.jpg",
    "name": "James",
    "email": "james@gmail.com",
    "number": "0126591123",
    "date": "6 Apl 2018",
    "fromTo": "16:00 - 16:20",
    "doctor": "Dr. Logan",
    "injury": "mumps"
  },
  {
    "img": "/content/user-40-1.jpg",
    "name": "Logan",
    "email": "logan@gmail.com",
    "number": "0126590045",
    "date": "23 Apl 2018",
    "fromTo": "17:00 -17:35",
    "doctor": "Dr. Benjamin",
    "injury": "tonsillitis"
  },
  {
    "img": "/content/user-40-2.jpg",
    "name": "Charlotte",
    "email": "charlotte@gmail.com",
    "number": "0126592295",
    "date": "4 Mar 2018",
    "fromTo": "15:00 - 15:15",
    "doctor": "Dr. James",
    "injury": "sprain"
  },
  {
    "img": "/content/user-40-3.jpg",
    "name": "Amelia",
    "email": "amelia@gmail.com",
    "number": "0126597743",
    "date": "10 Mar 2018",
    "fromTo": "17:20 - 17:40",
    "doctor": "Dr. Olivia",
    "injury": "sore throat"
  },
  {
    "img": "/content/user-40-4.jpg",
    "name": "Evelyn",
    "email": "evelyn@gmail.com",
    "number": "0126591324",
    "date": "5 Apl 2018",
    "fromTo": "12:00 - 13:00",
    "doctor": "Dr. Logan",
    "injury": "rheumatism"
  },
  {
    "img": "/content/user-40-5.jpg",
    "name": "Mason",
    "email": "mason@gmail.com",
    "number": "0126594352",
    "date": "17 Mar 2018",
    "fromTo": "12:20 - 12:40",
    "doctor": "Dr. Mason",
    "injury": "rash"
  },
  {
    "img": "/content/user-40-6.jpg",
    "name": "Emily",
    "email": "emily@gmail.com",
    "number": "0126593344",
    "date": "4 Feb 2018",
    "fromTo": "13:45 - 14:00",
    "doctor": "Dr. Mason",
    "injury": "nausea"
  },
  {
    "img": "/content/user-40-7.jpg",
    "name": "Elizabeth",
    "email": "eli003@gmail.com",
    "number": "0126595743",
    "date": "10 Feb 2018",
    "fromTo": "9:15 - 9:45",
    "doctor": "Dr. Benjamin",
    "injury": "mumps"
  }
]
