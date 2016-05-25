'use strict';

import React, { AppRegistry, Component, View } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';
import landingRoute from './routes/landing';

class Root extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{flex: 1}}>
				<ExNavigator
					initialRoute={ landingRoute }
					showNavigationBar={ false }
				/>
			</View>
		);
	}
}

/*
BackAndroid.addEventListener('hardwareBackPress', function() {
	if (true) {
		return true;
	}
	return false;
});
*/

AppRegistry.registerComponent('Tesloop', () => Root);
