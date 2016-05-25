'use strict';

import React, { AppRegistry, BackAndroid, Component, DrawerLayoutAndroid, Image, Navigator, Platform, Switch, Text, View } from 'react-native';
import DrawerLayoutIOS from 'react-native-drawer-layout';
import NavigationDrawerStyles from './styles';
let DrawerLayout = null;
if (Platform.OS === 'android'){
	DrawerLayout = DrawerLayoutAndroid;
	DrawerLayout.width = 300;
} else {
	DrawerLayout = DrawerLayoutIOS;
	DrawerLayout.width = 275;
}

import NativeButton from 'Tesloop/src/components/NativeButton';

import Router from 'Tesloop/src/routes/content/router.js';

class NavigationDrawer extends Component {
	constructor(props) {
		super(props);
	}
	openDrawer = () => {
		return this.refs['NAVIGATION_DRAWER'].openDrawer();
	};
	closeDrawer = () => {
		return this.refs['NAVIGATION_DRAWER'].closeDrawer();
	};
	render() {
		let MainView = this.props.MainView;
		return (
			<DrawerLayout
				drawerWidth={ DrawerLayout.width }
				drawerPosition={ DrawerLayout.positions.Left }
				ref={ 'NAVIGATION_DRAWER' }
				style={ NavigationDrawerStyles.container }
				renderNavigationView={ () => (
					<View style={{flex: 1, backgroundColor: '#fff'}}>
						<View style={ NavigationDrawerStyles.headerContainer }>
							<Image style={ NavigationDrawerStyles.profilePicture } source={ require('Tesloop/resources/images/default_profile_picture.png') } />
							<View style={{paddingVertical: 5}}>
								<Text style={{color: 'white', fontSize: 20, marginBottom: 5}}>Jordan Garside</Text>
								<Text style={{color: 'gainsboro', fontSize: 14}}>View profile</Text>
							</View>
						</View>
						<NativeButton
							color='gray'
							onPress={() => {
								this.closeDrawer();
								Router.go('mapSearch');
							}}>
								<View style={ NavigationDrawerStyles.drawerLink }>
									<Image
										source={require('Tesloop/resources/images/ic_pin_drop_black.png')}
										style={ NavigationDrawerStyles.drawerLinkIcon } />
									<Text style={ NavigationDrawerStyles.drawerLinkText }>Home</Text>
								</View>
						</NativeButton>
						<NativeButton
							color='gray'
							onPress={() => {
								this.closeDrawer();
								Router.go('trips');
							}}>
								<View style={ NavigationDrawerStyles.drawerLink }>
									<Image
										source={require('Tesloop/resources/images/ic_directions_car_black.png')}
										style={ NavigationDrawerStyles.drawerLinkIcon } />
									<Text style={ NavigationDrawerStyles.drawerLinkText }>Trips</Text>
								</View>
						</NativeButton>
						<NativeButton
							color='gray'
							onPress={() => {
								this.closeDrawer();
								Router.go('cities');
							}}>
								<View style={ NavigationDrawerStyles.drawerLink }>
									<Image
										source={require('Tesloop/resources/images/ic_location_city_black.png')}
										style={ NavigationDrawerStyles.drawerLinkIcon } />
									<Text style={ NavigationDrawerStyles.drawerLinkText }>Cities</Text>
								</View>
						</NativeButton>
						<NativeButton
							color='gray'
							onPress={() => {
								this.closeDrawer();
								Router.go('help');
							}}>
								<View style={ NavigationDrawerStyles.drawerLink }>
									<Image
										source={require('Tesloop/resources/images/ic_help_black.png')}
										style={ NavigationDrawerStyles.drawerLinkIcon } />
									<Text style={ NavigationDrawerStyles.drawerLinkText }>Help</Text>
								</View>
						</NativeButton>
						<NativeButton
							color='gray'
							onPress={() => {
								this.closeDrawer();
								Router.go('settings');
							}}>
								<View style={ NavigationDrawerStyles.drawerLink }>
									<Image
										source={require('Tesloop/resources/images/ic_settings_black.png')}
										style={ NavigationDrawerStyles.drawerLinkIcon } />
									<Text style={ NavigationDrawerStyles.drawerLinkText }>Settings</Text>
								</View>
						</NativeButton>
						<View style={ NavigationDrawerStyles.footerContainer }>
							<Image
								source={require('Tesloop/resources/images/ic_directions_car_black.png')}
								style={ NavigationDrawerStyles.drawerLinkIcon } />
							<Text style={ NavigationDrawerStyles.drawerLinkText }>Pilot</Text>
							<View style={{flex: 1, alignItems: 'flex-end'}}>
								<Switch />
							</View>
						</View>
					</View>
				) }>
				<MainView
					openDrawer={ this.openDrawer }
					{...this.props}
				/>
			</DrawerLayout>
		);
	}
}

//NavigationDrawer.propTypes = { MainView: React.PropTypes.element };

export default NavigationDrawer;
