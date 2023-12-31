import { Dispatch, SetStateAction, createContext } from 'react';
import { BlockList, BumperColorAndCoordinates, StageOrientationLock } from './interfaces';
import { OrientationValue } from './useOrientation';

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

const BenchContext = createContext<BlockContextProps>({
	blockList: [],
	setBlockList: () => {},
});

const StagedContext = createContext<BlockContextProps>({
	blockList: [],
	setBlockList: () => {},
});

const ThrottleContext = createContext<ThrottleContextProps>(() => {});

const BumperContext = createContext<BumperContextProps>({
	bumper: { x: 0, y: 0 },
	setBumper: () => {},
});

const ThemeContext = createContext<ThemeContextProps>({
	darkTheme: false,
	palettes: '',
	setDarkTheme: () => {},
	setPalettes: () => {},
});

const OrientationContext = createContext<OrientationContextProps>({
	orientation: 0,
	isLandscape: false,
	ratio: 1,
	stageOrientationLock: StageOrientationLock.UNLOCKED,
	setOrientation: () => {},
	setStageOrientationLock: () => {},
	setRatio: () => {},
});

const KidsModeContext = createContext<KidsModeContextProps>({
	kidsMode: false,
	setKidsMode: () => {},
});

const AnchorLegContext = createContext<AnchorLegConextProps>({
	anchorLeg: NaN,
	setAnchorLeg: () => {},
});

const TutorialContext = createContext<TutorialContextProps>({
	tutorialStep: 1,
	setTutorialStep: () => {},
});

export {
	StagedContext,
	BenchContext,
	ThrottleContext,
	BumperContext,
	ThemeContext,
	OrientationContext,
	KidsModeContext,
	AnchorLegContext,
	TutorialContext,
};
