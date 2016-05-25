
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import MapSearchScene from './MapSearchScene';

let mapSearchRoute = {
	name: 'mapSearch',
	getSceneClass() {
		return MapSearchScene;
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

export default mapSearchRoute;
