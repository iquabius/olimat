import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import QuestionUpdateForm from '@olimat/web/components/Question/UpdateForm';

const PageQuestionUpdate: React.FunctionComponent = () => (
	<AppFrame>
		<AppContent>
			<QuestionUpdateForm />
		</AppContent>
	</AppFrame>
);

export default PageQuestionUpdate;
