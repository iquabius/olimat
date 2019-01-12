import React from 'react';
import PropTypes from 'prop-types';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';
import FAButton from '../FAButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Router from 'next/router';
import CancelDialog from './CancelDialog';
import { withSnackbar } from 'notistack';

const createHandleSubmit = (createQuestion, enqueueSnackbar) => (values, addHandlers) => {
  console.log('VALUES: ');
  console.log(values);
  // This is where `addHandlers` comes in handy as the form controls its state
  addHandlers(
    createQuestion({
      variables: { input: formValuesToRequest(values) },
    })
      .then(resp => {
        console.log('addHandlers OK!');
        console.log('Response: ');
        console.log(resp);
        enqueueSnackbar('Questão salva com sucesso', {
          variant: 'success',
        });
      })
      .catch(error => {
        // The component is and should not be aware of this being a GraphQL error.
        enqueueSnackbar(`Erro ao salvar questão: "${error.message}"`, {
          variant: 'error',
        });
      }),
  );
};

const questionInitialValues = {
  type: 'OPEN_ENDED',
  wording: '',
  imageUrl: '',
  secondaryWording: '',
  // These empty choices are here so that Formik can render the input fields
  choices: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }],
};

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
    const { enqueueSnackbar } = this.props;
    const { warningDialogOpen } = this.state;
    return (
      <CreateConnector>
        {({ createQuestion }) => (
          <QuestionForm
            initialValues={questionInitialValues}
            onSubmit={createHandleSubmit(createQuestion, enqueueSnackbar)}
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

QuestionCreateForm.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(QuestionCreateForm);
