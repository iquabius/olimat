import { gql } from '@apollo/client';

export default apolloClient =>
	apolloClient
		.query({
			query: gql`
				query getUser {
					me {
						id
						name
					}
				}
			`,
		})
		.then(({ data }) => {
			return { loggedInUser: data };
		})
		.catch(() => {
			// Fail gracefully
			return { loggedInUser: {} };
		});
