import {
	StyleSheet
} from 'react-native';

import fonts from 'Tesloop/src/settings/fonts';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 15,
	},
	forgotPasswordLink: {
		flex: 1,
		textAlign: 'center',
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
	loginButton: {
		alignItems: 'center',
		backgroundColor: '#2c1f3e',
		flex: 1,
		height: 56,
		justifyContent: 'center',
		marginRight: 10,
		marginVertical: 25,
		paddingHorizontal: 16,
		paddingVertical: 15,
	},
	loginText: {
		color: 'white',
		fontFamily: fonts.light,
		fontSize: 18,
	},
});
