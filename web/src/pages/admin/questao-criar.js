import React from 'react';
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

export default PageQuestionCreate;
