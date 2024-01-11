import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	seat: {
		borderRadius: '0.8vmin',
		height: 'min(11dvh, 8dvw)',
		aspectRatio: '1 / 1',
		userSelect: 'none',
	},
	seatExLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			height: '12dvmin',
		},
	},
	seatPortrait: {
		'@media (max-aspect-ratio: 1)': {
			height: 'min(11dvw, 8dvh)',
		},
	},
});

export default styles;
