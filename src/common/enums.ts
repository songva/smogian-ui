export enum TransitionDuration {
	STATIC = '0ms',
	ANIMATE = '300ms',
	VICTORY = '3000ms',
}
export enum Display {
	SHOW = 'block',
	HIDDEN = 'none',
}
export enum ZIndex {
	FRONT = 2,
	BACK = 0,
}
export enum Cursor {
	DRAG = 'grab',
	DRAGGING = 'grabbing',
}
export enum PatternDirection {
	LEFT = 0,
	TOP = 1,
	RIGHT = 2,
	BOTTOM = 3,
}
export enum PatternOrientation {
	TOP_LEFT = 'tl',
	TOP_RIGHT = 'tr',
	BOTTOM_LEFT = 'bl',
	BOTTOM_RIGHT = 'br',
}
export enum BumperAnimation {
	EMPTY = '',
	PAINT = 'paintKeyframes',
	FADE = 'fadeKeyframes',
}
export enum BlockAnimation {
	EMPTY = '',
	CLOCKWISE = 'clockwiseKeyframes',
	ANTICLOCKWISE = 'antiClockwiseKeyframes',
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
export enum BumperAnimationDuration {
	NORMAL = 400,
	FADE = 900,
}
export enum OrientationValue {
	'landscape-primary' = 0,
	'portrait-primary' = 90,
	'landscape-secondary' = 180,
	'portrait-secondary' = -90,
}
export enum RotateDegree {
	CLOCKWISE = 90,
	ANTICLOCKWISE = 270,
	SEMICIRCLE = 180,
}

export enum MenuPresetTop {
	HIDE = '2dvmin - 100% - 3px',
	SHOW = '0%',
}
