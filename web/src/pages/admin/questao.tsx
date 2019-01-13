import React from 'react';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionDetails from '../../components/Question/Details';

const PageQuestion: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionDetails />
    </AppContent>
  </AppFrame>
);

export default PageQuestion;
