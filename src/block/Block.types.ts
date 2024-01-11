import { MutableRefObject, ReactElement } from 'react';
import { Palettes, Pattern } from '../common/common.types';
import { Display, PatternDirection, TransitionDuration, ZIndex } from '../common/enums';

export interface BlockProps {
	seatNumber: number;
	pattern: Pattern;
	isStage: boolean;
	overrideStyles?: string[];
	palettes?: Palettes;
	onClickOverride?: () => void;
}

export interface ClipProps {
	direction: PatternDirection;
	colors: string[];
	backLayerStyle?: {
		animationName: string;
		animationDuration: TransitionDuration;
	};
}
export interface UseBlockReturn {
	id?: { id: string };
	colors: string[];
	dragRef?: any;
	dndStyle?: {
		display: Display;
		zIndex: ZIndex;
	};
	rotateStyle?: {
		transform: string;
		transitionDuration: TransitionDuration;
	};
	backLayerStyle?: {
		animationName: string;
		animationDuration: TransitionDuration;
	};
}
