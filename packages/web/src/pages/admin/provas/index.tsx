import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import ExamList from '@olimat/web/components/Exam/List';

const PageAdminExams: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <ExamList />
    </AppContent>
  </AppFrame>
);

export default PageAdminExams;
