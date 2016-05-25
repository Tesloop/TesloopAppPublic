import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	backgroundContainer: {
		alignItems: 'center',
		flex: 1,
		position: 'absolute',
		top: 0, left: 0, bottom: 0, right: 0,
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover'
	},
	container: {
		flex: 1
	},
	footerContainer: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-around',
		left: 0, bottom: 0, right: 0,
		paddingBottom: 30,
		position: 'absolute',
	},
	headerContainer: {
		alignItems: 'center',
		flex: 1,
		left: 0,
		paddingHorizontal: 15,
		paddingTop: 80,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	headerText: {
		alignSelf: 'stretch',
		backgroundColor: 'transparent',
		color: 'black',
		fontSize: 50,
		fontFamily: fonts.thin,
		textAlign: 'center',
	},
	loginButton: {
		backgroundColor: 'white',
		marginLeft: 15,
		paddingVertical: 15,
		width: 150,
	},
	loginText: {
		color: 'black',
		fontFamily: fonts.light,
		fontSize: 22,
		textAlign: 'center',
	},
	registerButton: {
		backgroundColor: colors.primary, //'#00B796', //'#3ca0d3',
		marginRight: 15,
		paddingVertical: 15,
		width: 150,
	},
	registerText: {
		color: 'white',
		fontFamily: fonts.light,
		fontSize: 22,
		textAlign: 'center',
	},
});


// IOS Platform
if ( Platform.OS === 'ios' ){
// Android Platform
} else {
}

export default styles;
