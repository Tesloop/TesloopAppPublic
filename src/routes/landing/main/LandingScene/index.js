'use strict';

import React, { Image, Platform, Text, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import FBSDKLogin, { FBSDKLoginManager } from 'react-native-fbsdklogin';
import LandingStyles from './styles';
import config from 'Tesloop/src/config';

import NativeButton from 'Tesloop/src/components/NativeButton';

import contentRoute from 'Tesloop/src/routes/content';

import loginRoute from '../../login';
import registerRoute from '../../register';

class LandingScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedLoginStatus: false
		}
	};
	componentWillMount() {
		// Check if the User is Logged In
		console.log(`${config.serverURL}auth/status`);
		fetch(`${config.serverURL}auth/status`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(
			(response) => {
				let data = JSON.parse(response._bodyText);
				if (data.loggedIn) {
					// User is Logged In
					this.props.navigator.parentNavigator.push(contentRoute);
				} else {
					if ( Platform.OS === 'ios' ){
						FBSDKLoginManager.logOut();
					}
				}
				this.setState({checkedLoginStatus: true});
			}
		).catch( (error) => console.log(error) ).done();
	};
	render() {
		console.log('LandingScene: Render()');
		let loginButtons = null;
		if (this.state.checkedLoginStatus) {
			loginButtons = (
				<View style={ LandingStyles.footerContainer }>
					<NativeButton
						color='blue'
						onPress={() => {this.props.navigator.push(loginRoute)}}>
						<View style={ LandingStyles.loginButton }>
							<Text style={ LandingStyles.loginText }>Log In</Text>
						</View>
					</NativeButton>
					<NativeButton
						color='blue'
						onPress={() => {this.props.navigator.push(registerRoute)}}>
						<View style={ LandingStyles.registerButton }>
							<Text style={ LandingStyles.registerText }>Register</Text>
						</View>
					</NativeButton>
				</View>
			)
		} else {
			loginButtons = (
				<View style={ LandingStyles.footerContainer }>
					<Spinner
						color={ '#FFFFFF' }
						size={ 60 }
						style={{ marginBottom: 30 }}
						type={ 'Bounce' }
					/>
				</View>
			)
		}
		return (
			<View style={ LandingStyles.container }>
				<View style={ LandingStyles.backgroundContainer }>
					<Image
						source={ require('Tesloop/resources/images/header.jpg') }
						style={ LandingStyles.backgroundImage }
					/>
				</View>
				<View style={ LandingStyles.headerContainer }>
					<Text style={ LandingStyles.headerText }>
						Tesloop
					</Text>
				</View>
				{ loginButtons }
			</View>
		);
	}
}

export default LandingScene;
