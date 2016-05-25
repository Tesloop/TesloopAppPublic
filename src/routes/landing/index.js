
import React from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import mainRoute from './main';

let landingRoute = {
	name: 'landing',
	renderScene(navigator) {
		return (
			<ExNavigator
				initialRoute={ mainRoute }
				navigator={ navigator }
				showNavigationBar={ false }
			/>
		)
	},
};

export default landingRoute;
