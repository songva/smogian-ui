import { StyleSheet } from 'aphrodite/no-important';

const toastKeyframes = {
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
};

const styles = StyleSheet.create({
	stagePanel: {
		justifyContent: 'center',
		display: 'grid',
		gridGap: '1px',
		backgroundColor: '#e4e4e4',
		zIndex: 3,
		border: '1px solid white',
		borderRadius: '0.8vmin',
		boxShadow: '-0.1vmin 0.1vmin 0vmin 0.4vmin #00000030',
		backgroundImage:
			'linear-gradient(to bottom, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
		backgroundSize: 'calc(min(11dvh, 8dvw) + 1px) calc(min(11dvh, 8dvw) + 1px)',
		backgroundPosition: '-1px -1px',
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	stagePanelLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			backgroundSize: 'calc(12dvmin + 1px) calc(12dvmin + 1px)',
		},
	},
	stagePanelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			backgroundSize: 'calc(min(11dvw, 8dvh) + 1px) calc(min(11dvw, 8dvh) + 1px)',
			gridTemplateColumns: 'repeat(6, 1fr)',
		},
	},
	stagePanelDark: {
		backgroundColor: '#333333',
		border: '1px solid #282828',
		backgroundImage:
			'linear-gradient(to bottom, #282828 1px, transparent 1px), linear-gradient(to right, #282828 1px, transparent 1px)',
		filter: 'brightness(1.25)',
	},

	bumperPortrait: {
		'@media (max-aspect-ratio: 1)': {
			gridRow: 2,
			justifySelf: 'center',
		},
	},
	bumperLandscape: {
		'@media (min-aspect-ratio: 1)': {
			gridColumn: 2,
			justifySelf: 'left',
		},
	},
	bumperExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			justifySelf: 'center',
		},
	},

	benchPanel: {
		justifySelf: 'right',
	},
	benchPanelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			gridRow: 3,
			justifySelf: 'center',
		},
	},
	benchPanelExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			gridColumn: 3,
			justifySelf: 'left',
		},
	},
	benchGrid: {
		display: 'grid',
		gridGap: '2dvmin',
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	benchGridPortrait: {
		'@media (max-aspect-ratio: 1)': {
			gridTemplateColumns: 'repeat(6, 1fr)',
		},
	},

	hiddenPanelLandscape: {
		'@media (min-aspect-ratio: 1)': {
			display: 'grid',
			alignItems: 'center',
			gridTemplateColumns:
				'calc((100dvw - min(144dvh, 84dvw)) / 2 + 0.5dvh) auto auto calc((100dvw - min(144dvh, 84dvw)) / 2 + 0.5dvh)',
			height: '90dvh',
		},
	},
	hiddenPanelExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			gridTemplateColumns: 'calc(50dvw - 56dvmin) 6fr 4fr',
			height: '100dvh',
		},
	},
	hiddenPanelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			display: 'grid',
			alignItems: 'center',
			height: 'calc(100dvh - 8dvw)',
			gridTemplateRows: '4dvw repeat(2, 1fr) 4dvw',
			justifyContent: 'center',
		},
	},
	hiddenPanelExPortrait: {
		'@media (max-aspect-ratio: 3 / 5)': {
			gridTemplateRows: '0 1fr auto 30dvmin',
		},
	},
	hiddenPanelIPhoneChromeOverride: {
		'@media (min-aspect-ratio: 2)': {
			gridTemplateColumns: 'calc(50dvw - 53dvmin) 24fr 13fr',
			height: '100dvh',
		},
	},
	hiddenPanelIPhoneSafariOverride: {
		'@media (min-aspect-ratio: 2)': {
			gridTemplateColumns: 'calc(50dvw - 56dvmin) 4fr 3fr',
			height: '100dvh',
		},
	},
	overlay: {
		position: 'fixed',
		width: '100dvw',
		height: '100dvh',
		top: '0px',
		left: '0px',
		zIndex: 5,
		userSelect: 'none',
	},
	toast: {
		position: 'relative',
		opacity: 0,
		animationName: toastKeyframes,
		animationDelay: '3s',
		animationDuration: '2s',
		animationFillMode: 'forwards',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		zIndex: 6,
	},

	replayIcon: {
		display: 'inline-block',
		position: 'absolute',
		zIndex: 6,
		width: '10dvmin',
		cursor: 'pointer',
		opacity: 0,
		translate: '0 10px',
		animationName: toastKeyframes,
		animationDelay: '5s',
		animationDuration: '2s',
		animationFillMode: 'forwards',
	},
	replaySvgPath: {
		stroke: 'black',
		fill: 'none',
		strokeWidth: '1.3dvmin',
	},
	replaySvgPathDark: {
		stroke: '#a2a2a280',
	},
});
export default styles;
