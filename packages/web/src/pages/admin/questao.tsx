import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import QuestionDetails from '@olimat/web/components/Question/Details';

const PageQuestion: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionDetails />
    </AppContent>
  </AppFrame>
);

export default PageQuestion;
