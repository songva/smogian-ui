import { StyleSheet } from 'aphrodite/no-important';
import { TransitionDuration } from '../common/interfaces';

export default StyleSheet.create({
	block: {
		position: 'relative',
		height: '100%',
		width: '100%',
		userSelect: 'none',
		transform: 'translate3d(0, 0, 0)',
		'-webkit-tap-highlight-color': 'transparent',
	},

	blockBackgrounds: {
		position: 'absolute',
		height: '100%',
		aspectRatio: '1 / 1',
	},

	shadow: {
		borderRadius: '7%',
		transitionDuration: TransitionDuration.STATIC,
		transform: 'rotate(0deg)',
		boxShadow: 'inset 0px 0px 6px 2px #00000050',
		height: '100%',
	},

	backLayer: {
		height: '100%',
		boxSizing: 'border-box',
		position: 'absolute',
		aspectRatio: '1 / 1',
		borderRadius: '7%',
		overflow: 'hidden',
		outline: '1px solid transparent',
		'-webkit-backface-visibility': 'hidden',
		transform: 'translateZ(0)',
		willChange: 'transform',
		'-webkit-perspective': 1000,
	},

	topLayerStyles: {
		top: '2.5%',
		left: '5%',
		position: 'absolute',
		width: '92%',
		height: '92%',
	},

	topLayerSvg: {
		borderRadius: '5%',
	},

	preview: {
		height: 'min(11dvh, 8dvw)',
		aspectRatio: '1 / 1',
		zIndex: 3,
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
