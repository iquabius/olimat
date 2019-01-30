import React from 'react';

import AppContent from '../../../components/AppContent';
import AppFrame from '../../../components/AppFrame';
import ExamDetails from '../../../components/Exam/Details';

const PageAdminExamDetails: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <ExamDetails />
    </AppContent>
  </AppFrame>
);

export default PageAdminExamDetails;
