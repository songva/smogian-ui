import { useContext, useEffect } from 'react';
import { landscapeDimension, protraitDimension } from './constants';
import { rotateClockwise, rotateAntiClockwise } from './utils';
import {
	BenchContext,
	BlockContextProps,
	OrientationContext,
	OrientationContextProps,
	StagedContext,
} from './contexts';
import { BlockList, StageOrientationLock } from './interfaces';
import usePrevious from './usePrevious';

export enum OrientationValue {
	'landscape-primary' = 0,
	'portrait-primary' = 90,
	'landscape-secondary' = 180,
	'portrait-secondary' = -90,
}

interface RotateProps {
	isClockwise: boolean;
	isPanelLandscape: boolean;
	originList: BlockList;
}

const getRatio = (): number => {
	if (window.navigator.userAgent.toLowerCase().indexOf('crios') > -1) {
		return window.outerWidth / window.outerHeight;
	}
	return window.innerWidth / window.innerHeight;
};

const rotateBlockList: (props: RotateProps) => BlockList = ({ isClockwise, isPanelLandscape, originList }) => {
	const dimension = isPanelLandscape ? landscapeDimension : protraitDimension;

	const formula = isClockwise
		? (num: number) => (dimension.row - (num % dimension.row) - 1) * dimension.column + Math.floor(num / dimension.row)
		: (num: number) => ((num % dimension.row) + 1) * dimension.column - Math.floor(num / dimension.row) - 1;

	const rotateMethod = isClockwise ? rotateClockwise : rotateAntiClockwise;

	return Array(24)
		.fill(0)
		.map((i, index) => originList[formula(index)])
		.map(block => rotateMethod(block));
};

const useOrientation = () => {
	const { isLandscape, orientation, stageOrientationLock, setOrientation, setRatio } =
		useContext<OrientationContextProps>(OrientationContext);
	const { blockList: stagedBlockList, setBlockList: setStagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const { blockList: benchBlockList, setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const prevStageOrientationLock = usePrevious(stageOrientationLock);

	const updateOrientation: (event: Event) => void = ({ target }) => {
		const newOrientation = OrientationValue[(target as ScreenOrientation).type];
		if (orientation === newOrientation) {
			return;
		}

		const isClockwise =
			navigator.userAgent.toLowerCase().indexOf('iphone') > -1
				? orientation - newOrientation === 90
				: newOrientation - orientation === 90;

		const rotatedBenchBlockList = rotateBlockList({
			isClockwise,
			isPanelLandscape: !isLandscape,
			originList: benchBlockList,
		});
		if (stageOrientationLock === StageOrientationLock.UNLOCKED) {
			const rotatedStagedBlockList = rotateBlockList({
				isClockwise,
				isPanelLandscape: !isLandscape,
				originList: stagedBlockList,
			});
			setStagedBlockList(rotatedStagedBlockList);
		}
		setOrientation(newOrientation);
		setBenchBlockList(rotatedBenchBlockList);
		setRatio(getRatio());
	};

	const updateRatio = () => {
		setRatio(getRatio());
	};

	useEffect(() => {
		const orientation = window.screen.orientation;
		orientation.addEventListener('change', updateOrientation);
		window.addEventListener('resize', updateRatio);
		return () => {
			orientation.removeEventListener('change', updateOrientation);
			window.removeEventListener('resize', updateRatio);
		};
	}, [stagedBlockList, benchBlockList, stageOrientationLock]);

	useEffect(() => {
		if (
			prevStageOrientationLock === stageOrientationLock ||
			(isLandscape &&
				prevStageOrientationLock !== StageOrientationLock.LANDSCAPE &&
				stageOrientationLock !== StageOrientationLock.LANDSCAPE) ||
			(!isLandscape &&
				prevStageOrientationLock !== StageOrientationLock.PORTRAIT &&
				stageOrientationLock !== StageOrientationLock.PORTRAIT)
		) {
			return;
		}

		const isPanelLandscape =
			prevStageOrientationLock === StageOrientationLock.LANDSCAPE
				? true
				: prevStageOrientationLock === StageOrientationLock.PORTRAIT
				? false
				: !isLandscape;

		const rotatedStagedBlockList = rotateBlockList({
			isClockwise: !isPanelLandscape,
			isPanelLandscape,
			originList: stagedBlockList,
		});
		setStagedBlockList(rotatedStagedBlockList);
	}, [stageOrientationLock]);
};

export default useOrientation;
