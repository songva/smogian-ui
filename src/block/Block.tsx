import { css } from 'aphrodite/no-important';
import { Palettes, Pattern, PatternDirection } from '../common/interfaces';
import useBlock from './useBlock';
import styles from './Block.style';

export interface BlockProps {
	index: number;
	pattern: Pattern;
	isStage: boolean;
	overrideStyles?: string[];
	palettes?: Palettes;
	onClick?: () => void;
}

const clockwiseKeyframes = {
	from: {
		x: 70,
	},
};

const Block: React.FC<BlockProps> = props => {
	const { colors, dragRef, rotateStyle, dndStyle, backgroundStyle, onDoubleTap, onWheelScroll } = useBlock(props);
	const onClick = props.onClick || onDoubleTap;

	return (
		<div ref={dragRef} style={dndStyle} className={css(styles.block)} onWheel={onWheelScroll} onClick={onClick}>
			<div style={rotateStyle} className={css(styles.backLayer)}>
				<div
					key="block-back-top"
					className={css(styles.blockBackgrounds)}
					style={{
						backgroundColor: colors[PatternDirection.TOP],
					}}
				/>
				<div
					key="block-back-bottom"
					className={css(styles.blockBackgrounds)}
					style={{
						backgroundColor: colors[PatternDirection.BOTTOM],
						clipPath: `polygon(0% 100%, 0% var(--position-y-percentage), 100% var(--position-y-percentage), 100% 100%)`,
						...backgroundStyle,
					}}
				/>
				<div
					key="block-back-left"
					className={css(styles.blockBackgrounds)}
					style={{
						backgroundColor: colors[PatternDirection.LEFT],
						clipPath: `polygon(0% 0%, var(--position-x-percentage) var(--position-y-percentage), 0% 100%)`,
						...backgroundStyle,
					}}
				/>
				<div
					key="block-back-right"
					className={css(styles.blockBackgrounds)}
					style={{
						backgroundColor: colors[PatternDirection.RIGHT],
						clipPath: `polygon(100% 0%, var(--position-x-percentage) var(--position-y-percentage), 100% 100%)`,
						...backgroundStyle,
					}}
				/>
				<div className={css(styles.shadow)} />
			</div>
			<div style={rotateStyle} className={css(styles.topLayerStyles)}>
				<svg className={css(styles.topLayerSvg)} viewBox="0,0,100,100">
					<path d="M1,0L0,0L0,100L1,100L51,50Z" fill={colors[PatternDirection.LEFT]} />
					<path d="M99,100L100,100L100,0L99,0L50,49L50,51Z" fill={colors[PatternDirection.RIGHT]} />
					<path d="M0,100L100,100L50,50Z" fill={colors[PatternDirection.BOTTOM]} />
					<path d="M100,0L0,0L50,50Z" fill={colors[PatternDirection.TOP]} />
				</svg>
			</div>

			<style>
				{`@property --position-x-percentage {
						syntax: "<percentage>";
						inherits: false;
						initial-value: 70%;
					}

					@property --position-y-percentage {
						syntax: "<percentage>";
						inherits: false;
						initial-value: 30%;
					}

					@keyframes clockwiseKeyframes {
						from {
							--position-x-percentage : 70%;
						}
						to {
							--position-x-percentage: 30%;
						}
					}

					@keyframes antiClockwiseKeyframes {
						from {
							--position-y-percentage : 30%;
						}
						to {
							--position-y-percentage: 70%;
						}
					}`}
			</style>
		</div>
	);
};

export default Block;
