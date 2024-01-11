import { Dispatch, FC, LazyExoticComponent, SetStateAction } from 'react';
import { DebouncedFunc } from 'lodash';
import { ConnectDropTarget } from 'react-dnd';

import { BlockList } from '../common/common.types';
import { BumperAnimation, StageOrientationLock } from '../common/enums';

export type usePanelProps = { isStage?: boolean } | undefined;

export interface usePanelReturn {
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
	Toast: LazyExoticComponent<React.ComponentType<{ children: string }>>;
}

export interface BumperColorAndCoordinates {
	bumperColor?: number;
	newBumperColor?: number;
	x?: number;
	y?: number;
	animationName?: BumperAnimation;
}

export type useHiddenPanelReturn = {
	anchorLeg: number;
	setAnchorLeg: Dispatch<SetStateAction<number>>;
	dummyRef: ConnectDropTarget;
};
