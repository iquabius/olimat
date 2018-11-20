import React from 'react';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionUpdateForm from '../../components/Question/UpdateForm';

const PageQuestionUpdate = () => (
  <AppFrame>
    <AppContent>
      <QuestionUpdateForm />
    </AppContent>
  </AppFrame>
);

export default withRoot(PageQuestionUpdate);
