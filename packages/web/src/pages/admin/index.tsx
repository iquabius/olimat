// TODO: Transform these into import AppFrame from 'components/AppFrame'
// https://daveceddia.com/react-project-structure/
import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import ExamList from '@olimat/web/components/Exam/List';

const PageAdmin: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <ExamList />
    </AppContent>
  </AppFrame>
);

export default PageAdmin;
