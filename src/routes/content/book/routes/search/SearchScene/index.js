'use strict';

import React, { Image, Switch, Text, TextInput, View } from 'react-native';
import moment from 'moment';
import SearchSceneStyles from './styles';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';

import dateSearchRoute from '../../dateSearch';
import orderRoute from '../../order';
import timeSearchRoute from '../../timeSearch';

import { colors, fonts } from 'Tesloop/src/settings';

class SearchScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roundTrip: false,
			departureDate: null,
			departureTrip: {},
			returnDate: null,
			returnTrip: {},
		}
	}
	componentWillMount() {
		// Find possible routes

	};
	render() {
		console.log('SearchScene: Render()');
		let currentRoutes  = this.props.navigator.parentNavigator.getCurrentRoutes();
		let currentRoute   = currentRoutes[ currentRoutes.length - 1 ];
		let origin         = currentRoute.origin;
		let destination    = currentRoute.destination;
		let departureTrip  = this.state.departureTrip;
		let returnTrip     = this.state.returnTrip;
		let departureDate  = this.state.departureDate ? moment(this.state.departureDate).format('MMMM DD, YYYY') : 'Select';
		let returnDate  = this.state.returnDate ? moment(this.state.returnDate).format('MMMM DD, YYYY') : 'Select';
		let departureTime = departureTrip.id ? moment(departureTrip.startDatetime).tz(departureTrip.closestOriginWaypoint.timezone).format('h:m a z') : 'Select';
		let returnTime = returnTrip.id ? moment(returnTrip.startDatetime).tz(returnTrip.closestOriginWaypoint.timezone).format('h:m a z') : 'Select';
		let canOrder = false;
		if (this.state.roundTrip) {
			if ( departureTrip.id && returnTrip.id ) {
				canOrder = true;
			}
		} else {
			if ( departureTrip.id ) {
				canOrder = true;
			}
		}
		return (
			<View style={ SearchSceneStyles.container }>
				<Toolbar title='Book your Trip' navigator={ this.props.navigator.parentNavigator } />
				<View style={ SearchSceneStyles.contentContainer }>
					<View
						style={ SearchSceneStyles.placeContainer }>
						<View
							style={[
								SearchSceneStyles.indicator,
								SearchSceneStyles.originIndicator
							]}
						/>
						<Text style={ SearchSceneStyles.placeText }>{ origin.address }</Text>
					</View>
					<View
						style={ SearchSceneStyles.placeContainer }>
						<View
							style={[
								SearchSceneStyles.indicator,
								SearchSceneStyles.destinationIndicator
							]}
						/>
						<Text style={ SearchSceneStyles.placeText }>{ destination.address }</Text>
					</View>
					<View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', padding: 15, marginVertical: 5 }}>
						<Text style={{ fontFamily: fonts.light }}> Round-Trip </Text>
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<Switch
								onValueChange={ (value) => this.setState({roundTrip: value}) }
								value={ this.state.roundTrip }
							/>
						</View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row'}}>
						<View style={{ flex: 1 }}>
							<Text style={{ marginVertical: 5, fontFamily: fonts.light}}>Depart</Text>
							<View style={{ marginVertical: 5 }}>
								<NativeButton
									color='gray'
									onPress={ () => {
										this.props.navigator.push(
											Object.assign({}, dateSearchRoute, {
												type: 'departure',
												origin: origin,
												destination: destination,
												departureDate: this.state.departureDate,
												returnDate: this.state.returnDate,
												onDateChange: (date) => (
													this.setState({
														departureDate: date,
													})
												),
											})
										)
									}}>
									<View
										style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 20, backgroundColor: 'white' }}>
										<Text style={{color: colors.primary, textAlign: 'center', flex: 1}}>{ departureDate }</Text>
										<Text style={{ fontFamily: fonts.light, position: 'absolute', top: 5, left: 10 }}>Day</Text>
									</View>
								</NativeButton>
							</View>
							{(() => { if ( this.state.departureDate ) { return (
								<View style={{ marginVertical: 5 }}>
								<NativeButton
									color='gray'
									onPress={ () => {
										this.props.navigator.push(
											Object.assign({}, timeSearchRoute, {
												type: 'departure',
												origin: origin,
												destination: destination,
												date: this.state.departureDate,
												tripId: departureTrip.id,
												onTimeChange: (trip) => (
													this.setState({
														departureTrip: trip,
													})
												),
											})
										)
									}}>
									<View
										style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 20, backgroundColor: 'white' }}>
										<Text style={{color: colors.primary, textAlign: 'center', flex: 1}}>{ departureTime }</Text>
										<Text style={{ fontFamily: fonts.light, position: 'absolute', top: 5, left: 10 }}>Time</Text>
									</View>
								</NativeButton>
							</View>
							)}})()}
						</View>
						{/* Show RoundTrip Selectors if roundTrip is enabled */}
						{(() => { if ( this.state.roundTrip ) { return (
						<View style={{ flex: 1, marginLeft: 10 }}>
							<Text style={{ marginVertical: 5, fontFamily: fonts.light}}>Return</Text>
							<View style={{ marginVertical: 5 }}>
								<NativeButton
									color='gray'
									onPress={ () => {
										this.props.navigator.push(
											Object.assign({}, dateSearchRoute, {
												type: 'return',
												origin: origin,
												destination: destination,
												departureDate: this.state.departureDate,
												returnDate: this.state.returnDate,
												onDateChange: (date) => (
													this.setState({
														returnDate: date,
													})
												),
											})
										)
									}}>
									<View
										style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 20, backgroundColor: 'white' }}>
										<Text style={{color: colors.accent, textAlign: 'center', flex: 1}}>{ returnDate }</Text>
										<Text style={{ fontFamily: fonts.light, position: 'absolute', top: 5, left: 10 }}>Day</Text>
									</View>
								</NativeButton>
							</View>
							{(() => { if ( this.state.returnDate ) { return (
							<View>
							<View style={{ marginVertical: 5 }}>
								<NativeButton
									color='gray'
									onPress={ () => {
										this.props.navigator.push(
											Object.assign({}, timeSearchRoute, {
												type: 'return',
												origin: origin,
												destination: destination,
												date: this.state.returnDate,
												tripId: returnTrip.id,
												onTimeChange: (trip) => (
													this.setState({
														returnTrip: trip,
													})
												),
											})
										)
									}}>
									<View
										style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 20, backgroundColor: 'white' }}>
										<Text style={{color: colors.accent, textAlign: 'center', flex: 1}}>{ returnTime }</Text>
										<Text style={{ fontFamily: fonts.light, position: 'absolute', top: 5, left: 10 }}>Time</Text>
									</View>
								</NativeButton>
							</View>
							</View>
							)}})()}
						</View>
						);}})()}
					</View>
					{(() => { if ( canOrder ) { return (
					<View style={{ position: 'absolute', bottom: 20, right: 20, }}>
						<NativeButton
							color='gray'
							onPress={ () => {
								this.props.navigator.push(
									Object.assign({}, orderRoute, {
										origin: origin,
										destination: destination,
										departureTrip: departureTrip,
										returnTrip: returnTrip,
									})
								)
							}}>
							<View
								style={{ backgroundColor: colors.primary, height: 44, width: 44, borderRadius: 22, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
								<Image style={{}} source={ require('Tesloop/resources/images/ic_arrow_forward_white.png') } />
							</View>
						</NativeButton>
					</View>
					);}})()}
				</View>
			</View>
		);
	}
}

export default SearchScene;
