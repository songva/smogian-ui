import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
	block: {
		height: '100%',
		width: '100%',
		position: 'relative',
		userSelect: 'none',
		transform: 'translateZ(0)',
		'-webkit-tap-highlight-color': 'transparent',
	},

	blockBackgrounds: {
		position: 'absolute',
		height: '100%',
		aspectRatio: '1 / 1',
	},

	shadow: {
		height: '100%',
		aspectRatio: '1 / 1',
		borderRadius: '7%',
		boxShadow: 'inset 0px 0px 6px 2px #00000033',
		position: 'absolute',
	},

	backLayer: {
		height: '100%',
		aspectRatio: '1 / 1',
		boxSizing: 'border-box',
		position: 'absolute',
		borderRadius: '7%',
		overflow: 'hidden',
		filter: 'brightness(0.85)',
		outline: '1px solid transparent',
		transform: 'translateZ(0)',
	},

	topLayerStyles: {
		width: '92%',
		aspectRatio: '1 / 1',
		top: '2.3%',
		left: '5.2%',
		position: 'absolute',
		borderRadius: '5%',
		overflow: 'hidden',
		outline: '1px solid transparent',
		transform: 'translateZ(0)',
		willChange: 'transform',
		'-webkit-perspective': 1000,
		'-webkit-backface-visibility': 'hidden',
		'-webkit-font-smoothing': 'antialiased',
		'-moz-osx-font-smoothing': 'grayscale',
	},

	topLayerSvg: {
		borderRadius: '5%',
	},

	preview: {
		height: 'min(11dvh, 8dvw)',
		aspectRatio: '1 / 1',
		zIndex: 6,
		cursor: 'grabbing',
	},
	previewExLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			height: '12dvmin',
		},
	},
	previewPortrait: {
		'@media (max-aspect-ratio: 1)': {
			height: 'min(11dvw, 8dvh)',
		},
	},
});
