/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import CancelDialog from '../../Question/CancelDialog';

test("doesn't render the dialog if it's closed", () => {
  const { container } = render(
    <CancelDialog onCancel={() => {}} onContinue={() => {}} open={false} />,
  );

  expect(container).toMatchSnapshot();
});

test("renders the dialog if it's open", () => {
  const { getByTestId } = render(<CancelDialog onCancel={() => {}} onContinue={() => {}} open />);

  expect(getByTestId('cancel-dialog')).toHaveTextContent('Descartar rascunho da questão?');
});

test('calls onContinue handler when clicking "Descartar"', () => {
  const handleContinue = jest.fn();
  const { getByText } = render(
    <CancelDialog onCancel={() => {}} onContinue={handleContinue} open />,
  );

  fireEvent.click(getByText('Descartar'));

  expect(handleContinue).toHaveBeenCalledTimes(1);
});

test('calls onCancel handler when clicking "Cancelar"', () => {
  const handleCancel = jest.fn();
  const { getByText } = render(<CancelDialog onCancel={handleCancel} onContinue={() => {}} open />);

  fireEvent.click(getByText('Cancelar'));

  expect(handleCancel).toHaveBeenCalledTimes(1);
});
