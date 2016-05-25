
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import SettingsScene from './SettingsScene';

let settingsRoute = {
	name: 'settings',
	getSceneClass() {
		return SettingsScene;
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

export default settingsRoute;
