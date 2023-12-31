import { BlockList, Palettes, PalettesMap } from './interfaces';
import { GridDimension } from './useOrientation';

const localStorageSettings = 'MacMahonSquaresSettings';
const lightBumperColor = 'white';
const darkBumperColor = '#929090';

const defaultPalettes: Palettes = ['#f21137', '#5a8100', '#ffb400'];
const chocolatePalettes: Palettes = ['#af4425', '#662e1c', '#c9a66b'];
const christmasPalettes: Palettes = ['#cb3606', '#4b6a1e', '#f9dfa4'];
const blueyPalettes: Palettes = ['#7cc0eb', '#3e406a', '#edcd7d'];
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
const clipPathTemplates: { left: string; top: string; right: string; bottom: string } = {
	top: 'polygon(0% 0%, 0% 1%, {} {}, 100% 1%, 100% 0%)',
	bottom: 'polygon(0% 100%, 0% 99%, {} {}, {} {}, 100% 99%, 100% 100%)',
	left: 'polygon(0% 0%, {} {}, 0% 100%)',
	right: 'polygon(100% 0%, {} {}, 100% 100%)',
};

const backLayerClips: [string, string, string, string] = [
	clipPathTemplates.left.replace('{}', 'var(--position-x-percentage)').replace('{}', 'var(--position-y-percentage)'),
	clipPathTemplates.top
		.replace('{}', 'var(--position-x-percentage)')
		.replace('{}', 'var(--position-y-down-percentage)'),
	clipPathTemplates.right.replace('{}', 'var(--position-x-percentage)').replace('{}', 'var(--position-y-percentage)'),
	clipPathTemplates.bottom
		.replace('{}', 'var(--position-x-left-percentage)')
		.replace('{}', 'var(--position-y-percentage)')
		.replace('{}', 'var(--position-x-right-percentage)')
		.replace('{}', 'var(--position-y-percentage)'),
];

const frontLayerClips: [string, string, string, string] = [
	clipPathTemplates.left.replace('{}', '50%').replace('{}', '50%'),
	clipPathTemplates.top.replace('{}', '50%').replace('{}', '51%'),
	clipPathTemplates.right.replace('{}', '50%').replace('{}', '50%'),
	clipPathTemplates.bottom.replace('{}', '49%').replace('{}', '50%').replace('{}', '51%').replace('{}', '50%'),
];

const landscapeDimension: GridDimension = {
	columnSpan: 6,
	rowSpan: 4,
};
const protraitDimension: GridDimension = {
	columnSpan: 4,
	rowSpan: 6,
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

const toasts = ['GOOD JOB', 'NICE JOB', 'SUPER DUPER', 'GREAT WORK', 'WELL DONE'];

export {
	localStorageSettings,
	lightBumperColor,
	darkBumperColor,
	palettesMap,
	macMahon,
	blockSet,
	frontLayerClips,
	backLayerClips,
	landscapeDimension,
	protraitDimension,
	titleBackgroundPath,
	toasts,
};
