import {
	BlockList,
	BumperAnimation,
	BumperColorAndCoordinates,
	Pattern,
	PatternDirection,
	StageOrientationLock,
} from '../common/interfaces';
import { BlockProps } from '../block/Block';

interface AllocatedSeat {
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

export interface SeatServiceReturn {
	updateBumper: (param: UpdateBumperProps) => BumperColorAndCoordinates | undefined;
	validateMove: (params: ValidateMoveProps) => boolean;
	updateSeat: (params: UpdateSeatProps) => UpdateSeatReturn | undefined;
}

const seatService: () => SeatServiceReturn = () => {
	const getDimension: (params: { stageOrientationLock: StageOrientationLock; isLandscape: boolean }) => {
		width: number;
		height: number;
	} = ({ stageOrientationLock, isLandscape }) => {
		const width =
			stageOrientationLock === StageOrientationLock.LANDSCAPE
				? 6
				: stageOrientationLock === StageOrientationLock.PORTRAIT
				? 4
				: isLandscape
				? 4
				: 6;
		const height = 10 - width;
		return { width, height };
	};

	const allocateSeat = (seatNumber: number, width: number): AllocatedSeat | undefined => {
		if (seatNumber < 0 || seatNumber > 23) {
			return;
		}
		const coordinations = {
			row: Math.floor(seatNumber / width) + 1,
			column: (seatNumber % width) + 1,
		};
		switch (true) {
			case seatNumber === 0:
				return { ...coordinations, direction: [PatternDirection.TOP, PatternDirection.LEFT] };
			case seatNumber === width - 1:
				return { ...coordinations, direction: [PatternDirection.TOP, PatternDirection.RIGHT] };
			case seatNumber === 23 - width + 1:
				return { ...coordinations, direction: [PatternDirection.BOTTOM, PatternDirection.LEFT] };
			case seatNumber === 23:
				return { ...coordinations, direction: [PatternDirection.BOTTOM, PatternDirection.RIGHT] };
			case seatNumber < width:
				return { ...coordinations, direction: [PatternDirection.TOP] };
			case seatNumber % width === width - 1:
				return { ...coordinations, direction: [PatternDirection.RIGHT] };
			case seatNumber > 23 - width:
				return { ...coordinations, direction: [PatternDirection.BOTTOM] };
			case seatNumber % width === 0:
				return { ...coordinations, direction: [PatternDirection.LEFT] };
			default:
				return coordinations;
		}
	};

	const countTakenBumperSeats: (blockList: BlockList, width: number) => number = (blockList, width) =>
		blockList.map((item, index) => item && allocateSeat(index, width)?.direction).filter(item => item !== undefined)
			.length;

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
		const { width, height } = getDimension({ isLandscape, stageOrientationLock });
		const position = allocateSeat(seatNumber, width);
		const xPercent = 100 / (width + 1);
		const yPercent = 100 / (height + 1);
		if (
			isTargetingStage &&
			position?.direction !== undefined &&
			countTakenBumperSeats(updatedStagedBlockList, width) === 1
		) {
			return {
				x: position.column * xPercent,
				y: position.row * yPercent,
				newBumperColor: movedPattern[position.direction[0]],
				animationName: BumperAnimation.PAINT,
			};
		} else if (
			isSourceFromStage &&
			countTakenBumperSeats(stagedBlockList, width) !== 0 &&
			countTakenBumperSeats(updatedStagedBlockList, width) === 0
		) {
			const adjustedPosition =
				!isTargetingStage &&
				((isLandscape && stageOrientationLock === StageOrientationLock.LANDSCAPE) ||
					(!isLandscape && stageOrientationLock === StageOrientationLock.PORTRAIT))
					? allocateSeat(
							seatNumber,
							getDimension({ isLandscape, stageOrientationLock: StageOrientationLock.UNLOCKED }).width
					  )
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
		const { width } = getDimension({ isLandscape, stageOrientationLock });
		const bumperColor = kidsMode
			? undefined
			: countTakenBumperSeats(stagedBlockList, width) === 1
			? undefined
			: currentBumperColor;

		const topAdjacentColor =
			seatNumber < width ? bumperColor : (stagedBlockList[seatNumber - width] || [])[PatternDirection.BOTTOM];
		const bottomAdjacentColor =
			seatNumber > 23 - width ? bumperColor : (stagedBlockList[seatNumber + width] || [])[PatternDirection.TOP];
		const leftAdjacentColor =
			seatNumber % width === 0 ? bumperColor : (stagedBlockList[seatNumber - 1] || [])[PatternDirection.RIGHT];
		const rightAdjacentColor =
			seatNumber % width === width - 1 ? bumperColor : (stagedBlockList[seatNumber + 1] || [])[PatternDirection.LEFT];

		const direcions = allocateSeat(seatNumber, width)?.direction || [];
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

		const movedPattern = sourceBlockList[item.index];
		if (movedPattern === undefined || targetBlockList[seat.seatNumber] !== undefined || item === undefined) {
			return;
		}

		const onGoingStagedBlockList = isSourceFromStage
			? [...stagedBlockList].map((block, index) => (item.index === index ? undefined : block))
			: stagedBlockList;
		const onGoingBenchBlockList = isSourceFromStage
			? benchBlockList
			: [...benchBlockList].map((block, index) => (item.index === index ? undefined : block));

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
	};
};

export default seatService();
