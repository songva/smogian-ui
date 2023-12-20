import { useState } from 'react';
import { shuffle } from 'lodash';
import type { BackendFactory } from 'dnd-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { blockSet, palettesMap } from '../common/constants';
import { BlockList, BumperColorAndCoordinates, StageOrientationLock } from '../common/interfaces';
import { OrientationValue } from '../common/useOrientation';
import { darkThemeStyle, lightThemeStyle } from './App.styles';
import useLocalStorage from '../common/useLocalStorage';

interface useAppReturn {
	stagedBlockList: BlockList;
	benchBlockList: BlockList;
	palettes: string;
	orientation: OrientationValue;
	bumper: BumperColorAndCoordinates;
	isLandscape: boolean;
	ratio: number;
	stageOrientationLock: StageOrientationLock;
	kidsMode: boolean;
	darkTheme: boolean;
	setStagedBlockList: (stagedBlockList: BlockList) => void;
	setBenchBlockList: (benchBlockList: BlockList) => void;
	setPalettes: (palettes: string) => void;
	setOrientation: (orientation: OrientationValue) => void;
	setBumper: (bumper: BumperColorAndCoordinates) => void;
	setStageOrientationLock: (stageOrientationLock: StageOrientationLock) => void;
	setKidsMode: (kidsMode: boolean) => void;
	setDarkTheme: (darkTheme: boolean) => void;
	setRatio: (darkTheme: number) => void;
	backend: BackendFactory;
}

const useApp = (): useAppReturn => {
	const [benchBlockList, setBenchBlockList] = useState<BlockList>(shuffle(blockSet));
	const [stagedBlockList, setStagedBlockList] = useState<BlockList>(Array(24).fill(undefined));

	const [bumper, setBumper] = useState<BumperColorAndCoordinates>({ bumperColor: undefined });
	const [orientation, setOrientation] = useState<number>(OrientationValue[window.screen.orientation.type]);
	const [ratio, setRatio] = useState<number>(window.innerWidth / window.innerHeight);

	const { macMahonSettings, setMacMahonSettings } = useLocalStorage();
	const [palettes, setPalettes] = useState<string>(macMahonSettings.palettes || 'defaultPalettes');
	const [kidsMode, setKidsMode] = useState<boolean>(macMahonSettings.kidsMode || false);
	const [darkTheme, setDarkTheme] = useState<boolean>(macMahonSettings.darkTheme || false);
	const [stageOrientationLock, setStageOrientationLock] = useState<StageOrientationLock>(
		macMahonSettings.stageOrientationLock || StageOrientationLock.UNLOCKED
	);

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

	const isLandscape = orientation % 180 === 0;
	const backend = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints ? TouchBackend : HTML5Backend;
	window.document.addEventListener('gesturestart', e => e.preventDefault());

	window.document.documentElement.style.backgroundColor = darkTheme
		? darkThemeStyle.backgroundColor
		: lightThemeStyle.backgroundColor;

	window.scrollTo(0, 0);

	return {
		stagedBlockList,
		benchBlockList,
		palettes,
		orientation,
		bumper,
		isLandscape,
		ratio,
		stageOrientationLock,
		kidsMode,
		darkTheme,
		setStagedBlockList,
		setBenchBlockList,
		setOrientation,
		setBumper,
		setPalettes: storePalettes,
		setKidsMode: storeKidsMode,
		setDarkTheme: storeDarkTheme,
		setStageOrientationLock: storeStageOrientationLock,
		setRatio,
		backend,
	};
};

export default useApp;
