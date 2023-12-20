import { CSSProperties, FC, memo } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ThrottleContext } from '../common/contexts';
import usePanel from './usePanel';
import Seat from '../seat/Seat';
import { StageOrientationLock } from '../common/interfaces';
import { darkBumperColor, ligthBumperColor, palettesMap } from '../common/constants';

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

const panelStyle: CSSProperties = {
	justifyContent: 'center',
	display: 'grid',
	gridGap: '0.2dvmin',
	backgroundColor: 'white',
	position: 'relative',
	zIndex: 3,
	border: '0.3dvmin solid white',
	borderRadius: '0.8vmin',
	boxShadow: '-0.1vmin 0.1vmin 0vmin 0.4vmin #00000030',
};
const darkPanelStyle: CSSProperties = {
	backgroundColor: '#282828',
	border: '0.4dvmin solid #282828',
	filter: 'brightness(1.25)',
};

const stageLandscapeOverrideStyle: CSSProperties = {
	gridTemplateColumns: 'repeat(6, 1fr)',
};
const stagePortraitOverrideStyle: CSSProperties = {
	gridTemplateColumns: 'repeat(4, 1fr)',
};

const styles = StyleSheet.create({
	portraitPanel: {
		'@media (max-aspect-ratio: 1)': {
			gridRow: 2,
			justifySelf: 'center',
		},
	},
	landscapePanel: {
		'@media (min-aspect-ratio: 1)': {
			gridColumn: 2,
			justifySelf: 'left',
		},
	},
	exLandscapePanel: {
		'@media (min-aspect-ratio: 2)': {
			justifySelf: 'center',
		},
	},
	portraitGrid: {
		'@media (max-aspect-ratio: 1)': {
			gridTemplateColumns: 'repeat(6, 1fr)',
		},
	},
	landscapeGrid: {
		'@media (min-aspect-ratio: 1)': {
			gridTemplateColumns: 'repeat(4, 1fr)',
		},
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
			className={css(styles.landscapePanel, styles.portraitPanel, styles.exLandscapePanel)}
		>
			<div
				style={{ ...panelStyle, ...stageLockStyle, ...(darkTheme && darkPanelStyle) }}
				className={css(styles.landscapeGrid, styles.portraitGrid)}
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

					@keyframes paintKeyframes {
						from {
							--radial-percentage : 0%;
						}
						to {
							--radial-percentage: 100%;
						}
					}

					@keyframes fadeKeyframes {
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
