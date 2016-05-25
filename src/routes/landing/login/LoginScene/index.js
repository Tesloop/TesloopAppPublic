'use strict';

import CookieManager from 'react-native-cookies';
import React, { Image, Platform, Text, TextInput, View } from 'react-native';
import { FBSDKAccessToken, FBSDKGraphRequest } from 'react-native-fbsdkcore';
import FBSDKLogin, { FBSDKLoginButton, FBSDKLoginManager } from 'react-native-fbsdklogin';
import LoginStyles from './styles';
import config from 'Tesloop/src/config';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import forgotPasswordRoute from 'Tesloop/src/routes/landing/forgotPassword';
import contentRoute from 'Tesloop/src/routes/content';

class LoginScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: "",
			userPassword: ""
		};
	};
	login = () => {
		let email    = this.state.userEmail;
		let password = this.state.userPassword;
		fetch(`${config.serverURL}auth/local`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			})
		}).then(
			(response) => {
				if (response.status !== 200) {
					// Errored Out
					console.log(response);
				} else {
					// Good to Go
					CookieManager.get('${config.serverURL}auth/status', () => { return null });
					this.props.navigator.parentNavigator.push(contentRoute);
				}
			}
		).catch( (error) => console.log(error) ).done();
	};
	logInWithFacebook = () => {
		FBSDKAccessToken.getCurrentAccessToken((token) => {
			let accessToken = token.tokenString;
			fetch(`${config.serverURL}auth/facebook/login`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					accessToken: token.tokenString
				})
			}).then(
				(response) => {
					if (response.status !== 200) {
						// Errored Out
						console.log(response);
					} else {
						// Good to Go
						CookieManager.get('${config.serverURL}auth/status', () => { return null });
						this.props.navigator.parentNavigator.push(contentRoute);
					}
					return
				}
			).catch( (error) => console.log(error) ).done();
		});
	};
	render() {
		console.log('LoginScene: Render()');
		let facebookLoginButton = null;
		if ( Platform.OS === 'ios' ) {
			facebookLoginButton = (
				<View>
					<View style={ LoginStyles.facebokLoginButtonContainer }>
						<FBSDKLoginButton
							onLoginFinished={(error, result) => {
								if (error) {
									alert('Error logging in.');
									console.log(error);
								} else {
									if (result.isCancelled) {
										console.log('Log in cancelled.');
									} else {
										this.logInWithFacebook();
									}
								}
							}}
							onLogoutFinished={() => alert('Logged out.')}
							readPermissions={['email', 'user_birthday']}
							publishPermissions={[]}
						/>
					</View>
					<View style={ LoginStyles.orDivider }>
						<Text style={ LoginStyles.orText }> OR </Text>
					</View>
				</View>
			)
		}
		return (
			<View style={ LoginStyles.container }>
				<Toolbar title='Login' navigator={this.props.navigator} />
				<View style={ LoginStyles.contentContainer }>
					<View style={{flexDirection: 'column'}}>
						{ facebookLoginButton }
						<TextInput
							keyboardType='email-address'
							style={ LoginStyles.input }
							placeholder='name@example.com'
							onChangeText={ (text) => this.setState({userEmail: text}) }
							onSubmitEditing={ () => this.refs.passwordInput.focus() }
						/>
						<TextInput
							style={ LoginStyles.input }
							placeholder='password'
							ref='passwordInput'
							autoCorrect={false}
							onChangeText={ (text) => this.setState({userPassword: text}) }
							onSubmitEditing={ this.login }
							secureTextEntry={ true }
							returnKeyType='go'
						/>
						<NativeButton
							color='white'
							onPress={ this.login }
						>
							<View style={ LoginStyles.loginButton }>
								<Text style={ LoginStyles.loginText }>Log In</Text>
							</View>
						</NativeButton>
						<Text
							onPress={ () => this.props.navigator.push(forgotPasswordRoute) }
							style={ LoginStyles.forgotPasswordLink }>
							Forgot your Password?
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default LoginScene;
