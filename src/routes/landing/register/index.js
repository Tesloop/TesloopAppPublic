
import { Navigator, Platform } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import RegisterScene from './RegisterScene';

let registerRoute = {
	getSceneClass() {
		return RegisterScene;
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

export default registerRoute;
