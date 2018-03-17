import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import SchoolTable from '../../components/SchoolTable';

const PageSchools = () => (
  <AppFrame>
    <AppContent>
      <SchoolTable />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageSchools);
