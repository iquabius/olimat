import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FilePond, File, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const styles = theme => ({
  filePond: {
    marginTop: theme.spacing.unit * 2,
  },
});

const QuestionFormFilePondField = ({ classes, formikProps }) => (
  <FilePond
    name="imageUrl"
    server="http://localhost:4000/upload"
    onprocessfile={(error, file) => {
      formikProps.setFieldValue('imageUrl', file.serverId);
    }}
    className={classes.filePond}
  >
    <File src={formikProps.values.imageUrl} origin="local" />
  </FilePond>
);

QuestionFormFilePondField.propTypes = {
  classes: PropTypes.object.isRequired,
  formikProps: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionFormFilePondField);
