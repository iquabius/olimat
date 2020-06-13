import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import ExamDetails from '@olimat/web/components/Exam/Details';

const PageAdminExamDetails: React.FunctionComponent = () => (
	<AppFrame>
		<AppContent>
			<ExamDetails />
		</AppContent>
	</AppFrame>
);

export default PageAdminExamDetails;
