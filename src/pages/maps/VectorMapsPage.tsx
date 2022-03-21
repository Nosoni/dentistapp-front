import React, { useEffect, useState } from 'react';

import { VectorMap } from '@south-paw/react-vector-maps';

import { IPageData } from '../../interfaces/page';
import { setPageData } from '../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
};

const mapUrl = './data/world-vector.json';

const PageVectorMaps = () => {
  setPageData(pageData);

  const [world, setWorld] = useState<any>([])

  useEffect(() => {
    getDatasource()
  }, [world])

  const getDatasource = async () => {
    const respuesta = await axios.get(mapUrl);
    setWorld(respuesta)
  }

  if (!world) return <></>;

  return (
    <>
      <div className='full-height-page p-4'>
        <VectorMap {...world as any} />
      </div>
    </>
  );
};

export default PageVectorMaps;
