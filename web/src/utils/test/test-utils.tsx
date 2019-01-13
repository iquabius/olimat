import React from 'react';
import { render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

// eslint-disable-next-line import/prefer-default-export
export const renderApollo = (node, options = {}) => {
  const { mocks, addTypename = false, defaultOptions, cache, ...otherOptions } = options;
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    otherOptions,
  );
};
