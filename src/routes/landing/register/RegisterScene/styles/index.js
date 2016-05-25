import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 15,
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		color: 'black',
		flex: 1,
		fontSize: 16,
		height: 40,
		padding: 10,
		marginBottom: 15,
	},
	facebokLoginButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	},
	orDivider: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 15,
	},
	orText: {

	},
	registerButton: {
		alignItems: 'center',
		backgroundColor: colors.accentDark,
		flex: 1,
		height: 56,
		justifyContent: 'center',
		marginBottom: 20,
		marginRight: 10,
		marginTop: 25,
		paddingHorizontal: 16,
		paddingVertical: 15,
	},
	registerText: {
		color: 'white',
		fontFamily: fonts.light,
		fontSize: 18,
	},
});


// IOS Platform
if ( Platform.OS === 'ios' ){
	styles.statusBarColor = colors.base;
// Android Platform
} else {
	styles.statusBarColor = colors.baseDark;
}

export default styles;
