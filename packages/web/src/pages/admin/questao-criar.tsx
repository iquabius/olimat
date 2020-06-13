import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import QuestionCreateForm from '@olimat/web/components/Question/CreateForm';

const PageQuestionCreate: React.FunctionComponent = () => (
	<AppFrame>
		<AppContent>
			<QuestionCreateForm />
		</AppContent>
	</AppFrame>
);

export default PageQuestionCreate;
