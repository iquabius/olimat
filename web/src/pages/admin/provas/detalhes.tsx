import React from 'react';

import AppContent from '../../../components/AppContent';
import AppFrame from '../../../components/AppFrame';
import TestDetails from '../../../components/Test/Details';

const PageAdminTestDetails: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <TestDetails />
    </AppContent>
  </AppFrame>
);

export default PageAdminTestDetails;
