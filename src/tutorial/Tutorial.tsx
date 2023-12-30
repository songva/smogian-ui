import { FC, useContext, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Pattern, PatternOrientation } from '../common/interfaces';
import {
	BenchContext,
	BlockContextProps,
	OrientationContext,
	OrientationContextProps,
	StagedContext,
	ThemeContext,
	ThemeContextProps,
	TutorialContext,
	TutorialContextProps,
} from '../common/contexts';
import usePrevious from '../common/usePrevious';
import { darkThemeStyle, lightThemeStyle } from '../app/App.style';
import useTutorialSvg from './useTutorialSvg';
import Block from '../block/Block';
import styles from './Tutorial.style';

const seatOffsetMap = {
	[PatternOrientation.TOP_LEFT]: [1, 0],
	[PatternOrientation.TOP_RIGHT]: [-1, 0],
	[PatternOrientation.BOTTOM_LEFT]: [0, -1],
	[PatternOrientation.BOTTOM_RIGHT]: [-1, 0],
};

const hallucinationMap: Record<string, Pattern> = {
	[PatternOrientation.TOP_LEFT]: [1, 0, 2, 0],
	[PatternOrientation.TOP_RIGHT]: [1, 0, 2, 0],
	[PatternOrientation.BOTTOM_LEFT]: [0, 2, 0, 1],
	[PatternOrientation.BOTTOM_RIGHT]: [2, 0, 1, 0],
};

const enum Display {
	SHOW = 'block',
	HIDE = 'none',
}

