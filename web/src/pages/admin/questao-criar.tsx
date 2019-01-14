import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import QuestionCreateForm from '../../components/Question/CreateForm';

const PageQuestionCreate: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionCreateForm />
    </AppContent>
  </AppFrame>
);

export default PageQuestionCreate;
