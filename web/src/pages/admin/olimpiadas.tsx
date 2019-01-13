import React from 'react';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import OlympiadList from '../../components/OlympiadList';

const PageOlympiads: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <OlympiadList />
    </AppContent>
  </AppFrame>
);

export default PageOlympiads;
