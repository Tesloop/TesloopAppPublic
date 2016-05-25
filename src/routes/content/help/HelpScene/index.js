'use strict';

import React, { Text, TouchableHighlight, View } from 'react-native';
import Toolbar from 'Tesloop/src/components/Toolbar';

class HelpScene extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('HelpScene: Render()');
		return (
			<View style={{ flex: 1, backgroundColor: 'red' }}>
				<Toolbar title='Help' navigator={this.props.navigator} />
			</View>
		);
	}
}

export default HelpScene;
