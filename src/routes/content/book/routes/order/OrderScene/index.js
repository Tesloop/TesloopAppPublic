'use strict';

import React, { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import { colors, fonts } from 'Tesloop/src/settings';
import _styles from './styles';

import payRoute from '../../pay';
import staticMap from './staticMap';

class OrderScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: {},
			destination: {},
			departureTrip: {},
			returnTrip: {}
		}
	}
	componentWillMount() {
		let currentRoutes  = this.props.navigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		this.setState({
			origin: currentRoute.origin,
			destination: currentRoute.destination,
			departureTrip: currentRoute.departureTrip,
			returnTrip: currentRoute.returnTrip
		});
	};
	render() {
		console.log('OrderScene: Render()');
		let origin         = this.state.origin;
		let destination    = this.state.destination;
		let departureTrip  = this.state.departureTrip;
		let returnTrip     = this.state.returnTrip;
		return (
			<View style={ _styles.container }>
				<Toolbar title='Review your Trip' navigator={ this.props.navigator } />
				<View style={ _styles.contentContainer }>
					<View style={{ flex: 1, paddingHorizontal: 15 }}>
						<Text style={{ fontSize: 20, fontFamily: fonts.thin, }}>{departureTrip.closestOriginWaypoint.city} to {departureTrip.closestDestinationWaypoint.city}</Text>
						<View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
							<View style={{ flex: 1 }}>
								<Text style={{ fontSize: 16, fontFamily: fonts.light, paddingBottom: 5, }}>Depart</Text>
								<Text style={{ fontSize: 14, fontFamily: fonts.light, }}>
									{moment(departureTrip.startDatetime)
										.tz(departureTrip.closestOriginWaypoint.timezone)
										.format('MMMM Do, YYYY')}
								</Text>
								<Text style={{ fontSize: 14, fontFamily: fonts.light, }}>
									{moment(departureTrip.startDatetime)
										.tz(departureTrip.closestOriginWaypoint.timezone)
										.format('h:m a (z)')}
								</Text>
							</View>
							{(() => { if ( returnTrip.id ) { return (
								<View style={{ flex: 1 }}>
									<Text style={{ fontSize: 16, fontFamily: fonts.light, paddingBottom: 5, }}>Return</Text>
									<Text style={{ fontSize: 14, fontFamily: fonts.light, }}>
										{moment(returnTrip.startDatetime)
											.tz(returnTrip.closestOriginWaypoint.timezone)
											.format('MMMM Do, YYYY')}
									</Text>
									<Text style={{ fontSize: 14, fontFamily: fonts.light, }}>
										{moment(returnTrip.startDatetime)
											.tz(returnTrip.closestOriginWaypoint.timezone)
											.format('h:m a (z)')}
									</Text>
								</View>
							)}})()}
						</View>
					</View>
					<ScrollView style={{ flex: 3 }}>
						<View style={{ flexDirection: 'row', marginBottom: 15, backgroundColor: 'white', marginHorizontal: 15 }}>
							<Image
								style={{ flex: 1, height: 225, }}
								source={{ uri: staticMap({
									origin: {
										latitude: origin.location.latitude,
										longitude: origin.location.longitude
									},
									destination: {
										latitude: departureTrip.closestOriginWaypoint.latitude,
										longitude: departureTrip.closestOriginWaypoint.longitude
									},
									zoom: 9,
									width: 200,
								}) }}
							/>
							<View style={{ flex: 1 }}>
							</View>
						</View>
						<View style={{ flexDirection: 'row', marginBottom: 15, backgroundColor: 'white', marginHorizontal: 15 }}>
							<Image
								style={{ flex: 1, height: 225 }}
								source={{ uri: staticMap({
									origin: {
										latitude: departureTrip.closestOriginWaypoint.latitude,
										longitude: departureTrip.closestOriginWaypoint.longitude
									},
									destination: {
										latitude: departureTrip.closestDestinationWaypoint.latitude,
										longitude: departureTrip.closestDestinationWaypoint.longitude
									},
									zoom: 5,
									width: 200,
								}) }}
							/>
							<View style={{ flex: 1 }}>
							</View>
						</View>
						<View style={{ flexDirection: 'row', marginBottom: 15, backgroundColor: 'white', marginHorizontal: 15 }}>
							<Image
								style={{ flex: 1, height: 225, }}
								source={{ uri: staticMap({
									origin: {
										latitude: departureTrip.closestDestinationWaypoint.latitude,
										longitude: departureTrip.closestDestinationWaypoint.longitude
									},
									destination: {
										latitude: destination.location.latitude,
										longitude: destination.location.longitude
									},
									zoom: 9,
									width: 200,
								}) }}
							/>
							<View style={{ flex: 1 }}>
							</View>
						</View>
					</ScrollView>
					<NativeButton
						color='gray'
						onPress={ () => {
							this.props.navigator.push(
								Object.assign({}, payRoute, {})
							)
						}}>
						<View style={{ height: 56, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontFamily: fonts.light, fontSize: 20 }}> Pay </Text>
						</View>
					</NativeButton>
				</View>
			</View>
		);
	}
}

export default OrderScene;
