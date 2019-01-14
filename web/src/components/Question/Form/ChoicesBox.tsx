import { MenuItem, TextField } from '@material-ui/core';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import QuestionTypeConnector from './TypesConnector';

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
        {formikProps.values.type === 'MULTIPLE_CHOICE' &&
        formikProps.values.choices &&
        formikProps.values.choices.length > 0 ? (
          <FieldArray
            name="choices"
            render={arrayHelpers => (
              <React.Fragment>
                {formikProps.values.choices.map((choice, index) => (
                  <TextField
                    key={index}
                    name={`choices.${index}.text`}
                    margin="dense"
                    label={`Alternativa ${index}`}
                    fullWidth
                    variant="outlined"
                    value={formikProps.values.choices[index].text}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                  />
                ))}
              </React.Fragment>
            )}
          />
        ) : null}
      </React.Fragment>
    )}
  </QuestionTypeConnector>
);

QuestionFormChoicesBox.propTypes = {
  formikProps: PropTypes.object.isRequired,
};

export default QuestionFormChoicesBox;
