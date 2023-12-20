import { CSSProperties, FC, memo } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ThrottleContext } from '../common/contexts';
import { BumperAnimation, StageOrientationLock } from '../common/interfaces';
import { darkBumperColor, ligthBumperColor, palettesMap } from '../common/constants';
import usePanel from './usePanel';
import Seat from '../seat/Seat';

const bumperStyle: CSSProperties = {
	position: 'relative',
	animationFillMode: 'forwards',
	animationTimingFunction: 'ease-out',
	display: 'grid',
	padding: '5vmin',
	borderRadius: '4vmin',
	boxShadow: '#00000030 0.1vmin -0.1vmin 0vmin 0.6vmin inset',
};
const darkBumperStyle: CSSProperties = {
	backgroundColor: darkBumperColor,
	boxShadow: '#00000060 0.1vmin -0.1vmin 0vmin 0.6vmin inset',
	filter: 'brightness(0.8)',
};

const stageLandscapeOverrideStyle: CSSProperties = {
	gridTemplateColumns: 'repeat(6, 1fr)',
};
const stagePortraitOverrideStyle: CSSProperties = {
	gridTemplateColumns: 'repeat(4, 1fr)',
};

const styles = StyleSheet.create({
	panel: {
		justifyContent: 'center',
		display: 'grid',
		gridGap: '1px',
		backgroundColor: '#e4e4e4',
		position: 'relative',
		zIndex: 3,
		border: '0.3dvmin solid white',
		borderRadius: '0.8vmin',
		boxShadow: '-0.1vmin 0.1vmin 0vmin 0.4vmin #00000030',
		backgroundImage:
			'linear-gradient(to bottom, white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
		backgroundSize: 'calc(min(11dvh, 8dvw) + 1px) calc(min(11dvh, 8dvw) + 1px)',
		backgroundPosition: '-1px -1px',
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	panelLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			backgroundSize: 'calc(12dvmin + 1px) calc(12dvmin + 1px)',
		},
	},
	panelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			backgroundSize: 'calc(min(11dvw, 8dvh) + 1px) calc(min(11dvw, 8dvh) + 1px)',
			gridTemplateColumns: 'repeat(6, 1fr)',
		},
	},
	panelDark: {
		backgroundColor: '#333333',
		border: '0.4dvmin solid #282828',
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
	portraitGrid: {
		'@media (max-aspect-ratio: 1)': {},
	},
	landscapeGrid: {
		'@media (min-aspect-ratio: 1)': {},
	},
});

const StagePanel: FC = () => {
	const { blockList, onWheelScroll, bumper, palettes, stageOrientationLock, darkTheme, dummyDrop } = usePanel({
		isStage: true,
	});
	const bumperColor = darkTheme ? darkBumperColor : ligthBumperColor;
	const animationDuration = (bumper.x || 0) > 100 || (bumper.y || 0) > 100 ? '900ms' : '400ms';
	const animationStyle: CSSProperties = {
		backgroundImage: `radial-gradient(circle at ${bumper.x}% ${bumper.y}%, ${
			bumper.newBumperColor !== undefined ? palettesMap[palettes][bumper.newBumperColor] : bumperColor
		} var(--radial-percentage), ${
			bumper.bumperColor !== undefined ? palettesMap[palettes][bumper.bumperColor] : bumperColor
		} 0%)`,
		backgroundColor: bumperColor,
		animationName: bumper.animationName,
		animationDuration,
	};

	const stageLockStyle =
		stageOrientationLock === StageOrientationLock.UNLOCKED
			? {}
			: stageOrientationLock === StageOrientationLock.LANDSCAPE
			? stageLandscapeOverrideStyle
			: stagePortraitOverrideStyle;

	return (
		<section
			ref={dummyDrop}
			style={{ ...bumperStyle, ...animationStyle, ...(darkTheme && darkBumperStyle) }}
			className={css(styles.bumperLandscape, styles.bumperPortrait, styles.bumperExLandscape)}
		>
			<div
				style={stageLockStyle}
				className={css(styles.panel, styles.panelPortrait, styles.panelLandscape, darkTheme && styles.panelDark)}
			>
				<ThrottleContext.Provider value={onWheelScroll}>
					{blockList.map((item, index) => (
						<Seat key={`stage-${index}`} seatNumber={index} occupier={item} isStage isLandscape />
					))}
				</ThrottleContext.Provider>
			</div>
			<style>
				{`@property --radial-percentage {
						syntax: "<percentage>";
						inherits: false;
						initial-value: 1%;
					}

					@keyframes ${BumperAnimation.PAINT} {
						from {
							--radial-percentage : 0%;
						}
						to {
							--radial-percentage: 100%;
						}
					}

					@keyframes ${BumperAnimation.FADE} {
						from {
							--radial-percentage : 100%;
						}
						to {
							--radial-percentage: 0%;
						}
					}`}
			</style>
		</section>
	);
};
export default memo(StagePanel);
