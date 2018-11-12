import React from 'react';
import PropTypes from 'prop-types';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';
import { questionInitialValues, createHandleSubmit } from './CreateDialog';
import FAButton from '../FAButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Router from 'next/router';

const createBackToListHandler = isDirty => () => {
  console.log('isDirty: ');
  console.log(isDirty);
  if (isDirty) {
    console.log('Your form has changed! You can not go back.');
    return;
  }
  Router.push('/admin/questoes');
};

const QuestionCreateForm = () => (
  <CreateConnector>
    {({ createQuestion }) => (
      <QuestionForm
        initialValues={questionInitialValues}
        onSubmit={createHandleSubmit(createQuestion)}
      >
        {({ form, isDirty }) => (
          <React.Fragment>
            <FAButton
              onClick={createBackToListHandler(isDirty)}
              aria-label="Voltar pra lista de questões"
            >
              <ArrowBackIcon />
            </FAButton>
            {form}
          </React.Fragment>
        )}
      </QuestionForm>
    )}
  </CreateConnector>
);

export default QuestionCreateForm;
