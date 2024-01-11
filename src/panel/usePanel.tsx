import { lazy, useContext, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { sample, shuffle, throttle } from 'lodash';

import { BumperAnimation } from '../common/enums';
import {
	StagedContext,
	BenchContext,
	BumperContext,
	ThemeContext,
	OrientationContext,
	AnchorLegContext,
	TutorialContext,
} from '../common/contexts';
import { blockSet, macMahon, toasts } from '../common/constants';

import {
	AnchorLegConextProps,
	BlockContextProps,
	BumperContextProps,
	OrientationContextProps,
	ThemeContextProps,
	TutorialContextProps,
} from '../common/common.types';
import { usePanelProps, usePanelReturn } from './Panel.types';

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
		Toast: lazy(() => import('../toast/Toast')),
	};
};

export default usePanel;
