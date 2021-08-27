import React, { useEffect, useState } from 'react';

import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

import { IPageData } from '../../interfaces/page';

import { worldMapOptions } from './worldMapOptions';
import { setPageData } from '../../redux/page-data/actions';
import axios from 'axios';

const pageData: IPageData = {
};

const mapUrl = './data/world.json';

const WorldMapPage = () => {
  setPageData(pageData);
  const [mapOptions, setMapOptions] = useState(null);

  useEffect(() => {
    getDatasource()
  }, [mapOptions])

  const getDatasource = async () => {
    const respuesta = await axios.get(mapUrl);
    setMapOptions(respuesta)
  }

  function setOptions(geoJson: any) {
    echarts.registerMap('HK', geoJson);
    setMapOptions(worldMapOptions);
  }

  return (
    <div className='full-height-page p-4'>
      {mapOptions ? (
        <ReactEcharts
          option={mapOptions}
          style={{ height: '100%', width: '100%' }}
          className='echarts-for-echarts'
        />
      ) : null}
    </div>
  );
};

export default WorldMapPage;
