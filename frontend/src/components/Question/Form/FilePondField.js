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

// FilePond's file object has a property 'origin', but it holds an integer
// value: 1 for input, 2 for limbo, and 3 for local
const getFileOriginName = file => {
  const originsMap = ['input', 'limbo', 'local'];
  return originsMap[file.origin - 1];
};

const QuestionFormFilePondField = ({
  classes,
  imageFile,
  setImageFile,
  formikProps,
  refGetter,
}) => {
  const { imageUrl, imageFullUrl } = formikProps.values;
  const fileOrigin = imageFile ? getFileOriginName(imageFile) : 'local';
  const fileUrl = fileOrigin === 'local' ? imageUrl : imageFullUrl;
  return (
    <FilePond
      name="imageUrl"
      ref={ref => {
        refGetter(ref);
      }}
      server="http://localhost:4000/upload"
      onprocessfile={(error, file) => {
        formikProps.setFieldValue('imageUrl', file.serverId);
      }}
      onupdatefiles={fileItems => {
        if (fileItems.length > 0) {
          const [fileItem] = fileItems;
          setImageFile(fileItem);
        } else {
          formikProps.setFieldValue('imageUrl', '');
        }
      }}
      className={classes.filePond}
    >
      {(imageFile || imageUrl) && <File src={fileUrl} origin={fileOrigin} />}
    </FilePond>
  );
};

QuestionFormFilePondField.propTypes = {
  classes: PropTypes.object.isRequired,
  formikProps: PropTypes.object.isRequired,
  imageFile: PropTypes.object,
  refGetter: PropTypes.func.isRequired,
  setImageFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuestionFormFilePondField);
