'use strict';

import React, { Text, TouchableHighlight, View } from 'react-native';
import Toolbar from 'Tesloop/src/components/Toolbar';

class CitiesScene extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('CitiesScene: Render()');
		return (
			<View style={{ flex: 1, backgroundColor: 'blue' }}>
				<Toolbar title='Cities' navigator={this.props.navigator} />
			</View>
		);
	}
}

export default CitiesScene;
