// Ideia tirada do vídeo abaixo:
// How Level Up Tests Apollo Queries - Level Up Code Blog
// https://youtu.be/OCBWsscJFEQ
// https://gist.github.com/stolinski/7cea67d470b4299828b1293aa8cbde0c
// An example with 'apollo-link-state':
// https://gist.github.com/kristianmandrup/1f7e4a550e6c32b99881aa1b78a4a440
import { graphql } from 'graphql';

import { schema } from './FakeDataProvider';

// Takes a query and args and returns mocked data
const mockGraphql = async (query, args = {}) => {
	try {
		const res = await graphql(schema, query.loc.source.body, null, null, args);
		return res.data;
	} catch (e) {
		console.log(e.message);
		return { errors: e };
	}
};

export default mockGraphql;
