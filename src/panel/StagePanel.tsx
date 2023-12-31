import { CSSProperties, FC, memo } from 'react';
import { css } from 'aphrodite/no-important';
import { ThrottleContext } from '../common/contexts';
import { StageOrientationLock } from '../common/interfaces';
import { darkBumperColor, lightBumperColor, palettesMap } from '../common/constants';
import usePanel from './usePanel';
import Seat from '../seat/Seat';
import styles from './Panel.style';

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

const StagePanel: FC = () => {
	const { blockList, onWheelScroll, bumper, palettes, stageOrientationLock, darkTheme, dummyDrop } = usePanel({
		isStage: true,
	});
	const bumperColor = darkTheme ? darkBumperColor : lightBumperColor;
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
				className={css(
					styles.stagePanel,
					styles.stagePanelPortrait,
					styles.stagePanelLandscape,
					darkTheme && styles.stagePanelDark
				)}
			>
				<ThrottleContext.Provider value={onWheelScroll}>
					{blockList.map((item, index) => (
						<Seat key={`stage-${index}`} seatNumber={index} occupier={item} isStage isLandscape />
					))}
				</ThrottleContext.Provider>
			</div>
		</section>
	);
};
export default memo(StagePanel);
