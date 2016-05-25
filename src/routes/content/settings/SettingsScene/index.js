'use strict';

import React, { Image, ScrollView, Text, ToolbarAndroid, View } from 'react-native';
import FBSDKLogin, { FBSDKLoginManager } from 'react-native-fbsdklogin';
import SettingsStyles from './styles';
import config from 'Tesloop/src/config';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import landingRoute from 'Tesloop/src/routes/landing';


class SettingsScene extends React.Component {
	constructor(props) {
		super(props);
	};
	logOut = () => {
		fetch(`${config.serverURL}auth/logout`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(
			(response) => {
				let data = JSON.parse(response._bodyText);
				if (data.loggedOut) {
					// User was logged out
					FBSDKLoginManager.logOut();
					this.props.navigator.parentNavigator.popToRoute(landingRoute);
				} else {
					console.log(response)
				}
			}
		).catch( (error) => console.log(error) ).done();
	};
	loginStatus = () => {
		fetch(`${config.serverURL}auth/status`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(
			(response) => {
				let data = JSON.parse(response._bodyText);
				console.log(data);
				/*
				if (data.loggedOut) {

				} else {
					console.log(response)
				}
				*/
			}
		).catch( (error) => console.log(error) ).done();
	};
	render() {
		console.log('SettingsScene: Render()');
		return (
			<View style={{ flex: 1, backgroundColor: 'orange' }}>
				<Toolbar title='Settings' navigator={this.props.navigator} />
				<ScrollView style={{ flex: 1, paddingVertical: 15 }}>
					<NativeButton
						color='gray'
						onPress={this.logOut}>
						<View style={ SettingsStyles.settingLink }>
							<Image
								source={require('Tesloop/resources/images/ic_exit_to_app_black.png')}
								style={ SettingsStyles.settingLinkIcon } />
							<Text style={ SettingsStyles.settingLinkText }>Logout</Text>
						</View>
					</NativeButton>
				</ScrollView>
			</View>
		);
	}
}

export default SettingsScene;
