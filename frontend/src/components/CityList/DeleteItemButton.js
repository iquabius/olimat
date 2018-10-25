import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';
import { allCitiesQuery } from '.';
import { Formik } from 'formik';

export const deleteCityMutation = gql`
  mutation deleteCityMutation($id: ID!) {
    deleteCity(id: $id) {
      id
      name
    }
  }
`;

const onSubmitDelete = (deleteCity, city) => () => {
  deleteCity({
    variables: {
      id: city.id,
    },
  })
    .then(response => {
      console.log(`Delete City Mutation response: `);
      console.log(response);
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error);
    });
};

// TODO: While deleting the edit button should also be disabled
const CityDeleteItemButton = ({ city }) => (
  <Mutation
    mutation={deleteCityMutation}
    update={(cache, { data: { deleteCity } }) => {
      const { cities } = cache.readQuery({ query: allCitiesQuery });

      cache.writeQuery({
        query: allCitiesQuery,
        data: { cities: cities.filter(c => c.id !== deleteCity.id) },
      });
    }}
  >
    {deleteCity => (
      <Formik onSubmit={onSubmitDelete(deleteCity, city)}>
        {({ handleSubmit, isSubmitting }) => (
          <IconButton disabled={isSubmitting} onClick={handleSubmit} aria-label="Excluir cidade">
            <DeleteIcon />
          </IconButton>
        )}
      </Formik>
    )}
  </Mutation>
);

CityDeleteItemButton.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default CityDeleteItemButton;
