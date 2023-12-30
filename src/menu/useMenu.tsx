import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { uniq } from 'lodash';
import {
	BlockContextProps,
	BumperContext,
	BumperContextProps,
	KidsModeContext,
	KidsModeContextProps,
	OrientationContext,
	OrientationContextProps,
	StagedContext,
	ThemeContext,
	ThemeContextProps,
} from '../common/contexts';
import { Ratio, StageOrientationLock } from '../common/interfaces';
import seatService from '../seat/seatService';
import { lightThemeStyle, darkThemeStyle } from '../app/App.style';

export const enum PresetTop {
	HIDE = '2dvmin - 100% - 3px',
	SHOW = '0%',
}

const generateOrientationButtonStyle: (props: {
	previousStageOrientationLock?: StageOrientationLock;
	stageOrientationLock: StageOrientationLock;
}) => CSSProperties = ({ previousStageOrientationLock, stageOrientationLock }) => ({
	left:
		stageOrientationLock === StageOrientationLock.UNLOCKED
			? '33.3%'
			: stageOrientationLock === StageOrientationLock.PORTRAIT
			? '0%'
			: '66.7%',
	transitionDuration: Math.abs((previousStageOrientationLock || 100) - stageOrientationLock) === 2 ? '500ms' : '300ms',
});
const generateKidsModeButtonStyle = (kidsMode: boolean): CSSProperties => ({
	left: kidsMode ? '0%' : '50%',
});
const generateDarkModeButtonStyle = (darkTheme: boolean): CSSProperties => ({
	left: darkTheme ? '50%' : '0%',
});

const useMenu = () => {
	const { palettes, darkTheme, setPalettes, setDarkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { kidsMode, setKidsMode } = useContext<KidsModeContextProps>(KidsModeContext);
	const { blockList } = useContext<BlockContextProps>(StagedContext);
	const { setBumper } = useContext<BumperContextProps>(BumperContext);
	const { ratio, stageOrientationLock, isLandscape, setStageOrientationLock } =
		useContext<OrientationContextProps>(OrientationContext);
	const [transition, setTransition] = useState<string>('');
	const [presetTop, setPresetTop] = useState<string>(ratio >= Ratio.LANDSCAPE ? PresetTop.SHOW : PresetTop.HIDE);
	const [offsetTop, setOffsetTop] = useState<string>('0px');
	const touchStartY = useRef<number>(0);
	const previousClientY = useRef<number>(0);
	const trendDirection = useRef<number>(0);
	const menuLiftRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const orientationButtonStyle = useRef<CSSProperties>(
		generateOrientationButtonStyle({ previousStageOrientationLock: undefined, stageOrientationLock })
	);
	const { getDimension, allocateSeat } = seatService;
	const stageColumnSpan = getDimension({ isLandscape, stageOrientationLock }).columnSpan;
	const menuHeight = Math.max(window.innerHeight, window.innerWidth) * 0.29;

	useEffect(() => {
		setPresetTop(ratio >= Ratio.LANDSCAPE ? PresetTop.SHOW : PresetTop.HIDE);
	}, [ratio]);

	useEffect(() => {
		if (menuLiftRef.current) {
			menuLiftRef.current.onpointerdown = onPointerDown;
		}
		if (overlayRef.current) {
			overlayRef.current.onclick = hideMenu;
			overlayRef.current.onpointerdown = hideMenu;
		}
	});

	const onPointerMove: (event: { pageY: number }) => void = ({ pageY: currentY }) => {
		setTransition('none');
		setTimeout(() => {
			previousClientY.current = currentY;
		}, 1);
		if (touchStartY.current === 0) {
			touchStartY.current = currentY;
			return;
		}
		const deltaY = currentY - previousClientY.current;
		trendDirection.current = deltaY;
		const offsetY = currentY - touchStartY.current;
		if (presetTop === PresetTop.HIDE) {
			setOffsetTop(`max(0px, min(100% - 2dvmin + 3px, ${offsetY}px))`);
		}
		if (presetTop === PresetTop.SHOW) {
			setOffsetTop(`max(2dvmin - 3px - 100%, min(0px, ${offsetY}px))`);
		}
	};

	const onPointerOut = () => {
		setTransition('transform 300ms ease-out');
		setTimeout(() => setTransition('none'), 290);

		const presetTopOnTheFence =
			Math.abs(previousClientY.current - touchStartY.current) > menuHeight / 2 === (presetTop === PresetTop.HIDE)
				? PresetTop.SHOW
				: PresetTop.HIDE;
		setPresetTop(
			trendDirection.current === 0 ? presetTopOnTheFence : trendDirection.current > 0 ? PresetTop.SHOW : PresetTop.HIDE
		);
		setOffsetTop('0px');
		touchStartY.current = 0;
		previousClientY.current = 0;
	};

	const onPointerDown = () => {
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
	};

	const onPointerUp = () => {
		onPointerOut();
		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerup', onPointerUp);
	};

	const hideMenu = () => {
		setTransition('transform 300ms ease-out');
		setTimeout(() => setTransition('none'), 290);
		setPresetTop(PresetTop.HIDE);
	};

	const flipStage = (orientationLock: StageOrientationLock) => {
		orientationButtonStyle.current = generateOrientationButtonStyle({
			previousStageOrientationLock: stageOrientationLock,
			stageOrientationLock: orientationLock,
		});
		setStageOrientationLock(orientationLock);
	};

	const toggleKidsMode = () => {
		if (!kidsMode) {
			setBumper({ x: 0, y: 0 });
			setKidsMode(!kidsMode);
		} else {
			setKidsMode(!kidsMode);
			const bumperColor = uniq(
				blockList
					.map((block, seatNumber) => (block ? { pattern: block, seatNumber } : { seatNumber: -1 }))
					.filter(block => block.seatNumber >= 0)
					.map(block =>
						(allocateSeat({ seatNumber: block.seatNumber, columnSpan: stageColumnSpan })?.direction || []).map(
							direction => (block.pattern || [])[direction]
						)
					)
					.flat()
			);
			if (bumperColor && bumperColor.length <= 1) {
				setBumper({ x: 50, y: 50, newBumperColor: bumperColor[0], bumperColor: bumperColor[0] });
			} else {
				setTimeout(() => setKidsMode(kidsMode), 100);
			}
		}
	};
	const toggleDarkMode = () => {
		window.document.documentElement.style.backgroundColor = darkTheme
			? lightThemeStyle.backgroundColor
			: darkThemeStyle.backgroundColor;
		setDarkTheme(!darkTheme);
	};

	return {
		transition,
		presetTop,
		offsetTop,
		darkTheme,
		palettes,
		stageOrientationLock,
		ratio,
		kidsMode,
		orientationButtonStyle: orientationButtonStyle.current,
		kidsModeButtonStyle: generateKidsModeButtonStyle(kidsMode),
		darkModeButtonStyle: generateDarkModeButtonStyle(darkTheme),
		menuLiftRef,
		overlayRef,
		setPalettes,
		hideMenu,
		flipStage,
		toggleKidsMode,
		toggleDarkMode,
	};
};
export default useMenu;
