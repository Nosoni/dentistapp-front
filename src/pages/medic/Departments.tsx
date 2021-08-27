import React, { useEffect, useState } from 'react';
import { IPageData } from '../../interfaces/page';

import Department from '../../layout/components/department/Department';

import { IDepartment } from '../../interfaces/patient';
import { setPageData } from '../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
  title: 'Departments',
};

const Departments = () => {
  setPageData(pageData);

  const [departments, setDepartments] = useState<any>([])

  useEffect(() => {
    getDatasource()
  }, [departments])

  const getDatasource = async () => {
    const respuesta = await axios.get("./data/departments.json");
    setDepartments(respuesta)
  }

  const depClass = (i, length) => {
    if (i === length - 1) {
      return 'mb-0';
    }

    if (i > length - 4) {
      return 'mb-md-0';
    }

    return '';
  };

  return (
    <div className='row'>
      {departments.map((dep, i) => (
        <div className='col-md-4 col-sm-12' key={i}>
          <Department department={dep} className={`white-bg ${depClass(i, departments.length)}`} />
        </div>
      ))}
    </div>
  );
};

export default Departments;
