import React from 'react';
import PropTypes from 'prop-types';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';
import { questionInitialValues, createHandleSubmit } from './CreateDialog';

const QuestionCreateForm = () => (
  <CreateConnector>
    {({ createQuestion }) => (
      <QuestionForm
        initialValues={questionInitialValues}
        onSubmit={createHandleSubmit(createQuestion)}
      />
    )}
  </CreateConnector>
);

export default QuestionCreateForm;
