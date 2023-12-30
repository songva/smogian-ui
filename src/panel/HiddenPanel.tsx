import { ReactElement } from 'react';

import useHiddenPanel from './useHiddenPanel';
import { css } from 'aphrodite/no-important';
import { AnchorLegContext } from '../common/contexts';
import styles from './Panel.style';
import { isIOSChrome, isIOSSafari } from '../common/utils';

const HiddenPanel: (props: { children: ReactElement[] }) => ReactElement = ({ children }) => {
	const { anchorLeg, setAnchorLeg, dummyRef } = useHiddenPanel();

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
					isIOSSafari() && styles.hiddenPanelIPhoneSafariOverride
				)}
			>
				{children}
			</div>
		</AnchorLegContext.Provider>
	);
};

export default HiddenPanel;
