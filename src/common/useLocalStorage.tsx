import { useState } from 'react';

import { SettingsProps } from './common.types';
import { localStorageSettings } from './constants';

const useLocalStorage = () => {
	const storedSettings = JSON.parse(window.localStorage.getItem(localStorageSettings) || '{}');
	const [macMahonSettings, setAllMacMahonSettings] = useState<SettingsProps>(storedSettings);

	const setMacMahonSettings = (settings: SettingsProps) => {
		const newSettings = { ...macMahonSettings, ...settings };
		setAllMacMahonSettings(newSettings);
		localStorage.setItem(localStorageSettings, JSON.stringify(newSettings));
	};

	return { macMahonSettings, setMacMahonSettings };
};

export default useLocalStorage;
