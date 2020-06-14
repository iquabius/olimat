import Router from 'next/router';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import ActionBox from './ActionBox';

jest.mock('next/router');

// All of these are testing implementation details, maybe we should remove them.
describe('<QuestionFormActionBox />', () => {
	test('renders a cancel button', () => {
		// @ts-ignore
		const { getByTestId } = render(<ActionBox formikProps={{}} />);

		const cancelButton = getByTestId('cancel-button');
		expect(cancelButton).toBeInTheDocument();
	});

	test('renders a save button', () => {
		// @ts-ignore
		const { getByTestId } = render(<ActionBox formikProps={{}} />);

		const saveButton = getByTestId('save-button');
		expect(saveButton).toBeInTheDocument();
		expect(saveButton).toHaveAttribute('type', 'submit');
	});

	test('shows warning dialog if canceling with unsaved data', () => {
		const formikProps = { dirty: true };
		// @ts-ignore
		const { getByText } = render(<ActionBox formikProps={formikProps} />);

		const cancelButton = getByText('Cancelar');
		fireEvent.click(cancelButton);

		const warningMessage = getByText('Descartar rascunho da questão?');
		expect(warningMessage).toBeInTheDocument();
	});

	test('redirects if canceling when form data is unchanged', () => {
		const formikProps = {
			dirty: false,
			values: { id: 'question-id-123' },
		};
		// @ts-ignore
		const { getByText } = render(<ActionBox formikProps={formikProps} />);

		const cancelButton = getByText('Cancelar');
		fireEvent.click(cancelButton);

		const targetUrl = `/admin/questao?id=${formikProps.values.id}`;
		expect(Router.push).toHaveBeenCalledWith(targetUrl);
	});
});
