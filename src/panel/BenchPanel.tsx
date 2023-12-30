import { FC, memo } from 'react';
import { css } from 'aphrodite/no-important';
import { ThrottleContext } from '../common/contexts';
import Seat from '../seat/Seat';
import usePanel from './usePanel';
import styles from './Panel.style';
import Toast from '../toast/Toast';

const BenchPanel: FC = () => {
	const { blockList, onWheelScroll, anchorLeg, toast, reloadPage, darkTheme } = usePanel();

	return (
		<section className={css(styles.benchPanelPortrait, styles.benchPanel, styles.benchPanelExLandscape)}>
			{Number.isNaN(anchorLeg) && (
				<div className={css(styles.benchGrid, styles.benchGridPortrait)} key="bench" data-testid="bench">
					<ThrottleContext.Provider value={onWheelScroll}>
						{blockList.map((item, index) => (
							<Seat
								key={`bench-seat-${index}`}
								data-testid={`bench-seat-${index}`}
								seatNumber={index}
								isStage={false}
								occupier={item}
								isLandscape
							/>
						))}
					</ThrottleContext.Provider>
				</div>
			)}
			{!Number.isNaN(anchorLeg) && (
				<>
					<section
						className={css(styles.benchPanel, styles.benchPanelPortrait, styles.benchPanelExLandscape, styles.toast)}
					>
						<Toast>{toast}</Toast>
						<svg viewBox="0 0 100 100" className={css(styles.replayIcon)} onClick={reloadPage}>
							<path
								className={css(styles.replaySvgPath, darkTheme && styles.replaySvgPathDark)}
								d="M 40.023 21.372 C 40.546 21.364 52.267 21.158 52.783 21.174 C 76.298 21.89 91.069 47.41 79.456 68.292 C 67.59 89.632 37.072 90.124 24.524 69.177 C 17.45 57.367 18.802 42.34 27.872 31.982 M 52.589 8.224 L 39.497 21.317 L 52.272 34.09"
							/>
						</svg>
					</section>
					<div className={css(styles.overlay)} />
				</>
			)}
		</section>
	);
};
export default memo(BenchPanel);
