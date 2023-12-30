import { rotateClockwise, rotateAntiClockwise } from './utils';
import { Pattern } from './interfaces';

describe('rotateClockwise', () => {
	test('rotate an 4 elements array clockwise should return a new array rotated clockwise', () => {
		const array = [1, 2, 3, 4] as Pattern;
		expect(array).toEqual([1, 2, 3, 4]);
		expect(rotateClockwise(array)).toEqual([4, 1, 2, 3]);
	});
});

describe('rotateAntiClockwise', () => {
	test('rotate an 4 elements array clockwise should return a new array rotated clockwise', () => {
		const array = [1, 2, 3, 4] as Pattern;
		expect(rotateAntiClockwise(array)).toEqual([2, 3, 4, 1]);
		expect(array).toEqual([1, 2, 3, 4]);
	});
});

// describe('when in landscape mode, allocateSeat', () => {
// 	beforeEach(() => {
// 		mockedUseLandscape.mockImplementation(() => true);
// 	});
// 	const allocateSeat = renderHook(useUtils).result.current.allocateSeat;

// 	test('allocate negetive seat number should return undefined', () => {
// 		expect(allocateSeat(-1)).toBe(undefined);
// 	});

// 	test('allocate seat number greate than 23 should return undefined', () => {
// 		expect(allocateSeat(24)).toBe(undefined);
// 	});

// 	test.each([
// 		[0, { row: 1, column: 1, direction: [PatternDirection.TOP, PatternDirection.LEFT] }],
// 		[1, { row: 1, column: 2, direction: [PatternDirection.TOP] }],
// 		[2, { row: 1, column: 3, direction: [PatternDirection.TOP] }],
// 		[3, { row: 1, column: 4, direction: [PatternDirection.TOP, PatternDirection.RIGHT] }],
// 		[4, { row: 2, column: 1, direction: [PatternDirection.LEFT] }],
// 		[5, { row: 2, column: 2, direction: undefined }],
// 		[6, { row: 2, column: 3, direction: undefined }],
// 		[7, { row: 2, column: 4, direction: [PatternDirection.RIGHT] }],
// 		[8, { row: 3, column: 1, direction: [PatternDirection.LEFT] }],
// 		[9, { row: 3, column: 2, direction: undefined }],
// 		[10, { row: 3, column: 3, direction: undefined }],
// 		[11, { row: 3, column: 4, direction: [PatternDirection.RIGHT] }],
// 		[12, { row: 4, column: 1, direction: [PatternDirection.LEFT] }],
// 		[13, { row: 4, column: 2, direction: undefined }],
// 		[14, { row: 4, column: 3, direction: undefined }],
// 		[15, { row: 4, column: 4, direction: [PatternDirection.RIGHT] }],
// 		[16, { row: 5, column: 1, direction: [PatternDirection.LEFT] }],
// 		[17, { row: 5, column: 2, direction: undefined }],
// 		[18, { row: 5, column: 3, direction: undefined }],
// 		[19, { row: 5, column: 4, direction: [PatternDirection.RIGHT] }],
// 		[20, { row: 6, column: 1, direction: [PatternDirection.BOTTOM, PatternDirection.LEFT] }],
// 		[21, { row: 6, column: 2, direction: [PatternDirection.BOTTOM] }],
// 		[22, { row: 6, column: 3, direction: [PatternDirection.BOTTOM] }],
// 		[23, { row: 6, column: 4, direction: [PatternDirection.BOTTOM, PatternDirection.RIGHT] }],
// 	])('allocate seat number %d should equal to %s', (seat, expected) => {
// 		const allocateSeat = renderHook(useUtils).result.current.allocateSeat;
// 		expect(allocateSeat(seat)).toEqual(expected);
// 	});
// });

// describe('when in porttrait mode, allocateSeat', () => {
// 	beforeEach(() => {
// 		mockedUseLandscape.mockImplementation(() => false);
// 	});

// 	test.each([
// 		[0, { row: 1, column: 1, direction: [PatternDirection.TOP, PatternDirection.LEFT] }],
// 		[1, { row: 1, column: 2, direction: [PatternDirection.TOP] }],
// 		[2, { row: 1, column: 3, direction: [PatternDirection.TOP] }],
// 		[3, { row: 1, column: 4, direction: [PatternDirection.TOP] }],
// 		[4, { row: 1, column: 5, direction: [PatternDirection.TOP] }],
// 		[5, { row: 1, column: 6, direction: [PatternDirection.TOP, PatternDirection.RIGHT] }],
// 		[6, { row: 2, column: 1, direction: [PatternDirection.LEFT] }],
// 		[7, { row: 2, column: 2, direction: undefined }],
// 		[8, { row: 2, column: 3, direction: undefined }],
// 		[9, { row: 2, column: 4, direction: undefined }],
// 		[10, { row: 2, column: 5, direction: undefined }],
// 		[11, { row: 2, column: 6, direction: [PatternDirection.RIGHT] }],
// 		[12, { row: 3, column: 1, direction: [PatternDirection.LEFT] }],
// 		[13, { row: 3, column: 2, direction: undefined }],
// 		[14, { row: 3, column: 3, direction: undefined }],
// 		[15, { row: 3, column: 4, direction: undefined }],
// 		[16, { row: 3, column: 5, direction: undefined }],
// 		[17, { row: 3, column: 6, direction: [PatternDirection.RIGHT] }],
// 		[18, { row: 4, column: 1, direction: [PatternDirection.BOTTOM, PatternDirection.LEFT] }],
// 		[19, { row: 4, column: 2, direction: [PatternDirection.BOTTOM] }],
// 		[20, { row: 4, column: 3, direction: [PatternDirection.BOTTOM] }],
// 		[21, { row: 4, column: 4, direction: [PatternDirection.BOTTOM] }],
// 		[22, { row: 4, column: 5, direction: [PatternDirection.BOTTOM] }],
// 		[23, { row: 4, column: 6, direction: [PatternDirection.BOTTOM, PatternDirection.RIGHT] }],
// 	])('allocate seat number %d should equal to %s', (seat, expected) => {
// 		const allocateSeat = renderHook(useUtils).result.current.allocateSeat;
// 		expect(allocateSeat(seat)).toEqual(expected);
// 	});
// });
