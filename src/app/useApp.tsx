import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import type { BackendFactory } from 'dnd-core';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BlockList, BumperColorAndCoordinates, Palettes, StageOrientationLock } from '../common/interfaces';
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

const useApp = (): useAppReturn => {
	const [benchBlockList, setBenchBlockList] = useState<BlockList>(shuffle(blockSet));
	const [stagedBlockList, setStagedBlockList] = useState<BlockList>(Array(24).fill(undefined));
	const [bumper, setBumper] = useState<BumperColorAndCoordinates>({});
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

	const storePalettes: Dispatch<SetStateAction<string>> = (palettes: ((prev: string) => string) | string) => {
		if (typeof palettes === 'function') {
			setPalettes((prevState: string) => {
				const newPalettes = palettes(prevState);
				setMacMahonSettings({ palettes: newPalettes });
				return newPalettes;
			});
		} else {
			setPalettes(palettes);
			setMacMahonSettings({ palettes });
		}
	};

	const storeKidsMode: Dispatch<SetStateAction<boolean>> = (kidsMode: ((prev: boolean) => boolean) | boolean) => {
		if (typeof kidsMode === 'function') {
			setKidsMode((prevState: boolean) => {
				const newKidsMode = kidsMode(prevState);
				setMacMahonSettings({ kidsMode: newKidsMode });
				return newKidsMode;
			});
		} else {
			setKidsMode(kidsMode);
			setMacMahonSettings({ kidsMode });
		}
	};

	const storeDarkTheme: Dispatch<SetStateAction<boolean>> = (darkTheme: ((prev: boolean) => boolean) | boolean) => {
		if (typeof darkTheme === 'function') {
			setDarkTheme((prevState: boolean) => {
				const newDarkTheme = darkTheme(prevState);
				setMacMahonSettings({ darkTheme: newDarkTheme });
				return newDarkTheme;
			});
		} else {
			setDarkTheme(darkTheme);
			setMacMahonSettings({ darkTheme });
		}
	};

	const storeStageOrientationLock: Dispatch<SetStateAction<StageOrientationLock>> = (
		stageOrientationLock: ((prev: StageOrientationLock) => StageOrientationLock) | StageOrientationLock
	) => {
		if (typeof stageOrientationLock === 'function') {
			setStageOrientationLock((prevState: StageOrientationLock) => {
				const newStageOrientationLock = stageOrientationLock(prevState);
				setMacMahonSettings({ stageOrientationLock: newStageOrientationLock });
				return newStageOrientationLock;
			});
		} else {
			setStageOrientationLock(stageOrientationLock);
			setMacMahonSettings({ stageOrientationLock });
		}
	};

	const storeTutorialStep: Dispatch<SetStateAction<number>> = (tutorialStep: ((prev: number) => number) | number) => {
		if (typeof tutorialStep === 'function') {
			setTutorialStep((prevState: number) => {
				const newTutorialStep = tutorialStep(prevState);
				setMacMahonSettings({ tutorialStep: newTutorialStep });
				return newTutorialStep;
			});
		} else {
			setTutorialStep(tutorialStep);
			setMacMahonSettings({ tutorialStep });
		}
	};

	useEffect(() => {
		if (!window.document.documentElement.style.backgroundColor) {
			window.document.documentElement.style.backgroundColor = darkTheme
				? darkThemeStyle.backgroundColor
				: lightThemeStyle.backgroundColor;
		}
	}, [darkTheme]);

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
		backend: TouchBackend,
	};
};

export default useApp;
