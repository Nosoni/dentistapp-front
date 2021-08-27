import React, { useEffect, useState } from 'react';


import Contact from '../../layout/components/doctor/Contact';
import className from '../../utils/class-names';

import { IUser } from '../../interfaces/user';
import { IPageData } from '../../interfaces/page';
import { setPageData } from '../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
  title: 'Contacts',
};

const ContactsPage = () => {
  setPageData(pageData);
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    getDatasource()
  }, [users])

  const getDatasource = async () => {
    const respuesta = await axios.get("data/contacts.json");
    setUsers(respuesta)
  }

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3,
    });

  return (
    <div className='row'>
      {users.map((user, index) => (
        <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
          <Contact className={getClass(index, users.length)} {...user} />
        </div>
      ))}
    </div>
  );
};

export default ContactsPage;
