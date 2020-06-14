import React from 'react';
import { MockedProvider, MockedProviderProps } from '@apollo/react-testing';
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
