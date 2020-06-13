import React from 'react';

import AppContent from '@olimat/web/components/AppContent';
import AppFrame from '@olimat/web/components/AppFrame';
import CityList from '@olimat/web/components/City/List';

const PageCities: React.FunctionComponent = () => (
	<AppFrame>
		<AppContent>
			<CityList />
		</AppContent>
	</AppFrame>
);

export default PageCities;
