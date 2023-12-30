import { Pattern } from './interfaces';

const rotateClockwise = (input: Pattern): Pattern => {
	return [input[3], input[0], input[1], input[2]];
};

const rotateAntiClockwise = (input: Pattern): Pattern => {
	return [input[1], input[2], input[3], input[0]];
};

const rotateHalfCircle = (input: Pattern): Pattern => {
	return [input[2], input[3], input[0], input[1]];
};

const getRatio = (): number =>
	isIPhone() ? window.outerWidth / window.outerHeight : window.innerWidth / window.innerHeight;

const isIOSSafari = (): boolean => /iphone/i.test(window.navigator.userAgent);

const isIOSChrome = (): boolean => /crios/i.test(window.navigator.userAgent);

const isIPhone = (): boolean => isIOSChrome() || isIOSSafari();

export { rotateClockwise, rotateAntiClockwise, rotateHalfCircle, isIPhone, getRatio, isIOSSafari, isIOSChrome };
