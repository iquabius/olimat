// TODO: Transform these into import AppFrame from 'components/AppFrame'
// https://daveceddia.com/react-project-structure/
import React from 'react';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import TestList from '../../components/TestList';

const PageAdmin = () => (
  <AppFrame>
    <AppContent>
      <TestList />
    </AppContent>
  </AppFrame>
);

export default PageAdmin;
