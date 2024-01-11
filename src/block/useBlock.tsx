import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { macMahon, palettesMap } from '../common/constants';
import { BlockAnimation, Display, PatternDirection, TransitionDuration, ZIndex } from '../common/enums';
import {
	BumperContext,
	StagedContext,
	ThemeContext,
	ThrottleContext,
	BenchContext,
	KidsModeContext,
	OrientationContext,
	AnchorLegContext,
} from '../common/contexts';
import { rotateClockwise, rotateAntiClockwise } from '../common/utils';

import seatService from '../seat/seatService';
import {
	AnchorLegConextProps,
	BlockContextProps,
	BlockList,
	BumperContextProps,
	KidsModeContextProps,
	OrientationContextProps,
	Pattern,
	ThemeContextProps,
	ThrottleContextProps,
} from '../common/common.types';
import { BlockProps, UseBlockReturn } from './Block.types';
import { BumperColorAndCoordinates } from '../panel/Panel.types';

const useBlock: (props: BlockProps) => UseBlockReturn = ({
	isStage,
	seatNumber,
	pattern,
	palettes,
	onClickOverride,
}) => {
	const { updateBumper, validateMove, getDimension } = seatService;
	const onThrottleWheelScroll = useContext<ThrottleContextProps>(ThrottleContext);
	const { blockList, setBlockList } = useContext<BlockContextProps>(isStage ? StagedContext : BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { palettes: contextPalettes, darkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { anchorLeg } = useContext<AnchorLegConextProps>(AnchorLegContext);

	const [rotate, setRotate] = useState<number>(0);
	const [transitionDuration, setTransitionDuration] = useState<TransitionDuration>(TransitionDuration.STATIC);
	const [animationName, setAnimationName] = useState<BlockAnimation>(BlockAnimation.EMPTY);
	const [zIndex, setZIndex] = useState(ZIndex.BACK);
	const freeze = useRef<boolean>(false);
	const blockDOMRef = useRef<HTMLDivElement>();
	const blockRef = useRef<Pattern>([0, 0, 0, 0]);
	const bumperColorRef = useRef<number>();
	const blockListRef = useRef<BlockList>(blockList);
	const triggerSingleClick = useRef<boolean>(true);

	const getWidth = useCallback(
		() => getDimension({ isLandscape, stageOrientationLock }).columnSpan,
		[isLandscape, stageOrientationLock]
	);

	const [{ display }, dragRef, dragPreview] = useDrag(
		() => ({
			type: macMahon,
			item: { isStage, isLandscape, seatNumber, pattern },
			collect: monitor => ({
				display: monitor.isDragging() ? Display.HIDDEN : Display.SHOW,
			}),
			canDrag: !freeze.current,
		}),
		[pattern, freeze.current]
	);

	const needsBounceBack = (updatedBlock: Pattern | undefined): boolean => {
		return (
			isStage &&
			updatedBlock !== undefined &&
			!validateMove({
				kidsMode,
				isLandscape,
				stageOrientationLock,
				updatedStagedBlockList: blockListRef.current,
				seatNumber,
				movedPattern: updatedBlock || [0, 0, 0, 0],
				bumperColor: bumperColorRef.current,
			})
		);
	};

	const checkAndUpdateBumper = (
		updatedBlock: Pattern | undefined,
		updatedBlockList: BlockList
	): BumperColorAndCoordinates | undefined => {
		return isStage && !kidsMode && updatedBlock
			? {
					...bumper,
					...updateBumper({
						isLandscape,
						stageOrientationLock,
						isSourceFromStage: true,
						isTargetingStage: true,
						movedPattern: updatedBlock || [0, 0, 0, 0],
						stagedBlockList: blockListRef.current,
						updatedStagedBlockList: updatedBlockList,
						seatNumber,
					}),
			  }
			: undefined;
	};

	const rotateBlock = (deltaY: number): void => {
		const toClockwise = deltaY > 0;
		setTransitionDuration(TransitionDuration.ANIMATE);
		setAnimationName(toClockwise ? BlockAnimation.CLOCKWISE : BlockAnimation.ANTICLOCKWISE);
		setRotate(rotate + (toClockwise ? 90 : -90));
		setZIndex(ZIndex.FRONT);
		freeze.current = true;

		const rotatedBlock = blockRef;
		if (!rotatedBlock) {
			return;
		}

		const updatedBlock = (toClockwise ? rotateClockwise : rotateAntiClockwise)(blockRef.current);
		if (needsBounceBack(updatedBlock)) {
			setTimeout(() => {
				setRotate(0);
				setTimeout(() => {
					setZIndex(ZIndex.BACK);
				}, 70);
				freeze.current = false;
			}, 70);
			return;
		}
		setTimeout(() => {
			const prePolitUpdatedBlockList = blockListRef.current.map((block, i) =>
				i === seatNumber ? updatedBlock : block
			);
			const updatedBumper = checkAndUpdateBumper(updatedBlock, prePolitUpdatedBlockList);
			isStage && setBumper({ ...bumper, ...updatedBumper, bumperColor: bumperColorRef.current });
			setBlockList(blockList => {
				return blockList.map((block, i) => (i === seatNumber ? updatedBlock : block));
			});
			setTransitionDuration(TransitionDuration.STATIC);
			setRotate(0);
			setZIndex(ZIndex.BACK);
			setAnimationName(BlockAnimation.EMPTY);
			freeze.current = false;
		}, Number(TransitionDuration.ANIMATE.replace('ms', '')));
	};

	const calculateLevel: (props: { seatNumber: number; anchorLeg: number; width: number }) => number = ({
		seatNumber,
		anchorLeg,
		width,
	}) => {
		const seatX = (seatNumber % width) + 1;
		const seatY = Math.floor(seatNumber / width) + 1;
		const anchorLegX = (anchorLeg % width) + 1;
		const anchorLegY = Math.floor(anchorLeg / width) + 1;
		return Math.floor(Math.sqrt(Math.pow(seatX - anchorLegX, 2) + Math.pow(seatY - anchorLegY, 2)));
	};

	const onSingleTap = (event: Event) => {
		event.preventDefault();
		triggerSingleClick.current = true;
		setTimeout(() => {
			triggerSingleClick.current && rotateBlock(90);
			blockDOMRef.current?.removeEventListener('click', onSingleTap);
			blockDOMRef.current?.removeEventListener('dblclick', onDoubleTap);
			setTimeout(() => {
				blockDOMRef.current?.addEventListener('click', onSingleTap);
				blockDOMRef.current?.addEventListener('dblclick', onDoubleTap);
			}, 310);
		}, 180);
	};

	const onDoubleTap = (event: Event) => {
		event.preventDefault();
		triggerSingleClick.current = false;
		blockDOMRef.current?.removeEventListener('click', onSingleTap);
		blockDOMRef.current?.removeEventListener('dblclick', onDoubleTap);
		setTimeout(() => {
			blockDOMRef.current?.addEventListener('click', onSingleTap);
			blockDOMRef.current?.addEventListener('dblclick', onDoubleTap);
		}, 310);
		rotateBlock(-90);
	};

	const onWheelScroll = (event: WheelEvent) => onThrottleWheelScroll(event.deltaY, rotateBlock);

	useEffect(() => {
		const updatedBlock = blockList[seatNumber];
		if (updatedBlock) {
			blockRef.current = updatedBlock;
		}
		blockListRef.current = blockList;
	}, [blockList]);

	useEffect(() => {
		blockDOMRef.current?.addEventListener('wheel', onWheelScroll, { passive: false });
		if (onClickOverride) {
			blockDOMRef.current?.addEventListener('click', onClickOverride);
		} else {
			blockDOMRef.current?.addEventListener('click', onSingleTap);
			blockDOMRef.current?.addEventListener('dblclick', onDoubleTap);
		}

		return () => {
			blockDOMRef.current?.removeEventListener('wheel', onWheelScroll);
			blockDOMRef.current?.removeEventListener('click', onSingleTap);
			blockDOMRef.current?.removeEventListener('dblclick', onDoubleTap);
			onClickOverride && blockDOMRef.current?.removeEventListener('click', onClickOverride);
		};
	}, [isStage, seatNumber, palettes]);

	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true });
	});

	useEffect(() => {
		if (!Number.isNaN(anchorLeg)) {
			const layer = calculateLevel({ seatNumber, anchorLeg, width: getWidth() });
			setTimeout(() => {
				setRotate(1440);
				setZIndex((layer + 1) * 10);
				setTransitionDuration(TransitionDuration.VICTORY);
			}, (Math.log2(layer + 2) / Math.log(1.9)) * 1000 - 2000);
		}
	}, [anchorLeg]);

	useEffect(() => {
		bumperColorRef.current = bumper.bumperColor;
	}, [bumper.bumperColor]);

	const colors = pattern.map(color => (palettes || palettesMap[contextPalettes])[color]);
	if (seatNumber < 0) {
		const backgroundImage = `conic-gradient(at center, ${colors[PatternDirection.TOP]} 12.5%, 
			${colors[PatternDirection.RIGHT]} 12.5%, ${colors[PatternDirection.RIGHT]} 37.5%, 
			${colors[PatternDirection.BOTTOM]} 37.5%, ${colors[PatternDirection.BOTTOM]} 62.5%, 
			${colors[PatternDirection.LEFT]} 62.5%, ${colors[PatternDirection.LEFT]} 87.5%, 
			${colors[PatternDirection.TOP]} 87.5% )`;
		return {
			colors,
			frontLayerStyle: {
				backgroundImage,
			},
			dragRef: blockDOMRef,
		};
	}
	const id =
		isEqual(pattern, [0, 0, 1, 2]) ||
		isEqual(pattern, [0, 1, 2, 0]) ||
		isEqual(pattern, [1, 2, 0, 0]) ||
		isEqual(pattern, [2, 0, 0, 1])
			? { id: 'sample' }
			: isEqual(pattern, [0, 1, 0, 2]) ||
			  isEqual(pattern, [1, 0, 2, 0]) ||
			  isEqual(pattern, [0, 2, 0, 1]) ||
			  isEqual(pattern, [2, 0, 1, 0])
			? { id: 'second' }
			: undefined;
	return {
		id,
		colors,
		dragRef: dragRef(blockDOMRef),
		dndStyle: {
			display,
			zIndex,
			filter: darkTheme ? 'brightness(0.8)' : '',
		},
		rotateStyle: {
			transform: `rotate(${rotate}deg)`,
			transitionDuration,
		},
		backLayerStyle: {
			animationName,
			animationDuration: transitionDuration,
		},
	};
};

export default useBlock;
