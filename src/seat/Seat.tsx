import { FC, memo } from 'react';
import { css } from 'aphrodite/no-important';

import { Pattern } from '../common/common.types';

import Block from '../block/Block';
import useSeat from './useSeat';
import styles from './Seat.styles';

export interface SeatProps {
	seatNumber: number;
	occupier?: Pattern;
	isStage: boolean;
	isLandscape: boolean;
}

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
