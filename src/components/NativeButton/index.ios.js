'use strict';

import React, { Component, TouchableHighlight } from 'react-native';

class NativeButton extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableHighlight
				key={ this.props.key }
				onPress={this.props.onPress}
				underlayColor={this.props.color}
			>
				{ this.props.children }
			</TouchableHighlight>
		);
	}
}

//NativeButton.propTypes = { Content: React.PropTypes.element };

export default NativeButton;
