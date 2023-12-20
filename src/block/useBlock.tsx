import { MouseEvent, WheelEvent, useContext, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDoubleTap } from 'use-double-tap';
import { macMahon, palettesMap } from '../common/constants';
import {
	BlockList,
	BumperColorAndCoordinates,
	Cursor,
	Opacity,
	Pattern,
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
	AnchorLegConext,
} from '../common/contexts';
import { rotateClockwise, rotateAntiClockwise } from '../common/utils';
import { BlockProps } from './Block';
import seatService, { ValidateMoveProps } from '../seat/seatService';

export interface UseBlockReturn {
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
		transitionDelay: string;
	};
	onWheelScroll?: (event: WheelEvent<HTMLDivElement>) => void;
	onDoubleTap?: (event: any) => void;
}

const useBlock: (props: BlockProps) => UseBlockReturn = ({ isStage, index, pattern, palettes }) => {
	const onThrottleWheelScroll = useContext<ThrottleContextProps>(ThrottleContext);
	const { blockList, setBlockList } = useContext<BlockContextProps>(isStage ? StagedContext : BenchContext);
	const { bumper, setBumper } = useContext<BumperContextProps>(BumperContext);
	const { palettes: contextPalettes, darkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { kidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { isLandscape, stageOrientationLock } = useContext<OrientationContextProps>(OrientationContext);
	const { anchorLeg } = useContext<AnchorLegConextProps>(AnchorLegConext);

	const [rotate, setRotate] = useState<number>(0);
	const [transitionDuration, setTransitionDuration] = useState<TransitionDuration>(TransitionDuration.STATIC);
	const [transitionDelay, setTransitionDelay] = useState<string>('0ms');
	const [zIndex, setZIndex] = useState(ZIndex.BACK);
	const freeze = useRef<boolean>(false);

	const [{ opacity, cursor }, dragRef, dragPreview] = useDrag(
		() => ({
			type: macMahon,
			item: { isStage, isLandscape, index, pattern },
			collect: monitor => ({
				opacity: monitor.isDragging() ? Opacity.INVISABLE : Opacity.VISABLE,
				cursor: monitor.isDragging() ? Cursor.DRAGGING : Cursor.DRAG,
			}),
			canDrag: !freeze.current,
		}),
		[pattern, freeze.current]
	);

	const { updateBumper, validateMove } = seatService;

	const needsBounceBack = (updatedBlock: Pattern | undefined): boolean => {
		return (
			isStage &&
			updatedBlock !== undefined &&
			!validateMove({
				kidsMode,
				isLandscape,
				stageOrientationLock,
				updatedStagedBlockList: blockList,
				seatNumber: index,
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
					seatNumber: index,
			  })
			: undefined;

	const rotateBlock = (deltaY: number): void => {
		const toClockwise = deltaY < 0;
		setTransitionDuration(TransitionDuration.ANIMATE);
		setRotate(rotate + (toClockwise ? 90 : -90));
		setZIndex(ZIndex.FRONT);
		freeze.current = true;

		const rotatedBlock = blockList[index];
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
		const updatedBlockList = blockList.map((block, i) => (i === index ? updatedBlock : block));
		const updatedBumper = checkAndUpdateBumper(updatedBlock, updatedBlockList);
		setTimeout(() => {
			setBumper({ ...bumper, ...updatedBumper });
			setBlockList(updatedBlockList);
			setTransitionDuration(TransitionDuration.STATIC);
			setRotate(0);
			setZIndex(ZIndex.BACK);
			freeze.current = false;
		}, 350);
	};

	const { onClick } = useDoubleTap((event: MouseEvent) => {
		event.preventDefault();
		event.bubbles = false;
		rotateBlock(-90);
	});

	const onWheelScroll = (event: WheelEvent<HTMLDivElement>) => onThrottleWheelScroll(event.deltaY, rotateBlock);

	dragPreview(getEmptyImage(), { captureDraggingState: true });
	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true });
	});

	useEffect(() => {
		if (anchorLeg) {
			console.log(anchorLeg);
			setRotate(1800);
			setTransitionDuration(TransitionDuration.VICTORY);
			setTransitionDelay(`${Math.random() * 1000}ms`);
		} else {
			setRotate(0);
			setTransitionDuration(TransitionDuration.STATIC);
		}
	}, [anchorLeg]);

	if (palettes) {
		return {
			colors: pattern.map(color => palettes[color]),
		};
	}
	return {
		colors: pattern.map(color => palettesMap[contextPalettes][color]),
		dragRef,
		dndStyle: {
			opacity,
			zIndex,
			cursor,
			filter: darkTheme ? 'brightness(0.8)' : '',
		},
		rotateStyle: {
			transform: `rotate(${rotate}deg)`,
			transitionDuration,
			transitionDelay,
		},
		onWheelScroll,
		onDoubleTap: onClick,
	};
};

export default useBlock;
