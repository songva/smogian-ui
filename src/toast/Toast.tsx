import { ReactElement, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { ThemeContext, ThemeContextProps } from '../common/contexts';
import { palettesMap } from '../common/constants';

const styles: any = StyleSheet.create({
	toast: {
		width: 'calc(min(44dvh, 32dvw) + 6dvmin)',
		aspectRatio: '1 / 1',
		fontFamily: '"Gill Sans regular", "system-ui"',
		fontSize: '16dvh',
		letterSpacing: '-0.5rem',
		userSelect: 'none',
	},
	toastExLandscape: {
		'@media (max-height: 500px)': {
			letterSpacing: '-0.2rem',
		},
	},
	toastPortrait: {
		'@media (max-aspect-ratio: 1)': {
			height: 'calc(min(44dvw, 32dvh) + 6dvmin)',
			width: '75dvw',
			fontSize: '22dvw',
			letterSpacing: '-0.9rem',
		},
	},
	toastExPortrait: {
		'@media (max-width: 500px)': {
			letterSpacing: '-0.5rem',
		},
	},
	line0: {
		margin: '-3dvh 0',
	},
	line1: {
		margin: '-3dvmin 0',
		textAlign: 'end',
	},
	frontClip: {
		position: 'absolute',
		backgroundClip: 'text',
		color: 'transparent',
		translate: '1px -1px',
		filter: 'none',
		'-webkit-text-stroke-width': 0,
	},
	backClip: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: '0 3dvmax 3dvmax 0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		filter: 'brightness(0.75)',
		'-webkit-text-stroke-width': '4px',
	},
	backClipExLandscape: {
		'@media (max-height: 500px)': {
			'-webkit-text-stroke-width': '3px',
		},
	},
	backClipPortrait: {
		'@media (max-aspect-ratio: 1)': {
			padding: '0 3dvmax calc(75dvw - min(44dvw, 32dvh) - 6dvmin + 3dvmax) 0',
		},
	},
});

const backClipsPolygon = [
	'polygon(100% 100%, 0% 100%, 0% 70%, 70% 0%, 100% 0%)',
	'polygon(15% 0%, 100% 0%, 100% 85%)',
	'polygon(0% 0%, 80% 0%, 0% 80%)',
];
const backClipsPortraitPolygon = [
	'polygon(100% 100%, 0% 100%, 0% 50%, 50% 0%, 100% 0%)',
	'polygon(30% 0%, 100% 0%, 100% 70%)',
	'polygon(0% 0%, 60% 0%, 0% 60%)',
];

const Toast: (props: { children: string }) => ReactElement = ({ children }) => {
	const { palettes } = useContext<ThemeContextProps>(ThemeContext);
	const lines = children.split(' ');
	const colors = palettesMap[palettes];
	const backClipColorStyles = colors.map((color, index) => {
		return StyleSheet.create({
			clipColor: {
				color: color,
				'-webkit-text-stroke-color': color,
				clipPath: backClipsPolygon[index],
			},
			clipColorPortrait: {
				'@media (max-aspect-ratio: 1)': {
					clipPath: backClipsPortraitPolygon[index],
				},
			},
		});
	});
	const frontClipColorStyles = StyleSheet.create({
		clipColor: {
			backgroundImage: `conic-gradient(at calc(47.5% + -1px) calc(32.5% + 1px), 
      ${colors[2]} 12.5%, 
      ${colors[1]} 12.5%, ${colors[1]} 37.5%, 
      ${colors[0]} 37.5%, ${colors[0]} 62.5%, 
      ${colors[2]} 62.5%)`,
		},
		clipColorPortrait: {
			'@media (max-aspect-ratio: 1)': {
				backgroundImage: `conic-gradient(at calc(45% + -1px) calc(15% + 1px), 
      ${colors[2]} 12.5%, 
      ${colors[1]} 12.5%, ${colors[1]} 37.5%, 
      ${colors[0]} 37.5%, ${colors[0]} 62.5%, 
      ${colors[2]} 62.5%)`,
			},
		},
	});
	return (
		<div className={css(styles.toast, styles.toastExLandscape, styles.toastPortrait, styles.toastExPortrait)}>
			{Array(3)
				.fill('')
				.map((v, colorIndex) => (
					<div
						key={`backlayer-color${colorIndex}`}
						className={css(
							styles.backClip,
							styles.backClipExLandscape,
							styles.backClipPortrait,
							styles[`backClip${colorIndex}`],
							backClipColorStyles[colorIndex].clipColor,
							backClipColorStyles[colorIndex].clipColorPortrait
						)}
					>
						{lines.map((line, index) => (
							<p className={css(styles[`line${index}`])} key={`backlayer-line-${index}-color-${colorIndex}`}>
								{line}
							</p>
						))}
					</div>
				))}
			<div
				className={css(
					styles.backClip,
					styles.backClipPortrait,
					styles.frontClip,
					frontClipColorStyles.clipColor,
					frontClipColorStyles.clipColorPortrait
				)}
			>
				{lines.map((line, index) => (
					<p className={css(styles[`line${index}`])} key={`frontlayer-${index}`}>
						{line}
					</p>
				))}
			</div>
		</div>
	);
};
export default Toast;
