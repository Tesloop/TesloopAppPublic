'use strict';

import React, { Component, TouchableNativeFeedback } from 'react-native';

import NativeButtonStyles from './styles';

class NativeButton extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableNativeFeedback
				background={ TouchableNativeFeedback.Ripple(this.props.color, false) }
				key={ this.props.key }
				onPress={ this.props.onPress }>
				{ this.props.children }
			</TouchableNativeFeedback>
		);
	}
}

//NativeButton.propTypes = { Content: React.PropTypes.element };

export default NativeButton;
