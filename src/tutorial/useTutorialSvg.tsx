import { CSSProperties, ReactNode } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './Tutorial.styles';

const wheelAnimateAttributes = {
	attributeName: 'stroke-opacity',
	values: '0;1;0;0',
	dur: '1s',
	fill: 'freeze',
	keyTimes: '0;0.1;0.7;1',
	repeatCount: 'indefinite',
};

const tapAnimateAttributes = {
	attributeName: 'stroke-opacity',
	values: '0;1;0;0',
	dur: '1s',
	fill: 'freeze',
	keyTimes: '0; 0.125; 0.25; 1',
	repeatCount: 'indefinite',
};

const mouseSvg: ReactNode = (
	<path
		className={css(styles.strokeStyle, styles.fillStyle)}
		d="M 30.003 98.095 C 16.661 98.095 12.484 92.978 11.683 85.711 C 9.824 68.875 10.264 47.972 11.567 35.405 C 12.324 28.101 20.996 23.908 29.998 23.908 C 39 23.908 47.676 28.101 48.432 35.405 C 49.736 47.972 50.175 68.875 48.317 85.711 C 47.515 92.978 43.345 98.095 30.003 98.095 Z M 30.022 23.962 L 30 28.697 M 30 50.421 L 30 55.057 M 33.191 32.224 C 33.191 36.819 33.191 42.236 33.191 46.845 C 33.191 51.456 26.81 51.697 26.81 46.756 C 26.81 41.813 26.81 37.026 26.81 32.25 C 26.81 27.475 33.191 27.629 33.191 32.224 Z"
	/>
);

const tapSvg: ReactNode = (
	<>
		<path
			className={css(styles.roundStrokeStyle, styles.fillStyle)}
			d="M 31.823 60.838 C 30.899 62.193 30.334 62.704 29.332 64.895 C 29.037 65.539 30.877 70.211 31.489 70.38 C 32.016 70.526 31.833 70.012 31.805 67.637 C 31.805 67.637 31.805 30.87 31.805 21.346 C 31.805 11.822 43.208 11.619 43.208 21.374 C 43.208 30.951 43.216 56.621 43.216 56.621 M 43.239 56.085 L 43.239 43.737 C 46.049 41.034 54.394 42.119 54.394 49.158 C 54.394 55.107 54.394 56.714 54.394 56.714 M 54.404 56.187 L 54.404 48.987 C 57.369 46.781 64.483 48.283 64.483 54.33 C 64.483 56.171 64.483 58.338 64.483 58.338 M 64.498 54.155 C 67.463 51.949 73.13 55.088 73.257 61.133 C 73.797 86.796 71.722 95.267 60.231 95.043 C 53.52 94.912 37.623 95.129 37.623 95.129 C 31.828 95.187 28.199 91.533 25.973 86.757 C 22.672 79.674 16.717 69.558 16.779 65.627 C 16.847 61.318 20.544 57.767 27.789 50.522 C 28.834 49.477 30.409 49.059 31.847 50.361"
		/>
		<path
			className={css(styles.strokeStyle)}
			d="M 46.499 24.742 C 50.268 17.89 45.207 9.528 37.388 9.69 C 29.57 9.851 24.858 18.416 28.907 25.106"
		>
			<animate {...tapAnimateAttributes} />
		</path>
		<path
			className={css(styles.strokeStyle)}
			d="M 27.473 30.522 C 19.145 22.73 22.375 8.845 33.287 5.529 C 44.198 2.212 54.608 11.952 52.025 23.059 C 51.334 26.032 49.742 28.718 47.466 30.751"
		>
			<animate {...tapAnimateAttributes} begin="0.05s" />
		</path>
	</>
);

