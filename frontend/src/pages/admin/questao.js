import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionDetails from '../../components/Question/Details';

const PageQuestion = () => (
  <AppFrame>
    <AppContent>
      <QuestionDetails />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageQuestion);
