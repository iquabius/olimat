import React from 'react';
import PropTypes from 'prop-types';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';
import { questionInitialValues, createHandleSubmit } from './CreateDialog';
import FAButton from '../FAButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Router from 'next/router';
import CancelDialog from './CancelDialog';

class QuestionCreateForm extends React.Component {
  state = {
    warningDialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ warningDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ warningDialogOpen: false });
  };

  createBackToListHandler = isDirty => () => {
    // If the user entered any input, show a warning dialog to confirm
    // before discarding the draft.
    if (isDirty) {
      this.setState({ warningDialogOpen: true });
      return;
    }
    Router.push('/admin/questoes');
  };

  render() {
    const { warningDialogOpen } = this.state;
    return (
      <CreateConnector>
        {({ createQuestion }) => (
          <QuestionForm
            initialValues={questionInitialValues}
            onSubmit={createHandleSubmit(createQuestion)}
          >
            {({ form, isDirty }) => (
              <React.Fragment>
                <FAButton
                  onClick={this.createBackToListHandler(isDirty)}
                  aria-label="Voltar pra lista de questões"
                >
                  <ArrowBackIcon />
                </FAButton>
                <CancelDialog
                  open={warningDialogOpen}
                  onCancel={this.handleClose}
                  onContinue={() => {
                    Router.push('/admin/questoes');
                  }}
                />
                {form}
              </React.Fragment>
            )}
          </QuestionForm>
        )}
      </CreateConnector>
    );
  }
}

export default QuestionCreateForm;
