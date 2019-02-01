import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import OlympiadList from '@olimat/web/components/OlympiadList';

const PageOlympiads: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <OlympiadList />
    </AppContent>
  </AppFrame>
);

export default PageOlympiads;
