import {
	Platform,
	StyleSheet
} from 'react-native';

import { colors, fonts } from 'Tesloop/src/settings';

let styles = StyleSheet.create({
	container: {

	},
	profilePicture: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginRight: 15
	},
	drawerLink: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: 'row',
	},
	drawerLinkIcon: {
		marginRight: 20
	},
	drawerLinkText: {
		fontSize: 16
	},
	footerContainer: {
		flex: 1,
		marginBottom: 30,
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: 15,
	}
});

// IOS Platform
if ( Platform.OS === 'ios' ){
	styles.headerContainer = {
		backgroundColor: colors.background.dark,
		paddingBottom: 15,
		paddingHorizontal: 30,
		paddingTop: 35,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	};
// Android Platform
} else {
	styles.headerContainer = {
		backgroundColor: colors.background.dark,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	};
}

export default styles;
