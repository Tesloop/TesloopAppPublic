
import React, { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import PayScene from './PayScene';

let payRoute = {
	name: 'pay',
	getSceneClass() {
		return PayScene;
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

export default payRoute;
