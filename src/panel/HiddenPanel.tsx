import { ReactElement } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { AnchorLegContext } from '../common/contexts';
import { abnormalHeightDefect, isAndroidChrome, isIOSChrome, isIOSSafari } from '../common/utils';

import useHiddenPanel from './useHiddenPanel';
import styles from './Panel.styles';

const HiddenPanel: (props: { children: ReactElement[] }) => ReactElement = ({ children }) => {
	const { anchorLeg, setAnchorLeg, dummyRef } = useHiddenPanel();

	const chromeAndroidDefectStyle = StyleSheet.create({
		hiddenPanelExPortrait: {
			'@media (max-aspect-ratio: 3 / 5)': {
				height: `calc(${window.screen.height - 180}px - 8dvw); !important`,
			},
		},
	});

	return (
		<AnchorLegContext.Provider value={{ anchorLeg, setAnchorLeg }}>
			<div
				ref={dummyRef}
				className={css(
					styles.hiddenPanelLandscape,
					styles.hiddenPanelExLandscape,
					styles.hiddenPanelPortrait,
					styles.hiddenPanelExPortrait,
					isIOSChrome() && styles.hiddenPanelIPhoneChromeOverride,
					isIOSSafari() && styles.hiddenPanelIPhoneSafariOverride,
					isAndroidChrome() && abnormalHeightDefect() && chromeAndroidDefectStyle.hiddenPanelExPortrait
				)}
			>
				{children}
			</div>
		</AnchorLegContext.Provider>
	);
};

export default HiddenPanel;
