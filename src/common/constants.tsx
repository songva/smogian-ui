import { BlockList, Palettes, PalettesMap } from './interfaces';

const localStorageSettings = 'MacMahonSquaresSettings';
const ligthBumperColor = 'white';
const darkBumperColor = '#929090';

const defaultPalettes: Palettes = ['#f21137', '#5a8100', '#ffb400'];
const chocolatePalettes: Palettes = ['#af4425', '#662e1c', '#c9a66b'];
const christmasPalettes: Palettes = ['#cb3606', '#4b6a1e', '#f9dfa4'];
const blueyPalettes: Palettes = ['#7cc0eb', '#edcd7d', '#3e406a'];
const icecreamPalettes: Palettes = ['#f262b7', '#1bbdfa', '#ffe548'];

const palettesMap: PalettesMap = {
	defaultPalettes,
	chocolatePalettes,
	christmasPalettes,
	blueyPalettes,
	icecreamPalettes,
};

const macMahon: string = 'macMahon';
const blockSet: BlockList = [
	[2, 2, 2, 2],
	[2, 2, 2, 0],
	[2, 2, 0, 0],
	[0, 2, 0, 2],
	[2, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 1],
	[0, 0, 1, 1],
	[0, 1, 0, 1],
	[0, 1, 1, 1],
	[1, 1, 1, 1],
	[1, 1, 1, 2],
	[1, 1, 2, 2],
	[1, 2, 1, 2],
	[1, 2, 2, 2],
	[0, 0, 2, 1],
	[0, 0, 1, 2],
	[0, 1, 0, 2],
	[2, 2, 1, 0],
	[2, 2, 0, 1],
	[2, 1, 2, 0],
	[1, 1, 2, 0],
	[1, 1, 0, 2],
	[1, 2, 1, 0],
];
const landscapeDimension = {
	column: 6,
	row: 4,
};
const protraitDimension = {
	column: 4,
	row: 6,
};
const titleBackgroundPath = [
	'',
	'M0,0L100,100M100,0L0,100',
	'M0,0L50,50L100,0',
	'M0,0L100,100M50,50L0,100',
	'M100,0L50,50L100,100',
	'M0,0L100,100',
	'M0,0L100,100M100,0L0,100',
	'M0,0L100,100M50,50L100,0',
	'M0,100L50,50L100,100',
	'',
	'',
	'',
	'',
	'M0,0L100,100M50,50L0,100',
	'M0,0L50,50L0,100',
	'M0,0L50,50L100,0',
	'M100,0L0,100M50,50L0,0',
	'M0,0L100,100M50,50L100,0',
	'M0,100L100,0',
	'',
];
export {
	localStorageSettings,
	ligthBumperColor,
	darkBumperColor,
	palettesMap,
	macMahon,
	blockSet,
	landscapeDimension,
	protraitDimension,
	titleBackgroundPath,
};
