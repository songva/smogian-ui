import { useContext } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
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
	ThemeContext,
	ThemeContextProps,
} from '../common/contexts';
import { macMahon } from '../common/constants';
import seatService from './seatService';
import { BlockProps } from '../block/Block';

interface useSeatProps {
	seatNumber: number;
	isStage: boolean;
}

type useSeatReturn = {
	dropRef: ConnectDropTarget;
	darkTheme: boolean;
};

const useSeat: (props: useSeatProps) => useSeatReturn = ({ seatNumber, isStage }) => {
	const { blockList: stagedBlockList, setBlockList: setStagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const { blockList: benchBlockList, setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { darkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { updateSeat } = seatService;

	const [, dropRef] = useDrop(
		() => ({
			accept: macMahon,
			drop: (item: BlockProps) => {
				console.warn(
					`from ${item.isStage ? 'stage' : 'unstage'}, @ ${item.index}, to ${
						isStage ? 'stage' : 'unstage'
					} @ ${seatNumber}`
				);
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
				}
			},
		}),
		[isStage, seatNumber, stagedBlockList, benchBlockList, bumper]
	);
	return { dropRef, darkTheme };
};

export default useSeat;
