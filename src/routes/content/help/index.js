
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import HelpScene from './HelpScene';

let helpRoute = {
	name: 'help',
	getSceneClass() {
		return HelpScene;
	},
	configureScene() {
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return ExNavigator.SceneConfigs.FloatFromBottom;
		} else {
		// Android Platform
			return Navigator.SceneConfigs.FloatFromBottom;
		}
	}
};

export default helpRoute;
