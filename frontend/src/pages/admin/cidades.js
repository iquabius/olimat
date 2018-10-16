import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import CityList from '../../components/CityList';

const PageOlympiads = () => (
  <AppFrame>
    <AppContent>
      <CityList />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageOlympiads);
