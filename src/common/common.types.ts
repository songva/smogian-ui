import { Dispatch, SetStateAction } from 'react';
import { OrientationValue, RotateDegree, StageOrientationLock } from './enums';
import { BumperColorAndCoordinates } from '../panel/Panel.types';

export type Palettes = [string, string, string];
export type Pattern = [number, number, number, number];
export type BlockList = Array<Pattern | undefined>;

export interface PalettesMap {
	defaultPalettes: Palettes;
	chocolatePalettes: Palettes;
	christmasPalettes: Palettes;
	blueyPalettes: Palettes;
	icecreamPalettes: Palettes;
	[key: string]: Palettes;
}

export interface BlockContextProps {
	blockList: BlockList;
	setBlockList: Dispatch<SetStateAction<BlockList>>;
}

export interface BumperContextProps {
	bumper: BumperColorAndCoordinates;
	setBumper: Dispatch<SetStateAction<BumperColorAndCoordinates>>;
}

export interface ThemeContextProps {
	darkTheme: boolean;
	palettes: string;
	setDarkTheme: Dispatch<SetStateAction<boolean>>;
	setPalettes: Dispatch<SetStateAction<string>>;
}

export type ThrottleContextProps = (deltaY: number, func: (deltaY: number) => void) => void;

export interface OrientationContextProps {
	orientation: OrientationValue;
	isLandscape: boolean;
	ratio: number;
	stageOrientationLock: StageOrientationLock;
	setOrientation: Dispatch<SetStateAction<OrientationValue>>;
	setStageOrientationLock: Dispatch<SetStateAction<StageOrientationLock>>;
	setRatio: Dispatch<SetStateAction<number>>;
}

export interface KidsModeContextProps {
	kidsMode: boolean;
	setKidsMode: Dispatch<SetStateAction<boolean>>;
}

export interface AnchorLegConextProps {
	anchorLeg: number;
	setAnchorLeg: Dispatch<SetStateAction<number>>;
}

export interface TutorialContextProps {
	tutorialStep: number;
	setTutorialStep: Dispatch<SetStateAction<number>>;
}

export interface SettingsProps {
	palettes?: string;
	stageOrientationLock?: StageOrientationLock;
	kidsMode?: boolean;
	darkTheme?: boolean;
	tutorialStep?: number;
}

export interface GridDimension {
	rowSpan: number;
	columnSpan: number;
}

export interface RotateProps {
	rotateDegree: RotateDegree;
	isStageLandscape: boolean;
	originList: BlockList;
}
