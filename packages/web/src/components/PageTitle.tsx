import React from 'react';

import { pageToTitle } from '../utils/helpers';

import PageContext from './PageContext';

interface PageTitleProps {
	children(title: string): JSX.Element;
}

// TODO: it really wants to be named useTitle but we're not quite there yet.
const PageTitle: React.FunctionComponent<PageTitleProps> = props => {
	return (
		<PageContext.Consumer>
			{({ activePage }) => {
				if (!activePage) {
					throw new Error('Missing activePage.');
				}

				const title =
					activePage.title !== false ? pageToTitle(activePage) : null;
				return props.children(title);
			}}
		</PageContext.Consumer>
	);
};

export default PageTitle;
