import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionList from '../../components/Question/List';

const PageQuestions = () => (
  <AppFrame>
    <AppContent>
      <QuestionList />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageQuestions);
