import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import type { BackendFactory } from 'dnd-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BlockList, BumperColorAndCoordinates, StageOrientationLock } from '../common/interfaces';
import { blockSet, palettesMap } from '../common/constants';
import useLocalStorage from '../common/useLocalStorage';
import { getRatio } from '../common/utils';
import { OrientationValue } from '../common/useOrientation';
import { darkThemeStyle, lightThemeStyle } from './App.style';

interface useAppReturn {
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
	setStagedBlockList: (stagedBlockList: BlockList) => void;
	setBenchBlockList: (benchBlockList: BlockList) => void;
	setPalettes: (palettes: string) => void;
	setOrientation: (orientation: OrientationValue) => void;
	setBumper: (bumper: BumperColorAndCoordinates) => void;
	setRatio: Dispatch<SetStateAction<number>>;
	setStageOrientationLock: (stageOrientationLock: StageOrientationLock) => void;
	setKidsMode: (kidsMode: boolean) => void;
	setDarkTheme: (darkTheme: boolean) => void;
	setTutorialStep: (tutorialStep: number) => void;
	backend: BackendFactory;
}

const useApp = (): useAppReturn => {
	const [benchBlockList, setBenchBlockList] = useState<BlockList>(shuffle(blockSet));
	const [stagedBlockList, setStagedBlockList] = useState<BlockList>(Array(24).fill(undefined));

	const [bumper, setBumper] = useState<BumperColorAndCoordinates>({ bumperColor: undefined });
	const [ratio, setRatio] = useState<number>(getRatio());
	const [orientation, setOrientation] = useState<number>(
		OrientationValue[ratio > 1 ? 'landscape-primary' : 'portrait-primary']
	);

	const { macMahonSettings, setMacMahonSettings } = useLocalStorage();
	const originPalettes =
		macMahonSettings.palettes && palettesMap[macMahonSettings.palettes || 'defaultPalettes']
			? macMahonSettings.palettes
			: 'defaultPalettes';
	const [palettes, setPalettes] = useState<string>(originPalettes);
	const [kidsMode, setKidsMode] = useState<boolean>(macMahonSettings.kidsMode || false);
	const [darkTheme, setDarkTheme] = useState<boolean>(macMahonSettings.darkTheme || false);
	const [stageOrientationLock, setStageOrientationLock] = useState<StageOrientationLock>(
		macMahonSettings.stageOrientationLock || StageOrientationLock.UNLOCKED
	);
	const [tutorialStep, setTutorialStep] = useState<number>(macMahonSettings.tutorialStep || 1);

	const storePalettes = (palettes: string) => {
		setPalettes(palettes);
		setMacMahonSettings({ palettes });
	};

	const storeKidsMode = (kidsMode: boolean) => {
		setKidsMode(kidsMode);
		setMacMahonSettings({ kidsMode });
	};

	const storeDarkTheme = (darkTheme: boolean) => {
		setDarkTheme(darkTheme);
		setMacMahonSettings({ darkTheme });
	};

	const storeStageOrientationLock = (stageOrientationLock: StageOrientationLock) => {
		setStageOrientationLock(stageOrientationLock);
		setMacMahonSettings({ stageOrientationLock });
	};

	const storeTutorialStep = (tutorialStep: number) => {
		setTutorialStep(tutorialStep);
		setMacMahonSettings({ tutorialStep });
	};

	useEffect(() => {
		window.document.addEventListener('gesturestart', e => e.preventDefault());
		if (!window.document.documentElement.style.backgroundColor) {
			window.document.documentElement.style.backgroundColor = darkTheme
				? darkThemeStyle.backgroundColor
				: lightThemeStyle.backgroundColor;
		}
	});

	return {
		stagedBlockList,
		benchBlockList,
		palettes,
		orientation,
		bumper,
		isLandscape: orientation % 180 === 0,
		ratio,
		stageOrientationLock,
		kidsMode,
		darkTheme,
		tutorialStep,
		setStagedBlockList,
		setBenchBlockList,
		setOrientation,
		setBumper,
		setPalettes: storePalettes,
		setKidsMode: storeKidsMode,
		setDarkTheme: storeDarkTheme,
		setStageOrientationLock: storeStageOrientationLock,
		setTutorialStep: storeTutorialStep,
		setRatio,
		backend: 'ontouchstart' in document.documentElement || navigator.maxTouchPoints ? TouchBackend : HTML5Backend,
	};
};

export default useApp;
