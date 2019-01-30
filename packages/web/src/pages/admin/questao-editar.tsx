import React from 'react';

import AppContent from '../../components/AppContent';
import AppFrame from '../../components/AppFrame';
import QuestionUpdateForm from '../../components/Question/UpdateForm';

const PageQuestionUpdate: React.FunctionComponent = () => (
  <AppFrame>
    <AppContent>
      <QuestionUpdateForm />
    </AppContent>
  </AppFrame>
);

export default PageQuestionUpdate;
