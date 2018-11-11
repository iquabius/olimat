import React from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './Form';
import { formValuesToRequest, responseToFormValues } from './transforms';
import QuestionDetailsConnector from './DetailsConnector';

export const createSubmitHandler = (question, updateQuestion) => (values, addHandlers) => {
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
        // this.props.showNotification();
      })
      .catch(error => {
        // The component is and should not be aware of this being a GraphQL error.
        console.log('UpdateForm addHandlers ERROR:');
        console.log(error);
        // this.props.showApiErrorNotification(error);
      }),
  );
};

const QuestionUpdateForm = ({ id }) => (
  <QuestionDetailsConnector id={id}>
    {({ isLoading, question, updateQuestion }) => (
      <QuestionForm
        initialValues={responseToFormValues(question)}
        onSubmit={createSubmitHandler(question, updateQuestion)}
      />
    )}
  </QuestionDetailsConnector>
);

QuestionUpdateForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QuestionUpdateForm;
