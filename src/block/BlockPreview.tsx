import { CSSProperties, FC } from 'react';
import { usePreview } from 'react-dnd-preview';
import Block, { BlockProps } from './Block';

const previewStyle: CSSProperties = {
	height: '11dvmin',
	aspectRatio: '1 / 1',
	zIndex: 3,
};

const BlockPreview: FC = () => {
	const preview = usePreview();
	if (preview.display && preview.monitor.getItem()) {
		const { index, isStage, pattern } = preview.monitor.getItem<BlockProps>();
		return (
			<div style={{ ...previewStyle, ...preview.style }}>
				<Block index={index} isStage={isStage} pattern={pattern} />
			</div>
		);
	}
	return <></>;
};

export default BlockPreview;
