// TODO: Transform these into import AppFrame from 'components/AppFrame'
// https://daveceddia.com/react-project-structure/
import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import ExamList from '../../components/Exam/List';

const PageAdmin: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <ExamList />
    </AppContent>
  </AppFrame>
);

export default PageAdmin;
