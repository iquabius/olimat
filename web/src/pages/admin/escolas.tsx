import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import SchoolTable from '../../components/SchoolTable';

const PageSchools: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <SchoolTable />
    </AppContent>
  </AppFrame>
);

export default PageSchools;
