'use strict';

import React, { Component, Text, View } from 'react-native';

class StatusBarBackground extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{ top: 0, height: 25, backgroundColor: this.props.color }}></View>
		);
	}
}

//StatusBarBackground.propTypes = { Content: React.PropTypes.element };

export default StatusBarBackground;
