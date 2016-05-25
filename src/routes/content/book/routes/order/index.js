
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import OrderScene from './OrderScene';

let orderRoute = {
	name: 'order',
	getSceneClass() {
		return OrderScene;
	},
	configureScene() {
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return ExNavigator.SceneConfigs.FloatFromRight;
		} else {
		// Android Platform
			return Navigator.SceneConfigs.FloatFromBottomAndroid;
		}
	},
};

export default orderRoute;
