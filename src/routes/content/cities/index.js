
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import CitiesScene from './CitiesScene';

let citiesRoute = {
	name: 'cities',
	getSceneClass() {
		return CitiesScene;
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

export default citiesRoute;
