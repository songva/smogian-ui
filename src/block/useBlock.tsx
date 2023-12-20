import { MouseEvent, WheelEvent, useContext, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDoubleTap } from 'use-double-tap';
import { macMahon, palettesMap } from '../common/constants';
import { Cursor, Opacity, TransitionDuration, ZIndex } from '../common/interfaces';
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
} from '../common/contexts';
import { rotateClockwise, rotateAntiClockwise } from '../common/utils';
import { BlockProps } from './Block';
import seatService from '../seat/seatService';
import { CSSProperties } from 'aphrodite';

export interface UseBlockReturn {
	colors: string[];
	dragRef?: any;
	dndStyle?: {
		opacity: Opacity;
		zIndex: ZIndex;
		cursor: Cursor;
	};
	rotateStyle?: CSSProperties;
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

	const [rotate, setRotate] = useState<number>(0);
	const [transitionDuration, setTransitionDuration] = useState(TransitionDuration.STATIC);
	const [zIndex, setZIndex] = useState(ZIndex.BACK);

	const [{ opacity, cursor }, dragRef, dragPreview] = useDrag(
		() => ({
			type: macMahon,
			item: { isStage, isLandscape, index, pattern },
			collect: monitor => ({
				opacity: monitor.isDragging() ? Opacity.INVISABLE : Opacity.VISABLE,
				cursor: monitor.isDragging() ? Cursor.DRAGGING : Cursor.DRAG,
			}),
		}),
		[pattern]
	);

	const { updateBumper, validateMove } = seatService;

	const rotateBlock = (deltaY: number): void => {
		const toClockwise = deltaY < 0;
		setTransitionDuration(TransitionDuration.ANIMATE);
		setRotate(rotate + (toClockwise ? 90 : -90));
		setZIndex(ZIndex.FRONT);

		const rotatedBlock = blockList[index];
		const updatedBlock = toClockwise ? rotateClockwise(rotatedBlock) : rotateAntiClockwise(rotatedBlock);

		if (
			isStage &&
			!validateMove({
				kidsMode,
				isLandscape,
				stageOrientationLock,
				updatedStagedBlockList: blockList,
				seatNumber: index,
				movedPattern: updatedBlock || [0, 0, 0, 0],
				bumperColor: bumper.bumperColor,
			})
		) {
			setTimeout(() => {
				setRotate(0);
				setTimeout(() => {
					setZIndex(ZIndex.BACK);
				}, 70);
			}, 70);
			return;
		}

		setTimeout(() => {
			const updatedBlockList = blockList.map((block, i) => (i === index ? updatedBlock : block));
			const updatedBumper =
				isStage && !kidsMode
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
					: {};
			setBumper({ ...bumper, ...updatedBumper });
			setBlockList(updatedBlockList);
			setTransitionDuration(TransitionDuration.STATIC);
			setRotate(0);
			setZIndex(ZIndex.BACK);
		}, 250);
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
	const filter = darkTheme ? 'brightness(0.8)' : '';
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
			filter,
		},
		rotateStyle: {
			transform: `rotate(${rotate}deg)`,
			transitionDuration,
		},
		onWheelScroll,
		onDoubleTap: onClick,
	};
};

export default useBlock;
