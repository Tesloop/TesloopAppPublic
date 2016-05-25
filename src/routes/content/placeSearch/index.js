
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import PlaceSearchScene from './PlaceSearchScene';

let placeSearchRoute = {
	name: 'placeSearch',
	getSceneClass() {
		return PlaceSearchScene;
	},
	configureScene() {
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return Navigator.SceneConfigs.FloatFromBottomAndroid;
		} else {
		// Android Platform
			return Navigator.SceneConfigs.FloatFromBottomAndroid;
		}
	},
};

export default placeSearchRoute;
