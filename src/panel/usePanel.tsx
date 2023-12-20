import { useContext, useEffect } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { DebouncedFunc, throttle } from 'lodash';
import { BlockList, BumperAnimation, BumperColorAndCoordinates, StageOrientationLock } from '../common/interfaces';
import {
	StagedContext,
	BenchContext,
	BumperContext,
	ThemeContext,
	ThemeContextProps,
	BumperContextProps,
	BlockContextProps,
	OrientationContextProps,
	OrientationContext,
} from '../common/contexts';
import { macMahon } from '../common/constants';

type usePanelProps = { isStage?: boolean } | undefined;

interface usePanelReturn {
	blockList: BlockList;
	onWheelScroll: DebouncedFunc<(deltaY: number, func: (event: number) => void) => void>;
	bumper: BumperColorAndCoordinates;
	palettes: string;
	isLandscape: boolean;
	dummyDrop: ConnectDropTarget;
	darkTheme: boolean;
	stageOrientationLock: StageOrientationLock;
}

const usePanel = (props?: usePanelProps): usePanelReturn => {
	const blockContext = props?.isStage ? StagedContext : BenchContext;
	const { blockList } = useContext<BlockContextProps>(blockContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { palettes } = useContext<ThemeContextProps>(ThemeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { darkTheme } = useContext<ThemeContextProps>(ThemeContext);

	const onWheelScroll = throttle(
		(deltaY: number, func: (event: number) => void) => {
			func(deltaY);
		},
		300,
		{ trailing: false }
	);

	useEffect(() => {
		if (bumper.animationName === BumperAnimation.EMPTY) {
			return;
		}
		setTimeout(() => {
			bumper.animationName === BumperAnimation.PAINT &&
				setBumper({ ...bumper, bumperColor: bumper.newBumperColor, animationName: BumperAnimation.EMPTY });
		}, 350);
	}, [bumper.animationName, bumper, setBumper]);

	useEffect(() => {}, [isLandscape]);

	const [, dummyDrop] = useDrop(() => ({
		accept: macMahon,
	}));

	return {
		blockList,
		onWheelScroll,
		bumper,
		palettes,
		isLandscape,
		stageOrientationLock,
		darkTheme,
		dummyDrop,
	};
};

export default usePanel;
