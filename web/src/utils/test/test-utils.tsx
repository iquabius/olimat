import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { render } from 'react-testing-library';

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
