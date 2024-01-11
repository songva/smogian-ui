import { useContext, useEffect } from 'react';
import { throttle } from 'lodash';

import {
	BlockContextProps,
	BlockList,
	GridDimension,
	OrientationContextProps,
	Pattern,
	RotateProps,
} from './common.types';
import { landscapeDimension, protraitDimension } from './constants';
import { OrientationValue, RotateDegree, StageOrientationLock } from './enums';
import { rotateClockwise, rotateAntiClockwise, isIPhone, getRatio, rotateHalfCircle } from './utils';
import { BenchContext, OrientationContext, StagedContext } from './contexts';
import usePrevious from './usePrevious';

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

	useEffect(() => {
		if (window.outerHeight > window.screen.height) {
			function sendTouchEvent(x: number, y: number, element: HTMLElement, eventType: string) {
				const touchObj = new Touch({
					identifier: Date.now(),
					target: element,
					clientX: x,
					clientY: y,
					radiusX: 2.5,
					radiusY: 2.5,
					rotationAngle: 10,
					force: 0.5,
				});

				const touchEvent = new TouchEvent(eventType, {
					cancelable: true,
					bubbles: true,
					touches: [touchObj],
					targetTouches: [],
					changedTouches: [touchObj],
					shiftKey: true,
				});

				element.dispatchEvent(touchEvent);
			}

			const myElement = document.getElementsByTagName('body')[0];

			if (myElement) {
				sendTouchEvent(150, 150, myElement, 'touchstart');
				sendTouchEvent(220, 200, myElement, 'touchmove');
				sendTouchEvent(220, 200, myElement, 'touchend');
			}
		}
	});
};

export default useOrientation;
