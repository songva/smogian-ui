import { createContext } from 'react';
import { StageOrientationLock } from './enums';
import {
	AnchorLegConextProps,
	BlockContextProps,
	BumperContextProps,
	KidsModeContextProps,
	OrientationContextProps,
	ThemeContextProps,
	ThrottleContextProps,
	TutorialContextProps,
} from './common.types';

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
