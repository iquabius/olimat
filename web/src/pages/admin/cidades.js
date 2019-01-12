import React from 'react';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import CityList from '../../components/City/List';

const PageCities = () => (
  <AppFrame>
    <AppContent>
      <CityList />
    </AppContent>
  </AppFrame>
);

export default PageCities;
