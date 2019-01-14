import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import OlympiadList from '../../components/OlympiadList';

const PageOlympiads: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <OlympiadList />
    </AppContent>
  </AppFrame>
);

export default PageOlympiads;
