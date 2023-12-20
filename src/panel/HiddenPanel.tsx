import { ReactElement } from 'react';

import useHiddenPanel from './useHiddenPanel';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	hiddenPanelLandscape: {
		'@media (min-aspect-ratio: 1)': {
			display: 'grid',
			alignItems: 'center',
			gridTemplateColumns:
				'calc((100dvw - min(144dvh, 84dvw)) / 2 + 0.5dvh) auto auto calc((100dvw - min(144dvh, 84dvw)) / 2 + 0.5dvh)',
			height: '90dvh',
		},
	},
	hiddenPanelExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			gridTemplateColumns: 'calc(50dvw - 53dvmin) 6fr 4fr',
			height: '100dvh',
		},
	},
	hiddenPanelPortrait: {
		'@media (max-aspect-ratio: 1)': {
			display: 'grid',
			alignItems: 'center',
			height: 'calc(100dvh - 8dvw)',
			gridTemplateRows: '4dvw repeat(2, 1fr) 4dvw',
			justifyContent: 'center',
		},
	},
	hiddenPanelExPortrait: {
		'@media (max-aspect-ratio: 3 / 5)': {
			gridTemplateRows: '0 1fr auto 30dvmin',
		},
	},
});

const HiddenPanel: (props: { children: ReactElement[] }) => ReactElement = ({ children }) => {
	const dummyRef = useHiddenPanel();

	return (
		<div
			ref={dummyRef}
			className={css(
				styles.hiddenPanelLandscape,
				styles.hiddenPanelExLandscape,
				styles.hiddenPanelPortrait,
				styles.hiddenPanelExPortrait
			)}
		>
			{children}
		</div>
	);
};

export default HiddenPanel;
