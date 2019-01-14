import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { allCitiesQuery } from './List';

const styles = theme => ({
  textField: {
    marginLeft: -theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginBottom: -7,
    marginTop: -7,
  },
  textFieldInput: {
    padding: '10px 10px',
  },
});

export const updateCityMutation = gql`
  mutation updateCityMutation($id: ID!, $name: String!) {
    updateCity(id: $id, name: $name) {
      id
      name
    }
  }
`;

const onSubmitEdit = (updateCity, handleCloseEdit) => (values, { setSubmitting }) => {
  // TODO: Don't call the graphql server if value is unchanged
  updateCity({
    variables: {
      id: values.id,
      name: values.name,
    },
  })
    .then(response => {
      console.log(`Update City Mutation response: `);
      console.log(response);
      setSubmitting(false);
      handleCloseEdit();
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error);
    });
};

const updateCache = (proxy, { data: { updateCity } }) => {
  const data = proxy.readQuery({ query: allCitiesQuery });
  const index = data.cities.map(c => c.id).indexOf(updateCity.id);
  data.cities[index].name = updateCity.name;
  proxy.writeQuery({ query: allCitiesQuery, data });
};

const EditListItem = ({ city, handleCloseEdit, classes }) => {
  return (
    <Mutation mutation={updateCityMutation} update={updateCache}>
      {updateCity => (
        <Formik initialValues={city} onSubmit={onSubmitEdit(updateCity, handleCloseEdit)}>
          {({ handleSubmit, handleChange, handleBlur, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <ListItemText>
                <TextField
                  name="name"
                  id="outlined-bare"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  inputProps={{
                    className: classes.textFieldInput,
                    autoFocus: true,
                  }}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton type="submit" disabled={isSubmitting} aria-label="Salvar cidade">
                  <SaveIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={handleCloseEdit}
                  disabled={isSubmitting}
                  aria-label="Cancelar edição"
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(EditListItem);
