import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import CityList from '../../components/City/List';

const PageCities: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <CityList />
    </AppContent>
  </AppFrame>
);

export default PageCities;
