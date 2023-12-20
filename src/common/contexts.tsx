import { createContext } from 'react';
import { BlockList, BumperColorAndCoordinates, StageOrientationLock } from './interfaces';
import { OrientationValue } from './useOrientation';

export interface BlockContextProps {
	blockList: BlockList;
	setBlockList: (block: BlockList) => void;
}

export interface BumperContextProps {
	bumper: BumperColorAndCoordinates;
	setBumper: (bumper: BumperColorAndCoordinates) => void;
}

export interface ThemeContextProps {
	darkTheme: boolean;
	palettes: string;
	setDarkTheme: (darkTheme: boolean) => void;
	setPalettes: (palettes: string) => void;
}

export type ThrottleContextProps = (deltaY: number, func: (deltaY: number) => void) => void;

export interface OrientationContextProps {
	orientation: OrientationValue;
	isLandscape: boolean;
	ratio: number;
	stageOrientationLock: StageOrientationLock;
	setOrientation: (orientation: OrientationValue) => void;
	setStageOrientationLock: (stageOrientationLock: StageOrientationLock) => void;
	setRatio: (ratio: number) => void;
}

export interface KidsModeContextProps {
	kidsMode: boolean;
	setKidsMode: (kidsMode: boolean) => void;
}

export interface AnchorLegConextProps {
	anchorLeg: number;
	setAnchorLeg: (anchorLeg: number) => void;
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

const AnchorLegConext = createContext<AnchorLegConextProps>({
	anchorLeg: NaN,
	setAnchorLeg: () => {},
});

export {
	StagedContext,
	BenchContext,
	ThrottleContext,
	BumperContext,
	ThemeContext,
	OrientationContext,
	KidsModeContext,
	AnchorLegConext,
};
