import React from 'react';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import SchoolTable from '../../components/SchoolTable';

const PageSchools: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <SchoolTable />
    </AppContent>
  </AppFrame>
);

export default PageSchools;
