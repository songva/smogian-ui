import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	banner: {
		display: 'flex',
		justifyContent: 'center',
		boxShadow: '#77777780 0px 1px 2px 1px',
		marginBottom: '3px',
		backgroundColor: 'white',
		fontWeight: 300,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	bannerExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(50dvw - 56dvmin)',
			height: '100dvh',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
		},
	},
	bannerDark: {
		backgroundColor: '#3c3c3c',
		boxShadow: '#161616cc 0px 1px 3px 2px',
	},
	bannerIOSChrome: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(50dvw - 50dvmin)',
		},
	},
	bannerIOSSafari: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(50dvw - 60dvmin)',
		},
	},

	liner: {
		display: 'grid',
		justifyContent: 'center',
		padding: '1dvh 20dvw',
		borderBottom: '1px solid #77777785',
		backgroundColor: 'white',
		gridTemplateColumns: '0 repeat(8, 1fr) 0 1fr 0 repeat(7, 1fr) 0',
		zIndex: 6,
		width: 'calc(min(144dvh, 84dvw))',
	},
	linerExLandscapeAndExPortrait: {
		'@media (min-aspect-ratio: 2), (max-width: 450px)': {
			padding: '1dvh 0',
			width: '100%',
			gridTemplateColumns: '1fr repeat(8, auto) 1fr',
		},
	},
	linerPortrait: {
		'@media (max-aspect-ratio: 1)': {
			padding: '0.5dvw',
			width: '100%',
			boxSizing: 'border-box',
		},
	},
	linerDark: {
		color: 'white',
		borderBottom: '1px solid #1f1f1f',
		backgroundColor: '#282828',
	},

	letterWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '-0.5px 0.5px 0px 1px #a2a2a280',
		borderRadius: '0.3vh',
		position: 'relative',
		fontFamily: '"Gill Sans regular", "system-ui"',
		margin: '0.5dvh',
		fontSize: 'min(5dvmin, 3dvw)',
		userSelect: 'none',
		aspectRatio: '1 / 1',
	},
	spaceLetterWrapper: {
		boxShadow: 'none',
	},
	letterWrapperNarrowRatio: {
		'@media (max-width: 450px)': {
			width: 'min(7dvh, 10dvw)',
			fontSize: '6dvmin',
		},
	},
	letterWrapperExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(6dvw - 7.5dvmin)',
			fontSize: '2dvw',
		},
	},
	letterWrapperIOSSafari: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(6dvw - 8dvmin)',
			fontSize: '1.8dvw',
		},
	},
	letterWrapperIOSChrome: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(6dvw - 7dvmin)',
			fontSize: '2.1dvw',
		},
	},
	letter: {
		zIndex: 1,
	},
	letterBorder: {
		position: 'absolute',
	},
	letterBackground: {
		strokeWidth: '1px',
		stroke: '#a2a2a280',
		fill: 'none',
	},
});

export default styles;
