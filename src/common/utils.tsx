import { Pattern } from './interfaces';

const rotateClockwise = (input: Pattern | undefined): Pattern | undefined => {
	if (input === undefined) {
		return undefined;
	}
	return [input[3], input[0], input[1], input[2]];
};

const rotateAntiClockwise = (input: Pattern | undefined): Pattern | undefined => {
	if (input === undefined) {
		return undefined;
	}
	return [input[1], input[2], input[3], input[0]];
};

export { rotateClockwise, rotateAntiClockwise };
