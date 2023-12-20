import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
	palettes: {
		display: 'flex',
		gridTemplateColumns: 'repeat(5, 1fr)',
		gap: '0.8dvw',
		width: '100%',
		position: 'relative',
	},
	palettesPortrait: {
		'@media (max-aspect-ratio: 1)': {
			gap: '1.5dvw',
		},
	},
	menu: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
	},
	menuExLandscape: {
		height: '100%',
		width: '100%',
	},

	panel: {
		top: '-2dvmin',
		position: 'absolute',
		zIndex: 5,
		borderRadius: '1dvmin',
		display: 'grid',
		boxSizing: 'border-box',
		alignItems: 'center',
		padding: '4dvmin 3dvmin 0',
		border: '1px solid #c0c0c0',
		backgroundColor: 'white',
		boxShadow: '#77777780 0px 0px 3px 2px',
		gap: '2.5dvmin',
		width: 'min(54dvh, 31.5dvw)',
		marginLeft: 'min(81dvh, 47.25dvw)',
		gridTemplateRows: 'auto auto auto 1fr auto',
		minHeight: '40dvh',
	},
	panelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			width: '65dvw',
			marginLeft: 0,
		},
	},
	panelLandscapeAndPortrait: {
		'@media (min-aspect-ratio: 2 / 3 ) and (max-aspect-ratio: 7 / 4)': {
			gridTemplateRows: 'auto 1fr auto',
		},
	},
	panelExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			top: '-1dvmin',
			width: '100%',
			border: 'none',
			margin: 0,
			height: '100%',
			boxShadow: 'none',
			gap: '3dvmin',
		},
	},
	panelExPortrait: {
		'@media (max-aspect-ratio: 2 / 3)': {
			minHeight: '35dvh',
		},
	},
	panelDark: {
		border: '1px solid #424242',
		backgroundColor: '#3c3c3c',
		boxShadow: '#00000060 0px 0px 3px 2px',
	},

	commonOption: {
		height: '100%',
		aspectRatio: '1 / 1',
		'-webkit-tap-highlight-color': 'transparent',
	},
	shareLinkOption: {
		height: '100%',
		aspectRatio: '1 / 1',
		maxHeight: '6dvmin',
		'-webkit-tap-highlight-color': 'transparent',
	},
	commonButton: {
		display: 'flex',
		justifyContent: 'center',
		border: '0.7px solid #838383',
		boxSizing: 'border-box',
		boxShadow: '#838383 -1px 1px 2px',
		borderRadius: '0.3rem',
		backgroundColor: 'white',
		height: '100%',
		position: 'absolute',
		transitionProperty: 'left',
	},
	commonButtonDark: {
		backgroundColor: '#3c3c3c',
		border: '0.8px solid #00000080',
		boxShadow: '#00000080 -1px 1px 2px',
	},

	commonLiner: {
		display: 'grid',
		justifyItems: 'center',
		padding: '2px',
		backgroundColor: '#e4e4e4',
		boxShadow: 'inset #44444480 3px 2px 1px 0px',
		alignItems: 'center',
		height: '6dvh',
		position: 'relative',
		borderRadius: '0.3rem',
	},
	commonLinerExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			height: '3.5dvmax',
		},
	},
	commonLinerExPortrait: {
		'@media (max-aspect-ratio: 2 / 3)': {
			height: '4.5dvmax',
		},
	},
	commonLinerDark: {
		backgroundColor: '#2c2c2c',
		boxShadow: 'inset #00000080 3px 2px 1px 0px',
	},
	commonDuoLiner: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
	commonTriLiner: {
		gridTemplateColumns: 'repeat(3, 1fr)',
	},

	commonMaskWrapper: {
		position: 'relative',
		height: '0px',
	},
	commonMask: {
		position: 'relative',
		height: 'calc(6dvh + 4px)',
		top: 'calc(-6dvh - 9px)',
		borderWidth: '5px',
		borderStyle: 'solid',
		borderColor: 'white',
		borderRadius: '0.6rem',
		margin: '0 -5px',
		pointerEvents: 'none',
	},
	commonMaskExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			height: 'calc(3.5dvmax + 4px)',
			top: 'calc(-3.5dvmax - 8.9px)',
		},
	},
	commonMaskExPortrait: {
		'@media (max-aspect-ratio: 2 / 3)': {
			height: 'calc(4.5dvmax + 4px)',
			top: 'calc(-4.5dvmax - 8.9px)',
		},
	},
	commonMaskDark: {
		borderColor: '#3c3c3c',
	},

	biSettingRow: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '2.5dvmin',
		alignSelf: 'flex-start',
	},
	quadSettingRow: {
		display: 'grid',
		gridTemplateColumns: '1fr repeat(4, 2fr) 1fr',
		gap: 'calc(2dvw - 10px)',
		alignSelf: 'flex-end',
		minHeight: '10dvh',
		alignContent: 'flex-end',
		justifyItems: 'center',
	},
	commonTriButtons: {
		width: '33.3%',
	},
	commonDuoButtons: {
		transitionDuration: '300ms',
		width: '50%',
	},
	paletteButton: {
		width: '100%',
		height: '100%',
		aspectRatio: '1 / 1',
		cursor: 'pointer',
		'-webkit-tap-highlight-color': 'transparent',
	},

	orientation: {
		'@media (min-aspect-ratio: 2 / 3 ) and (max-aspect-ratio: 7 / 4 )': {
			display: 'none',
		},
	},

	liftPlaceholder: {
		width: '20dvw',
		justifySelf: 'center',
		height: '0px',
		'-webkit-tap-highlight-color': 'transparent',
	},
	liftPlaceholderLandscape: {
		'@media (min-aspect-ratio: 1 )': {
			width: '10dvw',
		},
	},
	lift: {
		backgroundColor: '#efefef',
		width: '100%',
		height: '1dvmin',
		borderRadius: '1dvmin',
		boxShadow: '#77777780 0px 1px 2px 1px',
		marginTop: '2dvmin',
		cursor: 'pointer',
		'-webkit-tap-highlight-color': 'transparent',
	},
	liftCover: {
		position: 'relative',
		height: '5dvmin',
		top: '-1dvmax',
		'-webkit-tap-highlight-color': 'transparent',
	},

	liftDark: {
		backgroundColor: '#3c3c3c',
		boxShadow: '#00000060 0px 1px 2px 1px',
	},

	overlayStyle: {
		height: '100dvh',
		width: '100dvw',
		position: 'absolute',
		zIndex: 4,
	},
});
