import { FC } from 'react';
import { usePreview } from 'react-dnd-preview';
import { css } from 'aphrodite/no-important';

import { BlockProps } from './Block.types';
import Block from './Block';
import styles from './Block.style';

const BlockPreview: FC = () => {
	const preview = usePreview();
	if (preview.display && preview.monitor.getItem()) {
		const { seatNumber, isStage, pattern } = preview.monitor.getItem<BlockProps>();
		return (
			<div style={preview.style} className={css(styles.preview, styles.previewExLandscape, styles.previewPortrait)}>
				<Block seatNumber={seatNumber} isStage={isStage} pattern={pattern} />
			</div>
		);
	}
	return <></>;
};

export default BlockPreview;