const Tutorial: FC = () => {
	const { darkTheme, setDarkTheme } = useContext<ThemeContextProps>(ThemeContext);
	const { ratio, orientation } = useContext<OrientationContextProps>(OrientationContext);
	const { tutorialStep, setTutorialStep } = useContext<TutorialContextProps>(TutorialContext);
	const { blockList: benchBlockList } = useContext<BlockContextProps>(BenchContext);
	const { blockList: stagedBlockList } = useContext<BlockContextProps>(StagedContext);
	const [d, setD] = useState<string>('');
	const [svgMethod, setSvgMethod] = useState<() => void>(() => {});
	const [display, setDisplay] = useState<string>(Display.SHOW);
	const [visible, setVisible] = useState<boolean>(true);
	const currentStep = useRef<number>(Math.sign(tutorialStep));
	const sampleBlock = useRef<Pattern>();
	const seatOrientation = useRef<PatternOrientation>(PatternOrientation.TOP_LEFT);
	const prevOrientation = usePrevious(orientation);
	const { mouseWheel, doubleTap, dnd } = useTutorialSvg();

	const dvmin = Math.min(window.innerWidth, window.innerHeight) / 100;
	const radius = dvmin > 5 ? 10 : 6;
	const cornerPointBuffer = 10;
	const sal = Number(getComputedStyle(document.documentElement).getPropertyValue('--sal').replaceAll(/[^\d]/g, ''));
	const isMobile = /iPhone|iPad|iPod|Android|crios/i.test(window.navigator.userAgent);

	const checkBenchBlockListSize = () => benchBlockList.filter(block => block).length;

	const getSampleBlockOrientation = (sample: Pattern): PatternOrientation | undefined =>
		isEqual(sample, [0, 0, 1, 2])
			? PatternOrientation.TOP_LEFT
			: isEqual(sample, [0, 1, 2, 0])
			? PatternOrientation.BOTTOM_LEFT
			: isEqual(sample, [1, 2, 0, 0])
			? PatternOrientation.BOTTOM_RIGHT
			: isEqual(sample, [2, 0, 0, 1])
			? PatternOrientation.TOP_RIGHT
			: undefined;

	const drawSampleBlockPath: (params: { bottom: number; right: number; width: number; height: number }) => string = ({
		bottom = 0,
		right = 0,
		width = 0,
		height = 0,
	}) => {
		return `H 9999
         v ${bottom - cornerPointBuffer}
         H ${right - sal + radius / 2}
         v -${height - cornerPointBuffer - radius / 2}
         q 0 -${radius} -${radius} -${radius}
         h -${width - radius}
         q -${radius} 0 -${radius} ${radius}
         v ${height - radius}
         q 0 ${radius} ${radius} ${radius}
         h ${width - radius}
         q ${radius} 0 ${radius} -${radius}
         v -${cornerPointBuffer}
         H 9999
         V 9999
         H 0`;
	};

	const drawStageSeatPath: (params: { top: number; left: number; width: number; height: number }) => void = ({
		top = 0,
		left = 0,
		width = 0,
		height = 0,
	}) => `V ${top + cornerPointBuffer}
         H ${left - sal - radius / 2}
         v ${height - cornerPointBuffer - radius / 2}
         q 0 ${radius} ${radius} ${radius}
         h ${width - radius}
         q ${radius} 0 ${radius} -${radius}
         v -${height - radius}
         q 0 -${radius} -${radius} -${radius}
         h -${width - radius}
         q -${radius} 0 -${radius} ${radius}
         v ${height - cornerPointBuffer - radius / 2}
         H 0`;

	const drawCloseIcon = () =>
		`V ${(5 + 2) * dvmin}
       h ${2 * dvmin + radius / 3}
       l ${2 * dvmin} -${2 * dvmin}
       l ${2 * dvmin} ${2 * dvmin}
       l ${radius / 3} -${radius / 3}
       l -${2 * dvmin} -${2 * dvmin}
       l ${2 * dvmin} -${2 * dvmin}
       l -${radius / 3} -${radius / 3}
       l -${2 * dvmin} ${2 * dvmin}
       l -${2 * dvmin} -${2 * dvmin}
       l -${radius / 3} ${radius / 3}
       l ${2 * dvmin} ${2 * dvmin}
       l -${2 * dvmin} ${2 * dvmin}
       l ${radius / 3} ${radius / 3}
       H 0
       `;

	const prepareStep1 = (): void => {
		setDarkTheme(false);
		window.document.documentElement.style.backgroundColor = '#303030';
		setSvgMethod(() => {});
		sampleBlock.current = benchBlockList.find(block => block && getSampleBlockOrientation(block));
		const {
			bottom = 0,
			right = 0,
			width = 0,
			height = 0,
		} = document.getElementById('sample')?.getBoundingClientRect() || {};
		setD(`M 0 0 ${drawSampleBlockPath({ bottom, right, width, height })} ${drawCloseIcon()} Z`);
		setSvgMethod(() => (isMobile ? doubleTap : mouseWheel)({ top: bottom - height, left: right - width * 0.65 }));
	};

	const prepareStep2 = (): void => {
		const {
			bottom = 0,
			right = 0,
			width = 0,
			height = 0,
		} = document.getElementById('sample')?.getBoundingClientRect() || {};
		seatOrientation.current =
			benchBlockList.map(block => block && getSampleBlockOrientation(block)).find(i => i) || seatOrientation.current;
		const { top = 0, left = 0 } =
			document.getElementById(`seat-${seatOrientation.current}`)?.getBoundingClientRect() || {};
		setD(`M 0 0 
          ${drawSampleBlockPath({ bottom, right, width, height })} 
          ${drawStageSeatPath({ top, left, width, height })}
          ${drawCloseIcon()} 
          Z`);
		const dndKeyframe = {
			'0%': {
				transform: 'translate(0px,0px)',
				opacity: 0,
			},
			'10%': {
				transform: 'translate(0px,0px)',
				opacity: 1,
			},
			'90%': {
				transform: `translate(${left - right + width}px, ${top - bottom + height}px)`,
				opacity: 1,
			},
			'100%': {
				transform: `translate(${left - right + width}px, ${top - bottom + height}px)`,
				opacity: 0,
			},
		};
		const dndKeyframes = StyleSheet.create({
			dndAnimation: {
				animationName: dndKeyframe,
			},
		});
		setSvgMethod(() => dnd({ dndAnimation: dndKeyframes.dndAnimation, top: bottom - height, left: right - width }));
	};

	const prepareStep3 = (): void => {
		const {
			bottom = 0,
			right = 0,
			width = 0,
			height = 0,
		} = document.getElementById('second')?.getBoundingClientRect() || {};
		seatOrientation.current =
			stagedBlockList.map(block => block && getSampleBlockOrientation(block)).find(i => i) || seatOrientation.current;
		const { top = 0, left = 0 } =
			document.getElementById(`seat-${seatOrientation.current}`)?.getBoundingClientRect() || {};
		const offset = {
			left: seatOffsetMap[seatOrientation.current][0] * (width + 1) + left,
			top: seatOffsetMap[seatOrientation.current][1] * (height + 1) + top,
		};
		setD(`M 0 0 
          ${drawSampleBlockPath({ bottom, right, width, height })} 
          ${drawStageSeatPath({ ...offset, width, height })} 
          ${drawCloseIcon()} 
          Z`);
		setSvgMethod(() => (
			<div
				style={{
					width: `${width}px`,
					aspectRatio: ' 1 / 1',
					position: 'absolute',
					top: `${offset.top}px`,
					left: `${offset.left}px`,
					zIndex: 5,
					opacity: 0.3,
					pointerEvents: 'none',
				}}
			>
				<Block seatNumber={-1} isStage pattern={hallucinationMap[seatOrientation.current]}></Block>
			</div>
		));
	};

	const fixIPhoneSideMargin = () => {
		window.document.documentElement.style.transitionDuration = '500ms';
		window.document.documentElement.style.backgroundColor = lightThemeStyle.backgroundColor;
		setTimeout(() => {
			window.document.documentElement.style.transitionDuration = '0ms';
		}, 100);
	};

	const prepareStep4 = (): void => {
		fixIPhoneSideMargin();
		setSvgMethod(() => {});
		setVisible(false);
		setTimeout(() => {
			setDisplay(Display.HIDE);
		}, 500);
	};

	const skipTutorial = (): void => {
		fixIPhoneSideMargin();
		setVisible(false);
		setSvgMethod(() => {});
		setTimeout(() => {
			setDisplay(Display.HIDE);
			setTutorialStep(-1);
		}, 500);
	};

	const matchStep = (): number => {
		const blockSize = checkBenchBlockListSize();
		return currentStep.current === 1 &&
			sampleBlock.current &&
			!isEqual(
				sampleBlock.current,
				benchBlockList.find(block => block && getSampleBlockOrientation(block))
			) &&
			prevOrientation === orientation
			? 2
			: blockSize === 23 && currentStep.current === 2
			? 3
			: blockSize === 22 && currentStep.current === 3
			? 4
			: currentStep.current;
	};

	useEffect(() => {
		if (tutorialStep < 0) {
			return;
		} else if (tutorialStep !== 1) {
			currentStep.current = 1;
			setVisible(true);
			setDisplay(Display.SHOW);
			setTutorialStep(1);
		}
		const nextStep = matchStep();
		if (nextStep === 4 && currentStep.current === 4) {
			return;
		}
		currentStep.current = matchStep();
		if (currentStep.current === 2) {
			setSvgMethod(() => {});
		}
		setTimeout(
			() => {
				if (currentStep.current === 1) {
					prepareStep1();
				} else if (currentStep.current === 2) {
					prepareStep2();
				} else if (currentStep.current === 3) {
					prepareStep3();
				} else if (currentStep.current === 4) {
					prepareStep4();
				}
			},
			/crios/i.test(window.navigator.userAgent) ? 200 : 0
		);
	}, [ratio, benchBlockList, stagedBlockList, tutorialStep]);

	return tutorialStep > 0 ? (
		<>
			{svgMethod}
			<div className={css(styles.overlay, visible ? undefined : styles.overlayDismissal)} style={{ display }}>
				<svg viewBox="0 0 100 100">
					<clipPath id="sample-clip">
						<path d={d} />
					</clipPath>
				</svg>
			</div>
			<div className={css(styles.skipButton)} onClick={skipTutorial} />
		</>
	) : (
		<></>
	);
};

export default Tutorial;
