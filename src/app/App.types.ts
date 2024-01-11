import { Dispatch, SetStateAction } from 'react';
import type { BackendFactory } from 'dnd-core';

import { BlockList } from '../common/common.types';
import { OrientationValue, StageOrientationLock } from '../common/enums';

import { BumperColorAndCoordinates } from '../panel/Panel.types';

export interface useAppReturn {
	isLandscape: boolean;
	stagedBlockList: BlockList;
	benchBlockList: BlockList;
	palettes: string;
	orientation: OrientationValue;
	bumper: BumperColorAndCoordinates;
	ratio: number;
	stageOrientationLock: StageOrientationLock;
	kidsMode: boolean;
	darkTheme: boolean;
	tutorialStep: number;
	setStagedBlockList: Dispatch<SetStateAction<BlockList>>;
	setBenchBlockList: Dispatch<SetStateAction<BlockList>>;
	setPalettes: Dispatch<SetStateAction<string>>;
	setOrientation: Dispatch<SetStateAction<OrientationValue>>;
	setBumper: Dispatch<SetStateAction<BumperColorAndCoordinates>>;
	setRatio: Dispatch<SetStateAction<number>>;
	setStageOrientationLock: Dispatch<SetStateAction<StageOrientationLock>>;
	setKidsMode: Dispatch<SetStateAction<boolean>>;
	setDarkTheme: Dispatch<SetStateAction<boolean>>;
	setTutorialStep: Dispatch<SetStateAction<number>>;
	backend: BackendFactory;
}
