
import React, { Component, Image, TouchableOpacity } from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

class AndroidNavigationDrawerToggle extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableOpacity
				touchRetentionOffset={ExNavigator.Styles.barButtonTouchRetentionOffset}
				onPress={this.props.onPress}
				style={[ExNavigator.Styles.barLeftButton, styles.backButtonAndroid]}>
					<Image source={ require('Tesloop/resources/images/ic_menu_white.png') } />
			</TouchableOpacity>
		)
	}
}
let styles = {
	backButtonAndroid: {
		paddingLeft: 16,
		paddingVertical: 15
	}
}

export default AndroidNavigationDrawerToggle;
