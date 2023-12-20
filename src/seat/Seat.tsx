import { FC, memo } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Pattern } from '../common/interfaces';
import Block from '../block/Block';
import useSeat from './useSeat';

export interface SeatProps {
	seatNumber: number;
	occupier?: Pattern;
	isStage: boolean;
	isLandscape: boolean;
}

const styles = StyleSheet.create({
	stageSeat: {
		backgroundColor: '#e4e4e4',
	},
	stageSeatDark: {
		backgroundColor: '#333333',
	},
	seat: {
		borderRadius: '0.8vmin',
		position: 'relative',
		height: 'min(11dvh, 8dvw)',
		width: 'min(11dvh, 8dvw)',
		userSelect: 'none',
	},
	seatExLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			height: '12dvmin',
			width: '12dvmin',
		},
	},
	seatPortrait: {
		'@media (max-aspect-ratio: 1)': {
			height: 'min(11dvw, 8dvh)',
			width: 'min(11dvw, 8dvh)',
		},
	},
});

const Seat: FC<SeatProps> = ({ occupier, seatNumber, isStage }) => {
	const { dropRef, darkTheme } = useSeat({ seatNumber, isStage });

	return (
		<div
			ref={dropRef}
			className={css(
				styles.seat,
				styles.seatExLandscape,
				styles.seatPortrait,
				isStage && (darkTheme ? styles.stageSeatDark : styles.stageSeat)
			)}
			data-testid={`${isStage ? `stage` : `bench`}-seat-${seatNumber}`}
		>
			{occupier && <Block index={seatNumber} pattern={occupier} isStage={isStage} />}
		</div>
	);
};

export default memo(Seat);
