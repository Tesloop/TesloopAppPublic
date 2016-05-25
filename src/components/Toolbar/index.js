'use strict';

import React, { Image, Text, ToolbarAndroid, TouchableNativeFeedback, View } from 'react-native';
import ToolbarStyles from './styles';
import NativeButton from 'Tesloop/src/components/NativeButton';

class Toolbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(`Toolbar ${this.props.title}: Render()`);
		return (
			<View style={ ToolbarStyles.container }>
				<NativeButton
					color='transparent'
					onPress={ () => this.props.navigator.pop() }>
					<View
						style={ ToolbarStyles.leftButton }>
						<Image source={ require('Tesloop/resources/images/ic_arrow_back_black.png') } />
					</View>
				</NativeButton>
				<Text style={ ToolbarStyles.title }>{this.props.title}</Text>
			</View>
		);
	}
}

Toolbar.propTypes = { title: React.PropTypes.string, navigator: React.PropTypes.object.isRequired };

export default Toolbar;
