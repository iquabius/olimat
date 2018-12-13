import React from 'react';
import { render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

// eslint-disable-next-line import/prefer-default-export
export const renderApollo = (
  node,
  { mocks, addTypename = false, defaultOptions, cache, ...options } = {},
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    options,
  );
};
