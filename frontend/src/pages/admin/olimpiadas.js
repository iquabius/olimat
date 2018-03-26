import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import OlympiadList from '../../components/OlympiadList';

const PageOlympiads = () => (
  <AppFrame>
    <AppContent>
      <OlympiadList />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageOlympiads);
