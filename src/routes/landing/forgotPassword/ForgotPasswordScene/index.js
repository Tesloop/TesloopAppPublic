'use strict';

import React, { Image, Text, TextInput, ToolbarAndroid, View } from 'react-native';
import RecoverPasswordStyles from './styles';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

class ForgotPasswordScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: "",
			userPassword: ""
		};
	};
	render() {
		console.log('ForgotPasswordScene: Render()');
		return (
			<View style={ RecoverPasswordStyles.container }>
				<Toolbar title='Recover Password' navigator={this.props.navigator} />
				<View style={ RecoverPasswordStyles.contentContainer }>
					<View style={{flexDirection: 'column'}}>
						<TextInput
							keyboardType='email-address'
							style={ RecoverPasswordStyles.input }
							placeholder='name@example.com'
							onChangeText={ (text) => this.setState({userEmail: text}) }
							onSubmitEditing={ () => this.refs.passwordInput.focus() }
						/>
						<TextInput
							style={ RecoverPasswordStyles.input }
							placeholder='password'
							ref='passwordInput'
							autoCorrect={false}
							onChangeText={ (text) => this.setState({userPassword: text}) }
							secureTextEntry={true}
						/>
						<NativeButton
							color='white'
							onPress={ this.login }
						>
							<View style={ RecoverPasswordStyles.loginButton }>
								<Text style={ RecoverPasswordStyles.loginText }>Recover Password</Text>
							</View>
						</NativeButton>
					</View>
				</View>
			</View>
		);
	}
}

export default ForgotPasswordScene;
