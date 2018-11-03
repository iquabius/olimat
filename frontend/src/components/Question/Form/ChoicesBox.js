import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import QuestionTypeConnector from '../TypesConnector';

const QuestionFormChoicesBox = ({ formikProps }) => (
  <QuestionTypeConnector>
    {({ questionTypes }) => (
      <React.Fragment>
        <TextField
          id="question-select-type"
          name="type"
          select
          label="Tipo"
          fullWidth
          variant="outlined"
          // className={classes.textField}
          value={formikProps.values.type}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          SelectProps={{
            MenuProps: {
              // className: classes.menu,
            },
          }}
          // helperText="Selecione o tipo da questão"
          margin="normal"
        >
          {questionTypes.map(type => (
            <MenuItem key={type.name} value={type.name}>
              {type.description}
            </MenuItem>
          ))}
        </TextField>
      </React.Fragment>
    )}
  </QuestionTypeConnector>
);

QuestionFormChoicesBox.propTypes = {
  formikProps: PropTypes.object.isRequired,
};

export default QuestionFormChoicesBox;
