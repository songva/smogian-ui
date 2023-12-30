import { MouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDoubleTap } from 'use-double-tap';
import { landscapeDimension, macMahon, palettesMap, protraitDimension } from '../common/constants';
import {
	BlockAnimation,
	BlockList,
	BumperColorAndCoordinates,
	Cursor,
	Opacity,
	Pattern,
	PatternDirection,
	StageOrientationLock,
	TransitionDuration,
	ZIndex,
} from '../common/interfaces';
import {
	BumperContext,
	StagedContext,
	ThemeContext,
	ThrottleContext,
	BenchContext,
	BlockContextProps,
	ThrottleContextProps,
	BumperContextProps,
	ThemeContextProps,
	KidsModeContextProps,
	KidsModeContext,
	OrientationContextProps,
	OrientationContext,
	AnchorLegConextProps,
	AnchorLegContext,
} from '../common/contexts';
import { rotateClockwise, rotateAntiClockwise } from '../common/utils';
import { BlockProps } from './Block';
import seatService from '../seat/seatService';

interface UseBlockReturn {
	id?: { id: string };
	colors: string[];
	dragRef?: any;
	dndStyle?: {
		opacity: Opacity;
		zIndex: ZIndex;
		cursor: Cursor;
	};
	rotateStyle?: {
		transform: string;
		transitionDuration: TransitionDuration;
	};
	backLayerStyle?: {
		animationName: string;
		animationDuration: TransitionDuration;
	};
	onWheelScroll?: (event: WheelEvent) => void;
	onDoubleTap?: (event: any) => void;
}

const useBlock: (props: BlockProps) => UseBlockReturn = ({ isStage, seatNumber, pattern, palettes }) => {
	const onThrottleWheelScroll = useContext<ThrottleContextProps>(ThrottleContext);
	const { blockList, setBlockList } = useContext<BlockContextProps>(isStage ? StagedContext : BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { palettes: contextPalettes, darkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { anchorLeg } = useContext<AnchorLegConextProps>(AnchorLegContext);
	const scrollRef = useRef<HTMLDivElement>();

	const [rotate, setRotate] = useState<number>(0);
	const [transitionDuration, setTransitionDuration] = useState<TransitionDuration>(TransitionDuration.STATIC);
	const [animationName, setAnimationName] = useState<BlockAnimation>(BlockAnimation.EMPTY);
	const [zIndex, setZIndex] = useState(ZIndex.BACK);
	const freeze = useRef<boolean>(false);
	const { updateBumper, validateMove, getDimension } = seatService;

	const getWidth = useCallback(
		() => getDimension({ isLandscape, stageOrientationLock }).columnSpan,
		[isLandscape, stageOrientationLock]
	);

	const [{ opacity, cursor }, dragRef, dragPreview] = useDrag(
		() => ({
			type: macMahon,
			item: { isStage, isLandscape, seatNumber, pattern },
			collect: monitor => ({
				opacity: monitor.isDragging() ? Opacity.INVISABLE : Opacity.VISABLE,
				cursor: monitor.isDragging() ? Cursor.DRAGGING : Cursor.DRAG,
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
				updatedStagedBlockList: blockList,
				seatNumber,
				movedPattern: updatedBlock || [0, 0, 0, 0],
				bumperColor: bumper.bumperColor,
			})
		);
	};

	const checkAndUpdateBumper = (
		updatedBlock: Pattern | undefined,
		updatedBlockList: BlockList
	): BumperColorAndCoordinates | undefined =>
		isStage && !kidsMode && updatedBlock
			? updateBumper({
					isLandscape,
					stageOrientationLock,
					isSourceFromStage: true,
					isTargetingStage: true,
					movedPattern: updatedBlock || [0, 0, 0, 0],
					stagedBlockList: blockList,
					updatedStagedBlockList: updatedBlockList,
					seatNumber,
			  })
			: undefined;

	const rotateBlock = (deltaY: number): void => {
		const toClockwise = deltaY > 0;
		setTransitionDuration(TransitionDuration.ANIMATE);
		setAnimationName(toClockwise ? BlockAnimation.CLOCKWISE : BlockAnimation.ANTICLOCKWISE);
		setRotate(rotate + (toClockwise ? 90 : -90));
		setZIndex(ZIndex.FRONT);
		freeze.current = true;

		const rotatedBlock = blockList[seatNumber];
		if (!rotatedBlock) {
			return;
		}

		const updatedBlock = toClockwise ? rotateClockwise(rotatedBlock) : rotateAntiClockwise(rotatedBlock);
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
		const updatedBlockList = blockList.map((block, i) => (i === seatNumber ? updatedBlock : block));
		const updatedBumper = checkAndUpdateBumper(updatedBlock, updatedBlockList);
		setTimeout(() => {
			setBumper({ ...bumper, ...updatedBumper });
			setBlockList(updatedBlockList);
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

	const { onClick } = useDoubleTap((event: MouseEvent) => {
		event.preventDefault();
		event.bubbles = false;
		rotateBlock(90);
	});

	const onWheelScroll = (event: WheelEvent) => onThrottleWheelScroll(event.deltaY, rotateBlock);

	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true });
		if (scrollRef.current) {
			scrollRef.current.onwheel = (e: WheelEvent) => {
				onWheelScroll(e);
			};
		}
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
		dragRef: dragRef(scrollRef),
		dndStyle: {
			opacity,
			zIndex,
			cursor,
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
		onWheelScroll,
		onDoubleTap: onClick,
	};
};

export default useBlock;
