import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { macMahon } from '../common/constants';
import useOrientation from '../common/useOrientation';
import {
	BenchContext,
	BlockContextProps,
	BumperContext,
	BumperContextProps,
	KidsModeContext,
	KidsModeContextProps,
	OrientationContext,
	OrientationContextProps,
	StagedContext,
} from '../common/contexts';
import seatService from '../seat/seatService';
import { BlockProps } from '../block/Block';
import useLocalStorage from '../common/useLocalStorage';

type useHiddenPanelReturn = {
	anchorLeg: number;
	setAnchorLeg: Dispatch<SetStateAction<number>>;
	dummyRef: ConnectDropTarget;
};

const useHiddenPanel = (): useHiddenPanelReturn => {
	useOrientation();
	const { blockList: stagedBlockList, setBlockList: setStagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const { blockList: benchBlockList, setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const [anchorLeg, setAnchorLeg] = useState<number>(NaN);

	const { updateSeat } = seatService;
	const [, dummyRef] = useDrop(
		{
			accept: macMahon,
			drop: (item: BlockProps, monitor) => {
				const seatNumber = benchBlockList.indexOf(undefined);
				if (!item.isStage || seatNumber < 0 || monitor.didDrop()) {
					return;
				}
				const updatedSeat = updateSeat({
					item,
					kidsMode,
					isLandscape,
					stageOrientationLock,
					seat: { seatNumber, isStage: false },
					bumper,
					stagedBlockList,
					benchBlockList,
				});
				if (updatedSeat) {
					const { updatedBumper, updatedBenchBlockList, updatedStagedBlockList } = updatedSeat;
					updatedBumper && setBumper(updatedBumper);
					updatedBenchBlockList && setBenchBlockList(updatedBenchBlockList);
					updatedStagedBlockList && setStagedBlockList(updatedStagedBlockList);
				}
			},
		},
		[benchBlockList, stagedBlockList, bumper]
	);

	return { anchorLeg, setAnchorLeg, dummyRef };
};

export default useHiddenPanel;
