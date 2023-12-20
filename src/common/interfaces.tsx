export type Pattern = [number, number, number, number];

export type Palettes = [string, string, string];

export interface PalettesMap {
	defaultPalettes: Palettes;
	chocolatePalettes: Palettes;
	christmasPalettes: Palettes;
	blueyPalettes: Palettes;
	icecreamPalettes: Palettes;
	[key: string]: Palettes;
}

export enum TransitionDuration {
	STATIC = '0ms',
	ANIMATE = '300ms',
	VICTORY = '3s',
}
export enum Opacity {
	INVISABLE = 0,
	VISABLE = 1,
}
export enum ZIndex {
	FRONT = 2,
	BACK = 0,
}
export enum Cursor {
	DRAG = 'grab',
	DRAGGING = 'grabbing',
}

export type BlockList = Array<Pattern | undefined>;

export interface BumperColorAndCoordinates {
	bumperColor?: number;
	newBumperColor?: number;
	x?: number;
	y?: number;
	animationName?: BumperAnimation;
}

export enum PatternDirection {
	LEFT = 0,
	TOP = 1,
	RIGHT = 2,
	BOTTOM = 3,
}

export enum BumperAnimation {
	EMPTY = '',
	PAINT = 'paintKeyframes',
	FADE = 'fadeKeyframes',
}

export enum StageOrientationLock {
	UNLOCKED = 0,
	LANDSCAPE = 1,
	PORTRAIT = -1,
}

export enum Ratio {
	PORTRAIT = 0.7,
	SEMI_PORTRAIT = 2 / 3,
	SQUARE = 1,
	SEMI_LANDSCAPE = 1.5,
	LANDSCAPE = 2,
}
