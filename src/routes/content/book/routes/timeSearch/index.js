
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import TimeSearchScene from './TimeSearchScene';

let timeSearchRoute = {
	name: 'timeSearch',
	getSceneClass() {
		return TimeSearchScene;
	},
	configureScene() {
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return ExNavigator.SceneConfigs.FloatFromBottom;
		} else {
		// Android Platform
			return Navigator.SceneConfigs.FloatFromBottomAndroid;
		}
	},
};

export default timeSearchRoute;
