import { useContext } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';

import { PatternOrientation } from '../common/enums';
import { macMahon } from '../common/constants';
import {
	AnchorLegContext,
	BenchContext,
	BumperContext,
	KidsModeContext,
	OrientationContext,
	StagedContext,
} from '../common/contexts';
import {
	AnchorLegConextProps,
	BlockContextProps,
	BumperContextProps,
	KidsModeContextProps,
	OrientationContextProps,
} from '../common/common.types';

import seatService from './seatService';
import { BlockProps } from '../block/Block.types';

interface useSeatProps {
	seatNumber: number;
	isStage: boolean;
}

type useSeatReturn = {
	id?: { id: string };
	dropRef: ConnectDropTarget;
};

const useSeat: (props: useSeatProps) => useSeatReturn = ({ seatNumber, isStage }) => {
	const { blockList: stagedBlockList, setBlockList: setStagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const { blockList: benchBlockList, setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { setAnchorLeg } = useContext<AnchorLegConextProps>(AnchorLegContext);
	const { updateSeat, getDimension } = seatService;

	const [, dropRef] = useDrop(
		() => ({
			accept: macMahon,
			drop: (item: BlockProps) => {
				/**
				 keep it as needed for redo or moves counting 
				 console.warn(
					`from ${item.isStage ? 'stage' : 'unstage'}, @ ${item.seatNumber}, to ${
						isStage ? 'stage' : 'unstage'
					} @ ${seatNumber}`
				); 
				*/
				const updatedSeat = updateSeat({
					item,
					kidsMode,
					isLandscape,
					stageOrientationLock,
					seat: { seatNumber, isStage },
					bumper,
					stagedBlockList,
					benchBlockList,
				});
				if (updatedSeat) {
					const { updatedBumper, updatedBenchBlockList, updatedStagedBlockList } = updatedSeat;
					updatedBumper && setBumper(updatedBumper);
					updatedBenchBlockList && setBenchBlockList(updatedBenchBlockList);
					updatedStagedBlockList && setStagedBlockList(updatedStagedBlockList);
					if (updatedStagedBlockList.filter(stagedBlock => stagedBlock).length === 24) {
						setAnchorLeg(seatNumber);
					} else {
						setAnchorLeg(NaN);
					}
				}
			},
		}),
		[isStage, seatNumber, stagedBlockList, benchBlockList, bumper]
	);

	const stageWidth = getDimension({ isLandscape, stageOrientationLock }).columnSpan;
	const seatOrientation = isStage
		? seatNumber === 0
			? PatternOrientation.TOP_LEFT
			: seatNumber === stageWidth - 1
			? PatternOrientation.TOP_RIGHT
			: seatNumber === 24 - stageWidth
			? PatternOrientation.BOTTOM_LEFT
			: seatNumber === 23
			? PatternOrientation.BOTTOM_RIGHT
			: undefined
		: undefined;
	const id = seatOrientation && { id: `seat-${seatOrientation}` };
	return { id, dropRef };
};

export default useSeat;
