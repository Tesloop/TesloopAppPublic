
import React, { Navigator } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

// Scenes
import SearchScene from './SearchScene';

let searchRoute = {
	name: 'search',
	getSceneClass() {
		return SearchScene;
	}
};

export default searchRoute;
