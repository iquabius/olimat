import React from 'react';

import AppContent from '../../../components/AppContent';
import AppFrame from '../../../components/AppFrame';
import ExamList from '../../../components/Exam/List';

const PageAdminExams: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <ExamList />
    </AppContent>
  </AppFrame>
);

export default PageAdminExams;
