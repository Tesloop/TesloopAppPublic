'use strict';

import React, { Navigator, Platform, } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Routes
import searchRoute from './routes/search';

let bookRoute = {
	name: 'book',
	renderScene(navigator) {
		return (
			<ExNavigator
				initialRoute={ searchRoute }
				navigator={ navigator }
				showNavigationBar={ false }
			/>
		)
	},
	configureScene() {
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return ExNavigator.SceneConfigs.PushFromRight;
		} else {
		// Android Platform
			return Navigator.SceneConfigs.FloatFromBottomAndroid;
		}
	},
};

export default bookRoute;
