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
	seat: {
		borderRadius: '0.8vmin',
		height: 'min(11dvh, 8dvw)',
		aspectRatio: '1 / 1',
		userSelect: 'none',
	},
	seatExLandscape: {
		'@media (min-aspect-ratio: 2 )': {
			height: '12dvmin',
		},
	},
	seatPortrait: {
		'@media (max-aspect-ratio: 1)': {
			height: 'min(11dvw, 8dvh)',
		},
	},
});

const Seat: FC<SeatProps> = ({ occupier, seatNumber, isStage }) => {
	const { id, dropRef } = useSeat({ seatNumber, isStage });

	return (
		<div
			{...id}
			ref={dropRef}
			className={css(styles.seat, styles.seatExLandscape, styles.seatPortrait)}
			data-testid={`${isStage ? `stage` : `bench`}-seat-${seatNumber}`}
		>
			{occupier && <Block seatNumber={seatNumber} pattern={occupier} isStage={isStage} />}
		</div>
	);
};

export default memo(Seat);