const useTutorialSvg = () => {
	const mouseWheelUp: (param: { top: number; left: number }) => ReactNode = ({ top, left }) => (
		<svg
			viewBox="0 0 100 100"
			style={{ top: `calc(${top}px + 2dvmax)`, left: `${left}px` }}
			className={css(styles.staticSvg)}
		>
			{mouseSvg}
			<polyline className={css(styles.strokeStyle)} points="25.89 20.772 30.133 16.563 34.11 20.772">
				<animate {...wheelAnimateAttributes} begin="-0.75s" />
			</polyline>
			<polyline className={css(styles.strokeStyle)} points="25.89 16.203 30.133 11.994 34.11 16.203">
				<animate {...wheelAnimateAttributes} begin="-0.5s" />
			</polyline>
			<polyline className={css(styles.strokeStyle)} points="25.89 11.635 30.133 7.425 34.11 11.635">
				<animate {...wheelAnimateAttributes} begin="-0.25s" />
			</polyline>
		</svg>
	);

	const mouseWheelDown: (param: { top: number; left: number }) => ReactNode = ({ top, left }) => (
		<svg
			viewBox="0 0 100 100"
			style={{ top: `calc(${top}px + 2dvmax)`, left: `${left}px` }}
			className={css(styles.staticSvg)}
		>
			{mouseSvg}
			<polyline className={css(styles.strokeStyle)} points="25.89 56.149 30.133 60.358 34.11 56.149">
				<animate {...wheelAnimateAttributes} begin="-0.75s" />
			</polyline>
			<polyline className={css(styles.strokeStyle)} points="25.89 60.717 30.133 64.926 34.11 60.717">
				<animate {...wheelAnimateAttributes} begin="-0.5s" />
			</polyline>
			<polyline className={css(styles.strokeStyle)} points="25.89 65.285 30.133 69.495 34.11 65.285">
				<animate {...wheelAnimateAttributes} begin="-0.25s" />
			</polyline>
		</svg>
	);

	const singleTap: (param: { top: number; left: number }) => ReactNode = ({ top, left }) => (
		<svg viewBox="0 0 100 100" style={{ top: `${top}px`, left: `${left}px` }} className={css(styles.staticSvg)}>
			{tapSvg}
		</svg>
	);

	const doubleTap: (param: { top: number; left: number }) => ReactNode = ({ top, left }) => (
		<svg viewBox="0 0 100 100" style={{ top: `${top}px`, left: `${left}px` }} className={css(styles.staticSvg)}>
			<path
				className={css(styles.strokeStyle)}
				d="M 71.33 26.619 C 71.33 20.592 81.712 20.396 81.864 26.138 C 81.957 29.594 78.499 30.623 74.276 32.895 C 71.883 34.184 71.521 35.628 71.376 38.037 L 83.313 38.037 M 57.504 29.378 L 66.754 38.628 M 66.754 29.378 L 57.504 38.628"
			/>
			{tapSvg}
		</svg>
	);

	const dnd: (params: { dndAnimation: CSSProperties; top: number; left: number }) => ReactNode = ({
		dndAnimation,
		top,
		left,
	}) => (
		<svg
			viewBox="0 0 100 100"
			className={css(dndAnimation, styles.motionSvg)}
			style={{ top: `${top}px`, left: `${left}px` }}
		>
			<path
				className={css(styles.strokeStyle, styles.fillStyle, styles.dndAnimationStyle, styles.grabAnimation)}
				d="M 49.813 49.138 C 49.813 49.138 49.88 39.242 49.471 37.289 C 47.103 37.201 46.64 34.972 46.64 32.508 C 46.64 27.32 56.094 27.456 58.158 30.358 C 58.812 31.278 60.013 32.638 60.013 36.738 C 60.013 39.177 60.325 46.947 60.325 46.947 C 60.447 47.871 61.327 47.54 61.386 46.953 L 61.877 39.333 C 59.31 38.862 60.343 39.779 59.887 34.277 C 59.573 30.481 68.561 31.505 70.477 34.147 C 71.558 35.637 71.804 37.573 71.827 38.595 C 71.903 41.976 71.084 49.986 71.084 49.986 C 71.017 50.776 71.947 50.561 72.007 50.124 C 72.065 49.697 71.878 51.245 72.548 46.436 C 70.818 45.939 71.674 46.602 71.759 41.637 C 71.797 39.396 78.69 39.07 81.336 43.911 C 82.346 45.759 81.371 50.798 81.076 52.551 C 80.061 58.587 80.62 61.976 80.306 67.303 C 79.447 81.884 79.285 92.74 70.741 92.74 C 63.536 92.74 48.455 92.718 42.592 92.683 C 36.729 92.648 32.627 86.843 27.804 76.894 C 25.977 73.124 24.7 70.49 22.42 65.582 C 21.034 62.598 23.074 59.271 29.494 51.598 C 33.092 47.298 39.484 50.92 36.439 56.239 C 34.285 60.002 32.906 61.749 33.53 62.745 C 34.888 64.912 36.871 64.904 37.784 61.394 C 38.494 58.664 38.951 56.088 38.572 53.189 C 37.974 48.61 36.719 40.214 36.719 40.214 C 36.719 40.214 32.696 40.479 33.847 35.163 C 34.809 30.719 42.989 29.824 44.658 33.092 C 45.456 34.655 46.293 36.589 46.865 38.438 C 47.433 40.273 48.686 49.355 48.686 49.355 C 48.908 50.451 49.839 50.245 49.813 49.138 Z"
			/>
			<path
				className={css(styles.strokeStyle, styles.fillStyle, styles.dndAnimationStyle, styles.dropAnimation)}
				d="M 49.518 49.138 L 48.637 13.025 C 48.252 5.634 58.767 5.209 58.979 12.559 L 60.03 46.947 C 60.152 47.871 61.032 47.54 61.091 46.953 L 63.209 18.556 C 63.823 11.935 73.441 12.383 72.77 19.61 L 70.789 49.986 C 70.722 50.776 71.684 50.828 71.827 50.141 L 74.976 29.814 C 76.311 23.326 85.345 24.993 83.753 31.755 C 83.753 31.755 81.659 48.866 81 52.531 C 79.957 58.332 80.58 61.659 80.286 67.231 C 79.496 82.225 78.99 92.74 70.446 92.74 C 63.241 92.74 47.912 92.754 42.297 92.683 C 36.682 92.612 32.878 87.213 27.825 76.785 C 24.08 69.056 16.744 53.526 16.744 53.526 C 13.573 46.602 22.276 42.65 25.414 48.926 C 25.414 48.926 29.91 58.553 32.153 62.743 C 33.673 65.583 36.822 64.89 37.489 61.394 C 38.018 58.623 38.699 56.082 38.277 53.189 C 36.758 42.787 33.46 22.022 33.46 22.022 C 32.343 14.825 42.363 12.89 43.535 20.244 L 48.391 49.355 C 48.613 50.451 49.544 50.245 49.518 49.138 Z"
			/>
		</svg>
	);

	return {
		mouseWheelUp,
		mouseWheelDown,
		singleTap,
		doubleTap,
		dnd,
	};
};

export default useTutorialSvg;
