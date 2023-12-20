import { FC, memo } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ThrottleContext } from '../common/contexts';
import Seat from '../seat/Seat';
import usePanel from './usePanel';

const styles = StyleSheet.create({
	portraitPanel: {
		'@media (max-aspect-ratio: 1)': {
			gridRow: 3,
			justifySelf: 'center',
		},
	},
	landscapePanel: {
		'@media (min-aspect-ratio: 1)': {
			justifySelf: 'right',
		},
	},
	exlandscapePanel: {
		'@media (min-aspect-ratio: 2)': {
			gridColumn: 3,
			justifySelf: 'left',
		},
	},
	grid: {
		display: 'grid',
		position: 'relative',
		gridGap: '2dvmin',
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	gridPortrait: {
		'@media (max-aspect-ratio: 1)': {
			gridTemplateColumns: 'repeat(6, 1fr)',
		},
	},
});

const BenchPanel: FC = () => {
	const { blockList, onWheelScroll } = usePanel();

	return (
		<section className={css(styles.portraitPanel, styles.landscapePanel, styles.exlandscapePanel)}>
			<div className={css(styles.grid, styles.gridPortrait)} key="bench" data-testid="bench">
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
		</section>
	);
};
export default memo(BenchPanel);
