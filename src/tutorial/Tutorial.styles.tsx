import { StyleSheet } from 'aphrodite/no-important';

const grabKeyframe = {
	'0%': {
		opacity: 0,
	},
	'10%': {
		opacity: 0,
	},
	'11%': {
		opacity: 1,
	},
	'90%': {
		opacity: 1,
	},
	'91%': {
		opacity: 0,
	},
	'100%': {
		opacity: 0,
	},
};

const dropKeyframe = {
	'0%': {
		opacity: 1,
	},
	'10%': {
		opacity: 1,
	},
	'11%': {
		opacity: 0,
	},
	'90%': {
		opacity: 0,
	},
	'91%': {
		opacity: 1,
	},
	'100%': {
		opacity: 1,
	},
};

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: '#000000cc',
		height: '100dvh',
		width: '100dvw',
		position: 'absolute',
		zIndex: 10,
		clipPath: 'url(#sample-clip)',
		transitionProperty: 'opacity',
		transitionDuration: '500ms',
		top: 0,
	},
	overlayDismissal: {
		opacity: 0,
		pointerEvents: 'none',
	},
	skipButton: {
		top: '1dvmin',
		left: '1dvmin',
		height: '9dvmin',
		aspectRatio: '1 / 1',
		position: 'absolute',
		cursor: 'pointer',
		zIndex: 11,
		userSelect: 'none',
	},
	grabAnimation: {
		animationName: grabKeyframe,
	},
	dropAnimation: {
		animationName: dropKeyframe,
	},

	strokeStyle: {
		stroke: 'white',
		fill: 'none',
		strokeWidth: '3px',
	},
	roundStrokeStyle: {
		stroke: 'white',
		fill: 'none',
		strokeWidth: '3px',
		strokeLinecap: 'round',
	},
	fillStyle: {
		fill: '#00000099',
	},
	dndAnimationStyle: {
		animationDuration: '2s',
		animationIterationCount: 'infinite',
		animationDelay: '0.0125s',
	},
	staticSvg: {
		height: '8dvmax',
		aspectRatio: '1 / 1',
		position: 'absolute',
		zIndex: 12,
		pointerEvents: 'none',
	},
	motionSvg: {
		height: '8dvmax',
		aspectRatio: '1 / 1',
		position: 'absolute',
		zIndex: 12,
		pointerEvents: 'none',
		animationDuration: '2s',
		animationIterationCount: 'infinite',
	},
});

export default styles;
