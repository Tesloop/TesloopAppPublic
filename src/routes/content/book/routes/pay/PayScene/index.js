'use strict';
// Receives Day and RouteId and Shows Times
// Calls onTimeChange passing in the TripId and Time

import React, { Text, TextInput, TouchableHighlight, View } from 'react-native';
import DropDown, { Select, Option, OptionList,} from 'react-native-selectme';

import NativeButton from 'Tesloop/src/components/NativeButton';
import Toolbar from 'Tesloop/src/components/Toolbar';
import lokkaClient from 'Tesloop/src/lokkaClient';

import { colors, fonts } from 'Tesloop/src/settings';
import config from 'Tesloop/src/config';
import _styles from './styles';

class PayScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			creditCards: []
		}
	}
	componentWillMount() {
		lokkaClient.query(`{
			myProfile{
				id,
				firstName,
				creditCards {
					lastFour,
					brand,
					stripeCardId
				}
			}
		}`).then(
			(result) => {
				console.log(result);
				let user = result.myProfile;
				this.setState({
					creditCards: user.creditCards
				});
			}
		);
	};
	_getOptionList = () => {
		return this.refs['OPTION_LIST'];
	};
	render() {
		console.log('PayScene: Render()');
		return (
			<View style={ _styles.container }>
				<Toolbar
					navigator={ this.props.navigator }
					title={`Payment`} />
				<View style={ _styles.contentContainer }>
					<View style={{ flex: 1, padding: 15 }}>
						<View
							style={{flexDirection: 'column', marginBottom: 30}}>
							<View>
								<Text> Departure </Text>
								<View style={{flexDirection: 'row'}}>
									<View style={{flex: 1}}><Text> 2 Seats ($85) </Text></View>
									<View style={{flex: 1}}><Text style={{textAlign: 'right'}}> $170 </Text></View>
								</View>
							</View>
							<View style={{marginTop: 15}}>
								<Text> Return </Text>
								<View style={{flexDirection: 'row'}}>
									<View style={{flex: 1}}><Text> 2 Seats ($60) </Text></View>
									<View style={{flex: 1}}><Text style={{textAlign: 'right'}}> $120 </Text></View>
								</View>
							</View>
							<View style={{marginTop: 15}}>
								<Text> Coupons </Text>
								<View style={{flexDirection: 'row'}}>
									<View><Text> freedom </Text></View>
									<View style={{flex: 1}}><Text> 30% off </Text></View>
									<View><Text>-$25</Text></View>
								</View>
								<View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10}}>
									<TextInput
										placeholder='Coupon Code'
										maxLength={20}
										style={{height: 40}}
									/>
								</View>
							</View>
							<View style={{flexDirection: 'row', marginTop: 15}}>
								<View style={{flex: 1}}><Text style={{textAlign: 'right'}}> Total </Text></View>
								<View><Text style={{textAlign: 'right'}}> $390 </Text></View>
							</View>
						</View>
						<View>
							<Text>Existing Cards</Text>
							{(() => { if ( this.state.creditCards.length > 0 ) { return (
							<Select
								ref="CARD_SELECTOR"
								optionListRef={this._getOptionList}
								width={250}>
								{this.state.creditCards.map( creditCard  => { return (
									<Option>{creditCard.brand} ending in {creditCard.lastFour}</Option>
								)})}
							</Select>
							)}})()}
						</View>
						<View style={{marginTop: 15}}>
							<Text>Add a Credit Card</Text>
						</View>
						<OptionList ref="OPTION_LIST" />
					</View>
					<NativeButton
						color='gray'
						onPress={ () => {
							console.log('Process Order....');
						}}>
						<View style={{ height: 56, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ color: 'white', fontFamily: fonts.light, fontSize: 20 }}> Book </Text>
						</View>
					</NativeButton>
				</View>
			</View>
		);
	}
}

export default PayScene;
