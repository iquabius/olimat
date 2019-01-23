import Router, { withRouter, WithRouterProps } from 'next/router';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import React from 'react';
import compose from 'recompose/compose';

import QuestionDetailsConnector from './DetailsConnector';
import QuestionForm from './Form';
import { formValuesToRequest, responseToFormValues } from './transforms';

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

interface Props extends InjectedNotistackProps, WithRouterProps {}

const QuestionUpdateForm: React.FunctionComponent<Props> = ({ enqueueSnackbar, router }) => (
  <QuestionDetailsConnector id={router.query.id as string}>
    {({ isLoading, question, updateQuestion }) => (
      <QuestionForm
        initialValues={responseToFormValues(question)}
        onSubmit={createSubmitHandler(question, updateQuestion, enqueueSnackbar)}
      />
    )}
  </QuestionDetailsConnector>
);

export default compose(
  withSnackbar,
  withRouter,
)(QuestionUpdateForm);
