'use strict';

import React, { AppRegistry, BackAndroid, Component, DrawerLayoutAndroid, Image, Navigator, Platform, View, Text } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import NavigationDrawer from 'Tesloop/src/components/NavigationDrawer';

// Routes
import citiesRoute from './cities';
import helpRoute from './help';
import mapSearchRoute from './mapSearch';
import settingsRoute from './settings';
import tripsRoute from './trips';
// Login Page Route
import landingRoute from 'Tesloop/src/routes/landing';

import Router from './router.js';


class ContentBody extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		return (
			<ExNavigator
				{...this.props}
				initialRoute={ mapSearchRoute }
				ref={(...args) => {
					let navigator = args[0];
					Router.registerRoute('cities', citiesRoute, navigator);
					Router.registerRoute('help', helpRoute, navigator);
					Router.registerRoute('mapSearch', mapSearchRoute, navigator);
					Router.registerRoute('settings', settingsRoute, navigator);
					Router.registerRoute('trips', tripsRoute, navigator);
					return;
				}}
			/>
		);
	}
}

class ContentRoot extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		return <NavigationDrawer {...this.props} style={{backgroundColor: 'black'}} MainView={ContentBody} showNavigationBar={false} />
	}
}

let contentRoute = {
	name: 'landing',
	renderScene(navigator) {
		return (
			<ContentRoot navigator={navigator} />
		)
	},
	configureScene() {
		//console.log(Object.keys(ExNavigator.SceneConfigs));
		//console.log(Object.keys(Navigator.SceneConfigs));
		// IOS Platform
		if ( Platform.OS === 'ios' ){
			return {
				...ExNavigator.SceneConfigs.FloatFromBottom,
				gestures: null,
			};
		} else {
		// Android Platform
			return {
				...Navigator.SceneConfigs.FloatFromBottom,
				gestures: null,
			};
		}
	},
};

/*
BackAndroid.addEventListener('hardwareBackPress', function() {
	if (true) {
		return true;
	}
	return false;
});
*/

export default contentRoute;
