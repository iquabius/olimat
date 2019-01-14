import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import QuestionDetails from '../../components/Question/Details';

const PageQuestion: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionDetails />
    </AppContent>
  </AppFrame>
);

export default PageQuestion;
