
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import TripsScene from './TripsScene';

let tripsRoute = {
	name: 'trips',
	getSceneClass() {
		return TripsScene;
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

export default tripsRoute;
