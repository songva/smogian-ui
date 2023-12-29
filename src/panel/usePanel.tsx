import { useContext, useEffect, useRef } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { DebouncedFunc, sample, shuffle, throttle } from 'lodash';
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
	AnchorLegConextProps,
	AnchorLegContext,
	TutorialContext,
	TutorialContextProps,
} from '../common/contexts';
import { blockSet, macMahon, toasts } from '../common/constants';

type usePanelProps = { isStage?: boolean } | undefined;

interface usePanelReturn {
	blockList: BlockList;
	onWheelScroll: DebouncedFunc<(deltaY: number, func: (event: number) => void) => void>;
	bumper: BumperColorAndCoordinates;
	palettes: string;
	isLandscape: boolean;
	stageOrientationLock: StageOrientationLock;
	darkTheme: boolean;
	anchorLeg: number;
	toast: string;
	dummyDrop: ConnectDropTarget;
	reloadPage: () => void;
}

const usePanel = (props?: usePanelProps): usePanelReturn => {
	const { setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const { setBlockList: setStageBlockList } = useContext<BlockContextProps>(StagedContext);
	const blockContext = props?.isStage ? StagedContext : BenchContext;
	const { blockList } = useContext<BlockContextProps>(blockContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { palettes } = useContext<ThemeContextProps>(ThemeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { darkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { anchorLeg, setAnchorLeg } = useContext<AnchorLegConextProps>(AnchorLegContext);
	const { tutorialStep, setTutorialStep } = useContext<TutorialContextProps>(TutorialContext);
	const toast = useRef<string>(sample(toasts) || '');

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
	useEffect(() => {
		toast.current = sample(toasts) || '';
	}, [anchorLeg]);

	const [, dummyDrop] = useDrop(() => ({
		accept: macMahon,
	}));

	const reloadPage = () => {
		setBenchBlockList(shuffle(blockSet));
		setStageBlockList(Array(24).fill(undefined));
		setAnchorLeg(NaN);
		setBumper({
			x: 0,
			y: 0,
			newBumperColor: undefined,
			animationName: BumperAnimation.FADE,
		});
		tutorialStep > 0 && setTutorialStep(2);
	};

	return {
		blockList,
		onWheelScroll,
		bumper,
		palettes,
		isLandscape,
		stageOrientationLock,
		darkTheme,
		anchorLeg,
		toast: toast.current,
		dummyDrop,
		reloadPage,
	};
};

export default usePanel;
