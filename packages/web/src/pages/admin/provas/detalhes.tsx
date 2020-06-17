import React from 'react';
import { NextPage } from 'next';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import ExamDetails from '@olimat/web/components/Exam/Details';

const PageAdminExamDetails: NextPage = props => {
	console.log('PageAdminExamDetails() -> props: ', Object.keys(props));
	return (
		<AppFrame>
			<AppContent>
				<ExamDetails />
			</AppContent>
		</AppFrame>
	);
};

PageAdminExamDetails.getInitialProps = async pageCtx => {
	console.log(
		'PageAdminExamDetails.getInitialProps() -> pageCtx: ',
		Object.keys(pageCtx),
	);
	return { fakeProp: 'for testing' };
};

export default PageAdminExamDetails;
