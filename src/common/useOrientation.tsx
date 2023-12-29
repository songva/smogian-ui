import { useContext, useEffect } from 'react';
import { throttle } from 'lodash';
import { landscapeDimension, protraitDimension } from './constants';
import { rotateClockwise, rotateAntiClockwise, isIPhone, getRatio, rotateHalfCircle } from './utils';
import {
	BenchContext,
	BlockContextProps,
	OrientationContext,
	OrientationContextProps,
	StagedContext,
} from './contexts';
import { BlockList, Pattern, StageOrientationLock } from './interfaces';
import usePrevious from './usePrevious';

export enum OrientationValue {
	'landscape-primary' = 0,
	'portrait-primary' = 90,
	'landscape-secondary' = 180,
	'portrait-secondary' = -90,
}

export interface GridDimension {
	rowSpan: number;
	columnSpan: number;
}

enum RotateDegree {
	CLOCKWISE = 90,
	ANTICLOCKWISE = 270,
	SEMICIRCLE = 180,
}

interface RotateProps {
	rotateDegree: RotateDegree;
	isStageLandscape: boolean;
	originList: BlockList;
}

const rotateAttributes: Record<
	RotateDegree,
	{ formula: (num: number, dimension: GridDimension) => number; rotateMethod: (pattern: Pattern) => Pattern }
> = {
	[RotateDegree.CLOCKWISE]: {
		formula: (num, dimension) =>
			(dimension.rowSpan - (num % dimension.rowSpan) - 1) * dimension.columnSpan + Math.floor(num / dimension.rowSpan),
		rotateMethod: rotateClockwise,
	},
	[RotateDegree.ANTICLOCKWISE]: {
		formula: (num, dimension) =>
			((num % dimension.rowSpan) + 1) * dimension.columnSpan - Math.floor(num / dimension.rowSpan) - 1,
		rotateMethod: rotateAntiClockwise,
	},
	[RotateDegree.SEMICIRCLE]: {
		formula: num => 23 - num,
		rotateMethod: rotateHalfCircle,
	},
};

const rotateBlockList: (props: RotateProps) => BlockList = ({ rotateDegree, isStageLandscape, originList }) => {
	const dimension = isStageLandscape ? landscapeDimension : protraitDimension;
	const rotateAttribute = rotateAttributes[rotateDegree];
	return Array(24)
		.fill(0)
		.map((i, index) => originList[rotateAttribute.formula(index, dimension)])
		.map(block => (block ? rotateAttribute.rotateMethod(block) : undefined));
};

const useOrientation = () => {
	const { isLandscape, orientation, stageOrientationLock, setOrientation, setRatio } =
		useContext<OrientationContextProps>(OrientationContext);
	const { blockList: stagedBlockList, setBlockList: setStagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const { blockList: benchBlockList, setBlockList: setBenchBlockList } = useContext<BlockContextProps>(BenchContext);
	const prevStageOrientationLock = usePrevious(stageOrientationLock);

	const handleRotateEvent: (event: Event) => void = ({ target }) => {
		const newOrientation = OrientationValue[(target as ScreenOrientation).type];
		updateOrientation(newOrientation);
	};

	const updateOrientation = throttle((newOrientation: OrientationValue) => {
		if (orientation === newOrientation) {
			return;
		}
		const factor = isIPhone() ? -1 : 1;
		const rotateDegree = ((newOrientation - orientation) * factor + 360) % 360;

		const rotatedBenchBlockList = rotateBlockList({
			rotateDegree,
			isStageLandscape: !isLandscape,
			originList: benchBlockList,
		});
		if (stageOrientationLock === StageOrientationLock.UNLOCKED) {
			const rotatedStagedBlockList = rotateBlockList({
				rotateDegree,
				isStageLandscape: !isLandscape,
				originList: stagedBlockList,
			});
			setStagedBlockList(rotatedStagedBlockList);
		}
		setOrientation(newOrientation);
		setBenchBlockList(rotatedBenchBlockList);
		setRatio(getRatio());
	}, 200);

	const handleResize = () => {
		setRatio((prevRatio: number) => {
			const currentRatio = getRatio();
			if (prevRatio > 1 && currentRatio < 1) {
				updateOrientation(OrientationValue['portrait-primary']);
			}
			if (prevRatio < 1 && currentRatio > 1) {
				updateOrientation(OrientationValue['landscape-primary']);
			}
			return currentRatio;
		});
	};

	useEffect(() => {
		const screeOrientation = window.screen.orientation;
		screeOrientation.addEventListener('change', handleRotateEvent);
		window.addEventListener('resize', handleResize);
		return () => {
			screeOrientation.removeEventListener('change', handleRotateEvent);
			window.removeEventListener('resize', handleResize);
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

		const isStageLandscape =
			prevStageOrientationLock === StageOrientationLock.LANDSCAPE
				? true
				: prevStageOrientationLock === StageOrientationLock.PORTRAIT
				? false
				: !isLandscape;

		const rotatedStagedBlockList = rotateBlockList({
			rotateDegree: isStageLandscape ? RotateDegree.ANTICLOCKWISE : RotateDegree.CLOCKWISE,
			isStageLandscape: isStageLandscape,
			originList: stagedBlockList,
		});
		setStagedBlockList(rotatedStagedBlockList);
	}, [stageOrientationLock]);
};

export default useOrientation;
