
import { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import ForgotPasswordScene from './ForgotPasswordScene';

let forgotPasswordRoute = {
	getSceneClass() {
		return ForgotPasswordScene;
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

export default forgotPasswordRoute;
