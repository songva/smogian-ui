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

const Block: React.FC<BlockProps> = props => {
	const { colors, dragRef, rotateStyle, dndStyle, onDoubleTap, onWheelScroll } = useBlock(props);
	const onClick = props.onClick || onDoubleTap;

	return (
		<div ref={dragRef} style={dndStyle} className={css(styles.block)} onWheel={onWheelScroll} onClick={onClick}>
			<div style={rotateStyle} className={css(styles.backLayer)}>
				<svg className={css(styles.backLayerSvg)} viewBox="0,0,100,100">
					<path d="M0,0L0,100L1,100L71,29Z" fill={colors[PatternDirection.LEFT]} />
					<path d="M0,100L100,100L70,30Z" fill={colors[PatternDirection.BOTTOM]} />
					<path d="M99,100L100,100L100,0L99,0L70,30Z" fill={colors[PatternDirection.RIGHT]} />
					<path d="M100,0L0,0L0,1L70,30Z" fill={colors[PatternDirection.TOP]} />
				</svg>
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
		</div>
	);
};

export default Block;
