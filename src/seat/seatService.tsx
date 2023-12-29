import {
	BlockList,
	BumperAnimation,
	BumperColorAndCoordinates,
	Pattern,
	PatternDirection,
	StageOrientationLock,
} from '../common/interfaces';
import { BlockProps } from '../block/Block';
import { GridDimension } from '../common/useOrientation';

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

const seatService: () => SeatServiceReturn = () => {
	const getDimension: (params: GetDimensionProps) => GridDimension = ({ stageOrientationLock, isLandscape }) => {
		const columnSpan =
			stageOrientationLock === StageOrientationLock.LANDSCAPE
				? 6
				: stageOrientationLock === StageOrientationLock.PORTRAIT
				? 4
				: isLandscape
				? 4
				: 6;
		const rowSpan = 10 - columnSpan;
		return { columnSpan, rowSpan };
	};

	const allocateSeat: (params: { seatNumber: number; columnSpan: number }) => AllocatedSeatReturn | undefined = ({
		seatNumber,
		columnSpan,
	}) => {
		if (seatNumber < 0 || seatNumber > 23) {
			return;
		}
		const coordinations = {
			row: Math.floor(seatNumber / columnSpan) + 1,
			column: (seatNumber % columnSpan) + 1,
		};
		switch (true) {
			case seatNumber === 0:
				return { ...coordinations, direction: [PatternDirection.TOP, PatternDirection.LEFT] };
			case seatNumber === columnSpan - 1:
				return { ...coordinations, direction: [PatternDirection.TOP, PatternDirection.RIGHT] };
			case seatNumber === 23 - columnSpan + 1:
				return { ...coordinations, direction: [PatternDirection.BOTTOM, PatternDirection.LEFT] };
			case seatNumber === 23:
				return { ...coordinations, direction: [PatternDirection.BOTTOM, PatternDirection.RIGHT] };
			case seatNumber < columnSpan:
				return { ...coordinations, direction: [PatternDirection.TOP] };
			case seatNumber % columnSpan === columnSpan - 1:
				return { ...coordinations, direction: [PatternDirection.RIGHT] };
			case seatNumber > 23 - columnSpan:
				return { ...coordinations, direction: [PatternDirection.BOTTOM] };
			case seatNumber % columnSpan === 0:
				return { ...coordinations, direction: [PatternDirection.LEFT] };
			default:
				return coordinations;
		}
	};

	const countTakenBumperSeats: (blockList: BlockList, columnSpan: number) => number = (blockList, columnSpan) =>
		blockList
			.map((item, seatNumber) => item && allocateSeat({ seatNumber, columnSpan })?.direction)
			.filter(item => item !== undefined).length;

	const updateBumper: (param: UpdateBumperProps) => BumperColorAndCoordinates | undefined = ({
		seatNumber,
		isTargetingStage,
		isSourceFromStage,
		movedPattern,
		stagedBlockList,
		updatedStagedBlockList,
		stageOrientationLock,
		isLandscape,
	}) => {
		const { columnSpan, rowSpan } = getDimension({ isLandscape, stageOrientationLock });
		const position = allocateSeat({ seatNumber, columnSpan });
		const xPercent = 100 / (columnSpan + 1);
		const yPercent = 100 / (rowSpan + 1);
		if (
			isTargetingStage &&
			position?.direction !== undefined &&
			countTakenBumperSeats(updatedStagedBlockList, columnSpan) === 1
		) {
			return {
				x: position.column * xPercent,
				y: position.row * yPercent,
				newBumperColor: movedPattern[position.direction[0]],
				animationName: BumperAnimation.PAINT,
			};
		} else if (
			isSourceFromStage &&
			countTakenBumperSeats(stagedBlockList, columnSpan) !== 0 &&
			countTakenBumperSeats(updatedStagedBlockList, columnSpan) === 0
		) {
			const adjustedPosition =
				!isTargetingStage &&
				((isLandscape && stageOrientationLock === StageOrientationLock.LANDSCAPE) ||
					(!isLandscape && stageOrientationLock === StageOrientationLock.PORTRAIT))
					? allocateSeat({
							seatNumber,
							columnSpan: getDimension({ isLandscape, stageOrientationLock: StageOrientationLock.UNLOCKED }).columnSpan,
					  })
					: position;

			return {
				x: !isTargetingStage && isLandscape ? 200 : (adjustedPosition?.column || 0) * xPercent,
				y: !isTargetingStage && !isLandscape ? 200 : (adjustedPosition?.row || 0) * yPercent,
				bumperColor: undefined,
				animationName: BumperAnimation.FADE,
			};
		}
	};

	const validateMove: (params: ValidateMoveProps) => boolean = ({
		kidsMode,
		stageOrientationLock,
		isLandscape,
		updatedStagedBlockList: stagedBlockList,
		seatNumber,
		movedPattern,
		bumperColor: currentBumperColor,
	}) => {
		const { columnSpan } = getDimension({ isLandscape, stageOrientationLock });
		const bumperColor = kidsMode
			? undefined
			: countTakenBumperSeats(stagedBlockList, columnSpan) === 1
			? undefined
			: currentBumperColor;

		const topAdjacentColor =
			seatNumber < columnSpan ? bumperColor : (stagedBlockList[seatNumber - columnSpan] || [])[PatternDirection.BOTTOM];
		const bottomAdjacentColor =
			seatNumber > 23 - columnSpan
				? bumperColor
				: (stagedBlockList[seatNumber + columnSpan] || [])[PatternDirection.TOP];
		const leftAdjacentColor =
			seatNumber % columnSpan === 0 ? bumperColor : (stagedBlockList[seatNumber - 1] || [])[PatternDirection.RIGHT];
		const rightAdjacentColor =
			seatNumber % columnSpan === columnSpan - 1
				? bumperColor
				: (stagedBlockList[seatNumber + 1] || [])[PatternDirection.LEFT];

		const direcions = allocateSeat({ seatNumber, columnSpan })?.direction || [];
		if (!kidsMode && direcions.length === 2 && movedPattern[direcions[0]] !== movedPattern[direcions[1]]) {
			return false;
		}

		return (
			movedPattern[PatternDirection.TOP] ===
				(topAdjacentColor !== undefined ? topAdjacentColor : movedPattern[PatternDirection.TOP]) &&
			movedPattern[PatternDirection.BOTTOM] ===
				(bottomAdjacentColor !== undefined ? bottomAdjacentColor : movedPattern[PatternDirection.BOTTOM]) &&
			movedPattern[PatternDirection.LEFT] ===
				(leftAdjacentColor !== undefined ? leftAdjacentColor : movedPattern[PatternDirection.LEFT]) &&
			movedPattern[PatternDirection.RIGHT] ===
				(rightAdjacentColor !== undefined ? rightAdjacentColor : movedPattern[PatternDirection.RIGHT])
		);
	};

	const updateSeat: (props: UpdateSeatProps) => UpdateSeatReturn | undefined = ({
		kidsMode,
		stageOrientationLock,
		isLandscape,
		item,
		seat,
		bumper,
		stagedBlockList,
		benchBlockList,
	}) => {
		const isTargetingStage = seat.isStage;
		const isSourceFromStage = item.isStage;
		const sourceBlockList = isSourceFromStage ? stagedBlockList : benchBlockList;
		const targetBlockList = isTargetingStage ? stagedBlockList : benchBlockList;

		const movedPattern = sourceBlockList[item.seatNumber];
		if (movedPattern === undefined || targetBlockList[seat.seatNumber] !== undefined || item === undefined) {
			return;
		}

		const onGoingStagedBlockList = isSourceFromStage
			? [...stagedBlockList].map((block, index) => (item.seatNumber === index ? undefined : block))
			: stagedBlockList;
		const onGoingBenchBlockList = isSourceFromStage
			? benchBlockList
			: [...benchBlockList].map((block, index) => (item.seatNumber === index ? undefined : block));

		const updatedStagedBlockList = isTargetingStage
			? [...onGoingStagedBlockList].map((block, index) => (seat.seatNumber === index ? movedPattern : block))
			: onGoingStagedBlockList;
		const updatedBenchBlockList = isTargetingStage
			? onGoingBenchBlockList
			: [...onGoingBenchBlockList].map((block, index) => (seat.seatNumber === index ? movedPattern : block));

		if (
			isTargetingStage &&
			!validateMove({
				kidsMode,
				isLandscape,
				stageOrientationLock,
				updatedStagedBlockList,
				movedPattern,
				seatNumber: seat.seatNumber,
				bumperColor: bumper.bumperColor,
			})
		) {
			return;
		}
		const updatedBumper =
			!kidsMode &&
			updateBumper({
				seatNumber: seat.seatNumber,
				isSourceFromStage,
				isTargetingStage,
				movedPattern,
				stagedBlockList,
				updatedStagedBlockList,
				stageOrientationLock,
				isLandscape,
			});

		return {
			updatedBumper: { ...bumper, ...updatedBumper },
			updatedStagedBlockList,
			updatedBenchBlockList,
		};
	};

	return {
		updateBumper,
		validateMove,
		updateSeat,
		getDimension,
		allocateSeat,
	};
};

export default seatService();
