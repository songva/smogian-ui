import { useState } from 'react';
import { StageOrientationLock } from './interfaces';
import { localStorageSettings } from './constants';

interface SettingsProps {
	palettes?: string;
	stageOrientationLock?: StageOrientationLock;
	kidsMode?: boolean;
	darkTheme?: boolean;
}

const useLocalStorage = () => {
	const storedSettings = JSON.parse(window.localStorage.getItem(localStorageSettings) || '{}');
	const [macMahonSettings, setAllMacMahonSettings] = useState<SettingsProps>(storedSettings);

	const setMacMahonSettings = (settings: SettingsProps) => {
		const newSettings = { ...macMahonSettings, ...settings };
		setAllMacMahonSettings(newSettings);
		window.localStorage.setItem(localStorageSettings, JSON.stringify(newSettings));
	};

	return { macMahonSettings, setMacMahonSettings };
};

export default useLocalStorage;
