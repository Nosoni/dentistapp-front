import React, { useEffect, useState } from 'react';

import { IconWrap } from './IconWrap';
import { IPageData } from '../../interfaces/page';
import { setPageData } from '../../redux/page-data/actions';
import axios from 'axios';

const iconsUrl = './data/icons-icofont.json';

const pageData: IPageData = {
  title: 'Icofont Icons',
};

const IcofontIconsPage = () => {
  setPageData(pageData);
  const [icons, setIcons] = useState<any>([])

  useEffect(() => {
    getDatasource()
  }, [])

  const getDatasource = async () => {
    const respuesta = await axios.get(iconsUrl);
    setIcons(respuesta.data)
  }

  return (
    <>
      <div className='elem-list'>
        {icons.map((icon) => (
          <IconWrap style='simple' key={icon}>
            <span key={icon} className={icon} style={{ fontSize: 28 }} />
          </IconWrap>
        ))}
      </div>
    </>
  );
};

export default IcofontIconsPage;
