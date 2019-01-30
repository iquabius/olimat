import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import QuestionList from '../../components/Question/List';

const PageQuestions: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionList />
    </AppContent>
  </AppFrame>
);

export default PageQuestions;
