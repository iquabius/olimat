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
let fileOrigin = 'local';
let fileUrl;

const QuestionFormFilePondField = ({
  classes,
  imageFile,
  setImageFile,
  formikProps,
  refGetter,
}) => {
  const { imageUrl, imageFullUrl } = formikProps.values;
  // Se NÃO for uma imagem que o usuário acabou de selecionar
  if (fileOrigin !== 'input') {
    fileUrl = fileOrigin === 'local' ? imageUrl : imageFullUrl;
  }
  console.log(
    `fileOri: ${fileOrigin} | imageUrl: ${imageUrl} | FullUrl: ${imageFullUrl} | fileUrl: ${fileUrl}`,
  );

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
          fileOrigin = getFileOriginName(fileItem);
          setImageFile(fileItem);
        } else {
          formikProps.setFieldValue('imageUrl', '');
          // setImageFile(null);
        }
      }}
      onremovefile={file => {
        // "fileOrigin" está declarada no escopo do módulo, então seu valor
        // persiste mesmo depois de trocar de página (sem recarregar).
        // Talvez tenha um lugar melhor pra reiniciar "fileOrigin".
        fileOrigin = 'local';
      }}
      className={classes.filePond}
    >
      {(imageFile || (imageUrl && fileOrigin === 'local')) && (
        <File src={fileUrl} origin={fileOrigin} />
      )}
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
