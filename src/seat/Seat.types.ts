import { PatternDirection, StageOrientationLock } from '../common/enums';
import { BlockList, GridDimension, Pattern } from '../common/common.types';

import { BlockProps } from '../block/Block.types';
import { BumperColorAndCoordinates } from '../panel/Panel.types';

export interface AllocatedSeatReturn {
	row: number;
	column: number;
	direction?: PatternDirection[];
}

export type UpdateBumperProps = {
	seatNumber: number;
	isTargetingStage: boolean;
	isSourceFromStage: boolean;
	movedPattern: Pattern;
	stagedBlockList: BlockList;
	updatedStagedBlockList: BlockList;
	stageOrientationLock: StageOrientationLock;
	isLandscape: boolean;
};

export type ValidateMoveProps = {
	kidsMode: boolean;
	stageOrientationLock: StageOrientationLock;
	isLandscape: boolean;
	updatedStagedBlockList: BlockList;
	seatNumber: number;
	movedPattern: Pattern;
	bumperColor: number | undefined;
};

export interface UpdateSeatProps {
	kidsMode: boolean;
	item: BlockProps;
	seat: { seatNumber: number; isStage: boolean };
	bumper: BumperColorAndCoordinates;
	stagedBlockList: BlockList;
	benchBlockList: BlockList;
	stageOrientationLock: StageOrientationLock;
	isLandscape: boolean;
}

export interface UpdateSeatReturn {
	updatedBumper: BumperColorAndCoordinates | undefined;
	updatedStagedBlockList: BlockList;
	updatedBenchBlockList: BlockList;
}

export interface GetDimensionProps {
	stageOrientationLock: StageOrientationLock;
	isLandscape: boolean;
}

export interface SeatServiceReturn {
	updateBumper: (param: UpdateBumperProps) => BumperColorAndCoordinates | undefined;
	validateMove: (params: ValidateMoveProps) => boolean;
	updateSeat: (params: UpdateSeatProps) => UpdateSeatReturn | undefined;
	getDimension: (params: GetDimensionProps) => GridDimension;
	allocateSeat: (params: { seatNumber: number; columnSpan: number }) => AllocatedSeatReturn | undefined;
}
