import React from 'react';
import AppFrame from '../../../components/AppFrame';
import AppContent from '../../../components/AppContent';
import TestList from '../../../components/Test/List';

const PageAdminTests: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <TestList />
    </AppContent>
  </AppFrame>
);

export default PageAdminTests;
