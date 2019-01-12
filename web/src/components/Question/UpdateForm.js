import React from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './Form';
import { formValuesToRequest, responseToFormValues } from './transforms';
import QuestionDetailsConnector from './DetailsConnector';
import Router, { withRouter } from 'next/router';
import compose from 'recompose/compose';
import { withSnackbar } from 'notistack';

export const createSubmitHandler = (question, updateQuestion, enqueueSnackbar) => (
  values,
  addHandlers,
) => {
  console.log('UPDATE VALUES: ');
  console.log(values);
  // This is where `addHandlers` comes in handy as the form controls its state
  addHandlers(
    updateQuestion({
      variables: { input: { id: question.id, patch: formValuesToRequest(values) } },
    })
      .then(resp => {
        console.log('UpdateForm addHandlers OK:');
        console.log(resp);
        enqueueSnackbar('Questão salva com sucesso', {
          variant: 'success',
        });
        Router.push(`/admin/questao?id=${question.id}`);
      })
      .catch(error => {
        // The component is and should not be aware of this being a GraphQL error.
        enqueueSnackbar(`Erro ao salvar questão: "${error.message}"`, {
          variant: 'error',
        });
      }),
  );
};

const QuestionUpdateForm = ({ enqueueSnackbar, router }) => (
  <QuestionDetailsConnector id={router.query.id}>
    {({ isLoading, question, updateQuestion }) => (
      <QuestionForm
        initialValues={responseToFormValues(question)}
        onSubmit={createSubmitHandler(question, updateQuestion, enqueueSnackbar)}
      />
    )}
  </QuestionDetailsConnector>
);

QuestionUpdateForm.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default compose(
  withSnackbar,
  withRouter,
)(QuestionUpdateForm);
