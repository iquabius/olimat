import { Button, createStyles, Theme, withStyles } from '@material-ui/core';
import Router from 'next/router';
import React from 'react';
import { compose, withState } from 'recompose';

import { WithStyles } from '@material-ui/styles';
import { FormikProps } from 'formik';
import CancelDialog from '../CancelDialog';
import { QuestionFormValues } from '.';

const styles = (theme: Theme) =>
	createStyles({
		actionBox: {
			display: 'flex',
			flex: '0 0 auto',
			flexWrap: 'wrap',
			justifyContent: 'flex-end',
			marginTop: theme.spacing(),
		},
		saveButton: {
			width: '33%',
		},
		cancelButton: {
			width: '25%',
			marginRight: theme.spacing(),
		},
		[theme.breakpoints.down('xs')]: {
			saveButton: {
				width: '100%',
			},
			cancelButton: {
				marginRight: 0,
				marginTop: theme.spacing(),
				width: '100%',
				order: 1,
			},
		},
	});

const createCancelEditingHandler = (formikProps, showWarning) => () => {
	if (formikProps.dirty) {
		showWarning(true);
		return;
	}
	Router.push(`/admin/questao?id=${formikProps.values.id}`);
};

interface InnerProps extends WithStyles<typeof styles> {
	warningDialogOpen: boolean;
	setWarningDialogOpen: (isOpen: boolean) => void;
}

interface OuterProps {
	formikProps: FormikProps<QuestionFormValues>;
}

const QuestionFormActionBox: React.FC<InnerProps & OuterProps> = ({
	classes,
	formikProps,
	setWarningDialogOpen,
	warningDialogOpen,
}) => (
	<div className={classes.actionBox}>
		<Button
			disabled={formikProps.isSubmitting}
			onClick={createCancelEditingHandler(formikProps, setWarningDialogOpen)}
			className={classes.cancelButton}
			size="large"
			variant="outlined"
			data-testid="cancel-button"
		>
			Cancelar
		</Button>
		<CancelDialog
			onCancel={() => setWarningDialogOpen(false)}
			onContinue={() => {
				Router.push(`/admin/questao?id=${formikProps.values.id}`);
			}}
			open={warningDialogOpen}
		/>
		<Button
			disabled={formikProps.isSubmitting}
			type="submit"
			className={classes.saveButton}
			color="secondary"
			size="large"
			variant="contained"
			data-testid="save-button"
		>
			Salvar
		</Button>
	</div>
);

export default compose<InnerProps, OuterProps>(
	withState('warningDialogOpen', 'setWarningDialogOpen', false),
	withStyles(styles),
)(QuestionFormActionBox);
