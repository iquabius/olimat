import React from 'react';

import AppContent from '../../../components/AppContent';
import AppFrame from '../../../components/AppFrame';
import TestList from '../../../components/Test/List';

const PageAdminTests: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <TestList />
    </AppContent>
  </AppFrame>
);

export default PageAdminTests;
