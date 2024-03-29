import { FC } from 'react';
import { css } from 'aphrodite/no-important';
import { PatternDirection } from '../common/enums';
import useBlock from './useBlock';
import styles from './Block.style';
import { backLayerClips, frontLayerClips } from '../common/constants';
import { BlockProps, ClipProps } from './Block.types';

const FrontLayerClip: FC<ClipProps> = ({ direction, colors }) => (
	<div
		className={css(styles.blockBackgrounds)}
		style={{
			backgroundColor: colors[direction],
			clipPath: frontLayerClips[direction],
		}}
	/>
);

const BackLayerClip: FC<ClipProps> = ({ direction, colors, backLayerStyle }) => (
	<div
		className={css(styles.blockBackgrounds)}
		style={{
			backgroundColor: colors[direction],
			clipPath: backLayerClips[direction],
			...backLayerStyle,
		}}
	/>
);

const Block: FC<BlockProps> = props => {
	const { id, colors, dragRef, rotateStyle, dndStyle, backLayerStyle } = useBlock(props);

	return (
		<div {...id} ref={dragRef} style={dndStyle} className={css(styles.block)}>
			<div style={rotateStyle} className={css(styles.backLayer)}>
				<BackLayerClip colors={colors} backLayerStyle={backLayerStyle} direction={PatternDirection.TOP} />
				<BackLayerClip colors={colors} backLayerStyle={backLayerStyle} direction={PatternDirection.BOTTOM} />
				<BackLayerClip colors={colors} backLayerStyle={backLayerStyle} direction={PatternDirection.LEFT} />
				<BackLayerClip colors={colors} backLayerStyle={backLayerStyle} direction={PatternDirection.RIGHT} />
				<div className={css(styles.shadow)} />
			</div>
			<div style={rotateStyle} className={css(styles.topLayerStyles)}>
				<FrontLayerClip colors={colors} direction={PatternDirection.TOP} />
				<FrontLayerClip colors={colors} direction={PatternDirection.BOTTOM} />
				<FrontLayerClip colors={colors} direction={PatternDirection.LEFT} />
				<FrontLayerClip colors={colors} direction={PatternDirection.RIGHT} />
			</div>
		</div>
	);
};

export default Block;
