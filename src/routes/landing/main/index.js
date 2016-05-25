
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import LandingScene from './LandingScene';

let mainRoute = {
	getSceneClass() {
		return LandingScene;
	},
};

export default mainRoute;
