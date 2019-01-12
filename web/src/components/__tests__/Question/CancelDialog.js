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

// TODO: Move test case to <QuestionUpdateForm/> suit (unit -> integration)
/*
Instead of mocking onContinue handler, we should mock Router.push.
This would test a lot more stuff, like the integration between all
subcomponents of <QuestionUpdateForm/>. We should strive to mock as
little as possible.

This could even be tested in the pages level, to test the integration
between the form and rest of the page, like the <AppBar/>, <AppDrawer/>,
or <AppFooter/>.

On an end-to-end level of testing, with Cypress for example, this redirect
could tested in a real browser, and even check if the question data was
actually deleted from the database.
*/
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
