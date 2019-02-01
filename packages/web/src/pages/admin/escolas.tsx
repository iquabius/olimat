import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import SchoolTable from '@olimat/web/components/SchoolTable';

const PageSchools: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <SchoolTable />
    </AppContent>
  </AppFrame>
);

export default PageSchools;
