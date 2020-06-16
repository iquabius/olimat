import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { MockedProviderProps } from '@apollo/client/utilities/testing/mocking/MockedProvider';
import { render } from 'react-testing-library';

interface RenderApolloOptions {
	addTypename?: boolean;
	cache?: MockedProviderProps['cache'];
	defaultOptions?: MockedProviderProps['defaultOptions'];
	mocks?: MockedProviderProps['mocks'];
}

interface RenderOptions {
	container: HTMLElement;
	baseElement?: HTMLElement;
}

/**
 * This version of MockedProvider is not playing well with FakeDataProvider
 * and MockErrorProvider that uses Stripe's approach to mocking:
 * https://medium.freecodecamp.org/a-new-approach-to-mocking-graphql-data-1ef49de3d491
 *
 * Running the tests in isolation works, but running them together gives the
 * error: "No more mocked responses for the query":
 * https://github.com/apollographql/react-apollo/issues/4018
 *
 * @param node Component to render
 * @param options MockedProvider options
 */
export const renderApollo = (node, options: RenderApolloOptions = {}) => {
	const {
		mocks,
		addTypename = false,
		defaultOptions,
		cache,
		...otherOptions
	} = options;

	return render(
		<MockedProvider
			mocks={mocks}
			addTypename={addTypename}
			defaultOptions={defaultOptions}
			cache={cache}
		>
			{node}
		</MockedProvider>,
		otherOptions as RenderOptions, // I don't know how to type the rest expression above
	);
};
