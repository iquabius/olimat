import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import QuestionList from '@olimat/web/components/Question/List';

const PageQuestions: React.FunctionComponent = () => (
	<AppFrame>
		<AppContent>
			<QuestionList />
		</AppContent>
	</AppFrame>
);

export default PageQuestions;
