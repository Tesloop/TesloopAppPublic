'use strict';

import React, { Text, TouchableHighlight, View } from 'react-native';
import Toolbar from 'Tesloop/src/components/Toolbar';

class TripsScene extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('TripsScene: Render()');
		return (
			<View style={{ flex: 1, backgroundColor: 'green' }}>
				<Toolbar title='Trips' navigator={this.props.navigator} />
			</View>
		);
	}
}

export default TripsScene;
