import gql from 'graphql-tag';

export const defaults = {
  // Cookie value should be read here, both on server and client
  // To avoid flashing 'light' theme when it should be 'dark'
  paletteType: 'light',
};

export const resolvers = {
  Mutation: {
    setPaletteType: (_, { type }, { cache }) => {
      cache.writeData({ data: { paletteType: type } });
      return type;
    },
  },
};

export const paletteTypeQuery = gql`
  query paletteTypeQuery {
    paletteType @client
  }
`;

export const setPaletteTypeMutation = gql`
  mutation setPaletteType($type: String!) {
    setPaletteType(type: $type) @client
  }
`;
