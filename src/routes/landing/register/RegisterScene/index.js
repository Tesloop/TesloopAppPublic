'use strict';

import CookieManager from 'react-native-cookies';
import React, { Image, Platform, ScrollView, Text, TextInput, ToolbarAndroid, View } from 'react-native';
import { FBSDKAccessToken, FBSDKGraphRequest } from 'react-native-fbsdkcore';
import FBSDKLogin, { FBSDKLoginButton, FBSDKLoginManager } from 'react-native-fbsdklogin';
import RegisterStyles from './styles';
import config from 'Tesloop/src/config';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import contentRoute from 'Tesloop/src/routes/content';

class RegisterScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userFirstName: "",
			userLastName: "",
			userEmail: "",
			userPassword: "",
			userPhoneNumber: ""
		};
	}
	register = () => {
		let firstName   = this.state.userFirstName;
		let lastName    = this.state.userLastName;
		let email       = this.state.userEmail;
		let password    = this.state.userPassword;
		let phoneNumber = this.state.userPhoneNumber;
		fetch(`${config.serverURL}auth/local/register`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				phoneNumber: phoneNumber
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
	// Scroll a component into view. Just pass the component ref string.
	inputFocused (refName) {
		setTimeout(() => {
			let scrollResponder = this.refs.scrollView.getScrollResponder();
			scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
					React.findNodeHandle(this.refs[refName]),
					110, //additionalOffset
					true
			);
		}, 50);
	};
	render() {
		console.log('RegisterScene: Render()');
		let facebookLoginButton = null;
		if ( Platform.OS === 'ios' ) {
			facebookLoginButton = (
				<View>
					<View style={ RegisterStyles.facebokLoginButtonContainer }>
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
					<View style={ RegisterStyles.orDivider }>
						<Text style={ RegisterStyles.orText }> OR </Text>
					</View>
				</View>
			)
		}
		return (
			<View style={ RegisterStyles.container }>
				<Toolbar title='Register' navigator={this.props.navigator} />
				<ScrollView style={ RegisterStyles.contentContainer } ref='scrollView' keyboardDismissMode='on-drag'>
					<View style={{flexDirection: 'column'}}>
						{ facebookLoginButton }
						<View style={{flexDirection: 'row'}}>
							<TextInput
								style={ RegisterStyles.input }
								placeholder='First Name'
								ref='firstNameInput'
								onChangeText={(text) => this.setState({userFirstName: text})}
								onSubmitEditing={() => this.refs.lastNameInput.focus()}
							/>
							<TextInput
								style={ RegisterStyles.input }
								placeholder='Last Name'
								ref='lastNameInput'
								onChangeText={(text) => this.setState({userLastName: text})}
								onSubmitEditing={() => this.refs.phoneNumberInput.focus()}
							/>
						</View>
						<TextInput
							style={ RegisterStyles.input }
							keyboardType='numeric'
							placeholder='Phone Number'
							ref='phoneNumberInput'
							onChangeText={ (text) => this.setState({userPhoneNumber: text}) }
							onSubmitEditing={() => this.refs.emailInput.focus()}
							returnKeyType='next'
						/>
						<TextInput
							keyboardType='email-address'
							style={ RegisterStyles.input }
							placeholder='name@example.com'
							ref='emailInput'
							onFocus={this.inputFocused.bind(this, 'emailInput')}
							onChangeText={(text) => this.setState({userEmail: text})}
							onSubmitEditing={() => this.refs.passwordInput.focus()}
						/>
						<TextInput
							style={ RegisterStyles.input }
							placeholder='password'
							ref='passwordInput'
							autoCorrect={ false }
							onFocus={this.inputFocused.bind(this, 'passwordInput')}
							onChangeText={(text) => this.setState({userPassword: text}) }
							onSubmitEditing={ this.register }
							secureTextEntry={ true }
							returnKeyType='go'
						/>
						<NativeButton
							color='white'
							onPress={this.register}
						>
							<View style={ RegisterStyles.registerButton }>
								<Text style={ RegisterStyles.registerText }>Register</Text>
							</View>
						</NativeButton>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default RegisterScene;
