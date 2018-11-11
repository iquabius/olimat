import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionCreateForm from '../../components/Question/CreateForm';

const PageQuestionCreate = () => (
  <AppFrame>
    <AppContent>
      <QuestionCreateForm />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageQuestionCreate);
