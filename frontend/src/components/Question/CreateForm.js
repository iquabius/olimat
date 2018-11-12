import React from 'react';
import PropTypes from 'prop-types';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';
import { questionInitialValues, createHandleSubmit } from './CreateDialog';
import NextLink from 'next/link';
import FAButton from '../FAButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const QuestionCreateForm = () => (
  <React.Fragment>
    <NextLink href={`/admin/questoes`}>
      <FAButton aria-label="Voltar pra lista de questões">
        <ArrowBackIcon />
      </FAButton>
    </NextLink>
    <CreateConnector>
      {({ createQuestion }) => (
        <QuestionForm
          initialValues={questionInitialValues}
          onSubmit={createHandleSubmit(createQuestion)}
        />
      )}
    </CreateConnector>
  </React.Fragment>
);

export default QuestionCreateForm;
